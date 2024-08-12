import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS,withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthInceptorService } from './Services/auth-inceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),  provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInceptorService,
      multi: true
    }]
};
