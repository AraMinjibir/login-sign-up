import { Component,inject  } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NgIf } from '@angular/common';
import { Task } from '../Model/task';
import { TaskServiceService } from '../Services/task-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent, TaskDetailsComponent, NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showCreateForm: boolean = false;

  taskService: TaskServiceService = inject( TaskServiceService);


  onCloseForm(){
    this.showCreateForm = false;
  }
  onCreateForm(){
    this.showCreateForm = true;
  }

  onCreateTask(data: Task){
    this.taskService.createTask(data);
  }
}
