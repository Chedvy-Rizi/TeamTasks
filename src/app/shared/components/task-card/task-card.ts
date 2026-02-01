import { Component, inject, input, output, signal } from '@angular/core';
import { TaskResponse, TaskUpdateRequest } from '../../models/task-model';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comments } from '../../../features/comments/comments';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatIcon, CommonModule, FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  private dialog = inject(MatDialog);
  task = input.required<TaskResponse>();
  viewMode = input.required<'board' | 'list'>();

  update = output<{ id: number, req: TaskUpdateRequest }>();
  delete = output<number>();

  isComments = signal(false);

  statuses = ['todo', 'in_progress', 'done'];
  priorities = ['low', 'normal', 'high'];

  updateField(changes: TaskUpdateRequest) {
    this.update.emit({
      id: this.task().id,
      req: changes
    });
  }

  openComments() {
    this.dialog.open(Comments, {
      width: '500px',
      data: { taskId: this.task().id },
      panelClass: 'custom-dialog-container' 
    });
  }
  onDelete() {
    this.delete.emit(this.task().id);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'todo': return '#ef4444';
      case 'in_progress': return '#3291ff';
      case 'done': return '#00d26a';
      default: return '#94a3b8';
    }
  }
}
