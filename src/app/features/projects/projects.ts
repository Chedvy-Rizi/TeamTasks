import { Component, inject, signal } from '@angular/core';
import { ProjectsService } from '../../core/service/projects-service';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { TasksService } from '../../core/service/tasks-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProject } from '../../shared/components/add-project/add-project';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, MatIcon],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private projectService = inject(ProjectsService);
  private tasksService = inject(TasksService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  projects = this.projectService.projects$;

  ngOnInit() {
    this.projectService.getProjects().subscribe();
  }

  

  onClickSeeTasks(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  openAddProject() {
    const dialogRef = this.dialog.open(AddProject, {
      width: '450px',
      panelClass: 'tech-dialog-container' 
    });
  }
}
