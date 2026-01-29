import { Component, inject } from '@angular/core';
import { AddProject } from '../../shared/components/add-project/add-project';
import { ProjectsService } from '../../core/service/projects-service';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { TasksService } from '../../core/service/tasks-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [AddProject,ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private projectService = inject(ProjectsService);
  private tasksService = inject(TasksService);
  private router = inject(Router);
  projects = this.projectService.projects$;
  isAddingProject = false;

  ngOnInit() {
    this.projectService.getProjects().subscribe();
  }

  addProject() {
    this.isAddingProject = true;
  }
  closeAddProject() {
    this.isAddingProject = false;
  }

  onClickSeeTasks(id:number) {
   this.tasksService.getTaskByProjectId(id).subscribe();
    this.router.navigate(['/tasks']);
  }
}
