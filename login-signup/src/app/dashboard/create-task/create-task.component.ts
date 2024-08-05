import { NgIf } from '@angular/common';
import { EventEmitter, Inject, inject } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskServiceService } from '../../Services/task-service.service';
import { Task } from '../../Model/task';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
 @Output()
 closeForm:EventEmitter<boolean> =new  EventEmitter<boolean>();
 @Output()
 EmitEvent:EventEmitter<Task> = new EventEmitter<Task>();
 createForm:FormGroup;
 taskService: TaskServiceService = Inject(TaskServiceService);

  onCloseForm(){
    this.closeForm.emit(false);
  }

  ngOnInit(){
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
      assignedTo: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    })
  }

  onFormSubmitted(form:NgForm){
    this.EmitEvent.emit(form.value)
    this.createForm.reset()
    
  }

  
  
}
