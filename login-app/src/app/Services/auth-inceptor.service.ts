import { HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInceptorService {

  constructor() { }
  authService: AuthService = inject(AuthService);


  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if(!user){
        return next.handle(req);
      }
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token)
      })
      return next.handle(modifiedReq);
    }))
  }
}
