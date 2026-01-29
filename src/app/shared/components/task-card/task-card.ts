import { Component, input, Input, output } from '@angular/core';
import { TaskResponse, TaskUpdateRequest } from '../../models/task-model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  task = input.required<TaskResponse>();
  deleteTask = output<number>();
  updateTask = output<{ id: number, req: TaskUpdateRequest }>();

  statuses = ['todo', 'in_progress', 'done'];
  priorities = ['low', 'normal', 'high'];

  onDeleteTask() {
    this.deleteTask.emit(this.task().id);
  }

  onUpdateTask(id: number, req: TaskUpdateRequest) {
    this.updateTask.emit({ id, req });
  }
}
