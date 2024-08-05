import { Component,inject , OnInit } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Task } from '../Model/task';
import{ Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { LoaderComponent } from '../utility/loader/loader.component';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { TaskServiceService } from '../Services/task-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent, TaskDetailsComponent, NgIf, NgFor, 
    NgClass, LoaderComponent, SnackbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  showCreateForm: boolean = false;
  httpclient: HttpClient = inject( HttpClient);
  taskService: TaskServiceService = inject(TaskServiceService)
  allTasks: Task[] = [];
  isEditMode: boolean = false;
  isLoading: boolean = false;
  selectedTask: Task;
  currentTaskId: string = '';
  errorMessage: string | null = null;
  errorSub:Subscription;
  

  ngOnInit(){
    this.featchCreatedTasks();
   this.errorSub =  this.taskService.errorSubject.subscribe({next: (htterr) => {
      this.setErrorMessage(htterr);
    }})
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }

  onCloseForm(){
    this.showCreateForm = false;
  }
  onCreateForm(){
    this.showCreateForm = true;
    this.isEditMode = false;
    this.selectedTask = {title: '', assignedTo: '', createdAt: '', priority: '', status: '' }
  }

  onCreateOrUpdateTask(data: Task){
    if( !this.isEditMode){
      this.taskService.createTask(data);
    }else{
      this.taskService.updateTask(this.currentTaskId, data);
      this.featchCreatedTasks();
       
    }
    
  
  }
  onfetchAllTasksClicked(){
    this.featchCreatedTasks()
  }
  private featchCreatedTasks(){
    this.isLoading = true;
    this.taskService.GetAllTask().subscribe( {next: (tasks) => {
      console.log(tasks)
      this.allTasks = tasks;
      this.isLoading = false;
    }, error:(error) => {
      this.setErrorMessage(error);
      this.isLoading = false;
      
    }})
  }

  private setErrorMessage(err: HttpErrorResponse){
    console.log(err);
    if(err.error.error === 'Permission denied'){
      this.errorMessage = "You don't have permission to perform this action";
    }else{
      this.errorMessage = err.message;
    }

    setTimeout(() => {
      this.errorMessage = null
    }, 5000);
  }

  onDeleteTask(id: string |undefined){
    this.taskService.DeleteTask(id);
  }

  onDeleteAllTasks(){
    this.taskService.DeleteAllTasks();
  }

  onEditClicked(id: string | undefined){
    this.currentTaskId = id;
    this.showCreateForm = true;
    this.isEditMode = true;
    this.selectedTask = this.allTasks.find((task) =>{
      return task.id === id
    })
  }
}
