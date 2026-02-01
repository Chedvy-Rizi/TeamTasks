import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { sign } from 'crypto';
import { ProjectRequest, ProjectResponse } from '../../shared/models/project-model';
import { tap } from 'rxjs';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/projects';

  private notification = inject(NotificationService);
  private projects = signal<ProjectResponse[]>([]);
  projects$ = this.projects.asReadonly();

  getProjects() {
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}`).pipe(
      tap({
        next: (projects) => {
          this.projects.set(projects);
        },
        error: (err) => {
         this.notification.showError(err.error?.error)
        }
      })
    );
  }

  addProject(req: ProjectRequest) {
    return this.http.post<ProjectResponse>(`${this.apiUrl}`, req).pipe(
      tap({
        next: (project) => {
          this.projects.update(projects => [...projects, project]);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }
}
