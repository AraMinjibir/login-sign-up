import { NgIf } from '@angular/common';
import { EventEmitter, Inject, ViewChild, inject, viewChild } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input } from '@angular/core';
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
 @Input()isEditMode: boolean = false;

 @Input()selectedTask: Task;
@ViewChild('taskForm') accessForm: NgForm;
  onCloseForm(){
    this.closeForm.emit(false);
  }

  

  onFormSubmitted(form:NgForm){
    this.EmitEvent.emit(form.value)
    
    this.onCloseForm();
    
  }

  ngAfterViewInit(){
    setTimeout(() =>{
      this.accessForm.form.patchValue(this.selectedTask);
    }, 0)
  }

  
  
}
