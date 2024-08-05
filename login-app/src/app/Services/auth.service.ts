import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../Model/auth-response';
import { catchError,tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http: HttpClient = inject( HttpClient);

  signUp(email, password){

    const data = {email:email ,password:password, returnSecureToken: true}
      return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDp7Lx3r3fktVJ_5kyTF4LXrIqsa8Bob8',
     data).pipe(catchError(this.handleError), tap((res) => {
      
  }))
  }

  login(email, password){
    const data = {email:email ,password:password, returnSecureToken: true}
   return  this.http.post<AuthResponse>('entitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDp7Lx3r3fktVJ_5kyTF4LXrIqsa8Bob8'
      ,data
    )
  }


  private handleError(err){
        let errorMessage = 'An unknown error has occured'
        console.log(err);
        if(!err.error || !err.error.error){
            return throwError(() => errorMessage);
        }
        switch (err.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage ="This email already exists.";
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'This operation is not allowed.';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'The email ID or Password is not correct.';
                break
        }
        return throwError(() => errorMessage);
    }
}
