import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { taskRequest, taskResponse } from '../../../interfaces/task.interface';
import { categoryTask } from '../../enums/task.enum';
import { CustomValidatorService } from '../../services/custom-validator.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

    errorMessage: string = '';
    task: taskResponse[] = [];
    taskForm!: FormGroup;
  

 
   


  public constructor(
    private taskService: TaskService,
    private validator: CustomValidatorService,
    private fb:FormBuilder
     
  ){

  }
  isValidField(field: string): boolean | null{
    return this.validator.isValiedField(this.taskForm, field)
  }

  getFieldErrors(field:string): string[]{
    return this.validator.getFieldErrors(this.taskForm,field);

  }
 
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      timeEstimate: ['', [Validators.required]],
      createdAt: [new Date()], 
      category: ['', [this.validator.validateCategory()]]
    });
  }

  



  onCreateTask():void{

   if(this.taskForm.invalid){
        this.taskForm.markAllAsTouched();
        return
   }

   const taskRequest = this.taskForm.value;

    this.taskService.createTask(taskRequest)
    .subscribe(
      {
        next: (task) => {
         console.log("tarea creada exitosamente",task);
        },
        error: (error) => {
          console.error("error al crear tareas",error);
        }
      }
    )

  }


}
