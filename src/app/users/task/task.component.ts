import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { taskResponse } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  errorsMesagge:string = '';
  task: taskResponse[] = [];

  public constructor (private serviceTask: TaskService){


  }
  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(){
    this.serviceTask.findTask().subscribe({
      next: (tasks) =>{
        this.task = tasks;
        console.log("tareas recuperadas exitosamente", tasks);

      },
      error: (errors) => {
        this.errorsMesagge = "error al recuperar tareas";
        console.error("error al recuperar las tareas", errors);
      }
    })
  }

  markCompleteTask(id:number){
    this.serviceTask.completeTask(id).subscribe({
      next: () =>  {
        this.loadTask();
      },
      error: (error) => {
        this.errorsMesagge = `Error al completar tareas ${error}`;
        console.error("error al completar la tareas", error);
      }
    })

  }

}
