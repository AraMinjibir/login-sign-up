import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Auth interceptor called');
     return next.handle(req)
  }
}
