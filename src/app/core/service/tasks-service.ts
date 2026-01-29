import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { TaskRequest, TaskResponse, TaskUpdateRequest } from '../../shared/models/task-model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  private _tasks = signal<TaskResponse[]>([]);
  tasks$ = this._tasks.asReadonly();

  getTasks() {
    return this.http.get<TaskResponse[]>(`${this.apiUrl}`).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  getTaskByProjectId(id: number) {
    return this.http.get<TaskResponse[]>(`${this.apiUrl}?projectId=${id}`).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  addTask(req: TaskRequest) {
    return this.http.post<TaskResponse>(`${this.apiUrl}`, req).pipe(
      tap({
        next: (task) => {
          this._tasks.update(tasks => [...tasks, task]);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  updateTask(id: number, req: TaskUpdateRequest) {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}`, req).pipe(
      tap({
        next: (updatedTask) => {
          this._tasks.update(tasks => tasks.map(task => task.id === id ? updatedTask : task));
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => {
          this._tasks.update(tasks => tasks.filter(task => task.id !== id));
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

}

