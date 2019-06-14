// Esta clase da acceso al API REST
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiREST = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(`${this.apiREST}`)
      .pipe(map(res=>res));
  }

  getUserTasks(userId: string) {
    return this.http.get<Task[]>(`${this.apiREST}/${userId}`)
      .pipe(map(res=>res));
  }

  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.apiREST}`, newTask)
      .pipe(map(res=>res));
  }

  deleteTask(id: any) {
    return this.http.delete<any>(`${this.apiREST}/${id}`)
      .pipe(map(res=>res));
  }

  updateTask(id: any, newTaskData: Task) {
    return this.http.put<any>(`${this.apiREST}/${id}`, newTaskData)
      .pipe(map(res=>res));
  }
}
