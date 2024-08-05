import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Task } from '../Model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
httpclient: HttpClient = Inject( HttpClient);
  createTask(data: Task){
    this.httpclient.post('https://login-signup-36373-default-rtdb.firebaseio.com/login-signup.json',
      data
    ).subscribe((res) => {
      console.log(res)
    })
  }
}
