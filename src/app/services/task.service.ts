import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment-dev';
import { Observable } from 'rxjs';
import { taskRequest, taskResponse } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
   private BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  findTask():Observable<taskResponse[]>{
    return this.http.get<taskResponse[]>(`${this.BASE_URL}/find`)

  }

  completeTask(id: number):Observable<taskResponse>{
    return this.http.patch<taskResponse>(`${this.BASE_URL}/complete/${id}`,{});

  }

  createTask(taskRequest:taskRequest): Observable<taskResponse>{

   return this.http.post<taskResponse>(`${this.BASE_URL}`,taskRequest)

  }
}
