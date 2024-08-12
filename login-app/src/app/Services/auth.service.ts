import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../Model/auth-response';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Model/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);
  user = new BehaviorSubject<User | null>(null);
  route: Router = inject(Router);
  private tokenExpireTimer: any;

  signUp(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseAPIKey,
      data
    ).pipe(
      catchError(this.handleError),
      tap((res) => {
        this.handleCreateUser(res);
      })
    );
  }

  login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey,
      data
    ).pipe(
      catchError(this.handleError),
      tap((res) => {
        this.handleCreateUser(res);
      })
    );
  }

  logout() {
    this.user.next(null);
    this.route.navigate(['login']);
    localStorage.removeItem('user');

   if (this.tokenExpireTimer){
    clearTimeout(this.tokenExpireTimer);

    this.tokenExpireTimer = null;
   }
  }

  autoLogin(){
    const user = JSON.parse(localStorage.getItem('user')!);
  
    if (!user) {
      return;
    }
  
    // Convert `user.expiresIn` to a Date object
    const expiresIn = new Date(user._expiresIn);
    const loggedUser = new User(user.email, user.id, user._token, expiresIn);
  
    if (loggedUser.token) {
      this.user.next(loggedUser);
  
      // Calculate the remaining time before token expiration
      const timerValue = expiresIn.getTime() - new Date().getTime();
      this.outLogOut(timerValue);
    }
  }
  outLogOut(expireTime: number){
    this.tokenExpireTimer = setTimeout(() => {
      this.logout()
    }, expireTime);
  }

  private handleCreateUser(res) {
    const expiresInTs = new Date().getTime()+ +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId,  res.idToken, expiresIn,);
    this.user.next(user);

    this.outLogOut(res.expiresIn * 1000)

    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleError(err: any) {
    let errorMessage = 'An unknown error has occurred';
    if (!err.error || !err.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email already exists.";
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This operation is not allowed.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'The email ID or Password is not correct.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
