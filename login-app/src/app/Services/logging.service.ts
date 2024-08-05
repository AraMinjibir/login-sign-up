import { Injectable } from '@angular/core';
import { HttpClient}from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private httpclient: HttpClient) { }

  logErrors(data: {statusCode: number, errorMessage: string, dateTime:  Date}){
    this.httpclient.post('https://login-signup-36373-default-rtdb.firebaseio.com/logged-errors.json', 
    data).subscribe();
  }

  fetchErrorrs(){
    this.httpclient.get('https://login-signup-36373-default-rtdb.firebaseio.com/logged-errors.json'
       ).subscribe( (data) => {
        console.log(data)
       });
  }
}
