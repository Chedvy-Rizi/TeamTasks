import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { TaskRequest, TaskResponse, TaskUpdateRequest } from '../../shared/models/task-model';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  private notification = inject(NotificationService);
  private _tasks = signal<TaskResponse[]>([]);
  tasks$ = this._tasks.asReadonly();



  getTasks() {
    return this.http.get<TaskResponse[]>(`${this.apiUrl}`).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }

  getFilteredTasks(projectId: number | null) {
    const all = this._tasks();
    if (!projectId) return all;
    return all.filter(t => Number(t.project_id) === Number(projectId));
  }
  
  addTask(req: TaskRequest) {
    return this.http.post<TaskResponse>(`${this.apiUrl}`, req).pipe(
      tap({
        next: (task) => {
          this._tasks.update(tasks => [...tasks, task]);
           this.notification.showSuccess('New task successfully deployed to workspace');
        },
        error: (err) => {
           this.notification.showError(err.error?.error)
        }
      })
    );
  }

  updateTask(id: number, req: TaskUpdateRequest) {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}`, req).pipe(
      tap({
        next: (updatedTask) => {
          this._tasks.update(tasks => tasks.map(task => task.id === id ? updatedTask : task));
           this.notification.showSuccess('System changes applied successfully');
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => {
          this._tasks.update(tasks => tasks.filter(task => task.id !== id));
           this.notification.showSuccess('Task successfully deleted from your workspace');
        },
        error: (err) => {
           this.notification.showError(err.error?.error)
        }
      })
    );
  }

}

