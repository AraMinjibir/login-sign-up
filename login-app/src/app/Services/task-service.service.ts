import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../Model/task';
import { Subject, catchError, exhaustMap, map, take, throwError } from 'rxjs';
import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private httpclient: HttpClient) {} 
  allTasks: Task[] = [];
  errorSubject = new Subject<HttpErrorResponse>();
  loggingService: LoggingService = inject(LoggingService);
  authService: AuthService = inject(AuthService)

  createTask(data: Task){
    console.log('create')
    this.httpclient.post('https://login-signup-36373-default-rtdb.firebaseio.com/login-app.json',
    data
  ).pipe(catchError( (err) => {
    const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
    this.loggingService.logErrors(errorObj);
    return throwError(() => err)
  }))
  .subscribe({error: (err) => {
    this.errorSubject.next(err);
  }})
  }

  DeleteTask(id: string | undefined ){
    this.httpclient.delete('https://login-signup-36373-default-rtdb.firebaseio.com/login-app/' +id+ '.json')
    .pipe(catchError( (err) => {
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
      this.loggingService.logErrors(errorObj);
      return throwError(() => err)
    }))
    .subscribe({error: (err) => {
      this.errorSubject.next(err);
    }});
    
  }

  DeleteAllTasks(){
    this.httpclient.delete('https://login-signup-36373-default-rtdb.firebaseio.com/login-app.json'
    ).pipe(catchError( (err) => {
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
      this.loggingService.logErrors(errorObj);
      return throwError(() => err)
    }))
    .subscribe({error: (err) => {
      this.errorSubject.next(err);
    }});
   
   
  }

  GetAllTask(){

   return  this.httpclient.get('https://login-signup-36373-default-rtdb.firebaseio.com/login-app.json'
              ).pipe( map((response) => {
      let tasks = []
        for(let key in response){
          if(response.hasOwnProperty(key)){
            tasks.push({...response[key], id:key})
          }
        }
        return tasks
    }),catchError( (err) => {
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
      this.loggingService.logErrors(errorObj);
      return throwError(() => err)
    }))

  }

  updateTask(id: string | undefined, data){
    this.httpclient.put('https://login-signup-36373-default-rtdb.firebaseio.com/login-app/' +id+ '.json', 
    data).pipe(catchError( (err) => {
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
      this.loggingService.logErrors(errorObj);
      return throwError(() => err)
    }))
    .subscribe({error: (err) => {
      this.errorSubject.next(err);
    }});
   
  }
}
