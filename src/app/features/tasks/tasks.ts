import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../core/service/tasks-service';
import { TaskCard } from "../../shared/components/task-card/task-card";
import { AddTask } from "../../shared/components/add-task/add-task";
import { TaskUpdateRequest } from '../../shared/models/task-model';
import { Comments } from '../comments/comments';
import { Projects } from "../projects/projects";
import { Teams } from "../teams/teams";

@Component({
  selector: 'app-tasks',
  imports: [TaskCard, AddTask, Comments, Projects, Teams],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  isAddingTask = signal(false);
  private tasksService = inject(TasksService);
  tasks = this.tasksService.tasks$;
  isOpenComments = signal(false);

  ngOnInit() {
    this.tasksService.getTasks().subscribe();
  }

  addTask() {
    this.isAddingTask.set(true);
  }

  closeAddTask() {
    this.isAddingTask.set(false);
  }

  onDeleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe();
  }

  onUpdateTask(event:{id: number, req: TaskUpdateRequest}) {
    this.tasksService.updateTask(event.id, event.req).subscribe();
  }

  openComments() {
    this.isOpenComments.set(true);
  }

  closeComments() {
    this.isOpenComments.set(false);
  }
}
