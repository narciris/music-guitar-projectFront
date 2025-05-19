import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { TaskComponent } from './task/task.component';
import { CreateComponent } from './create/create.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class UsersModule { }
