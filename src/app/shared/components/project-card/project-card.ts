import { Component, input, output } from '@angular/core';
import { ProjectResponse } from '../../models/project-model';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [MatIcon,CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<ProjectResponse>();
  seeTasks = output<number>(); 

  onSeeTasksClick() {
    this.seeTasks.emit(this.project().id);
  }
}
