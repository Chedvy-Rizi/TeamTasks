import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { TasksService } from '../../core/service/tasks-service';
import { AddTask } from "../../shared/components/add-task/add-task";
import { TaskResponse, TaskUpdateRequest } from '../../shared/models/task-model';
import { Comments } from '../comments/comments';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute } from '@angular/router';
import { TaskCard } from "../../shared/components/task-card/task-card";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatDialogModule, MatIcon, TaskCard],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private tasksService = inject(TasksService);

  viewMode = signal<'board' | 'list'>('board');
  statuses = ['todo', 'in_progress', 'done'];

  tasks = computed(() => {
    const projectId = this.route.snapshot.params['projectId'];
    return this.tasksService.getFilteredTasks(projectId);
  });

  ngOnInit() {
    this.tasksService.getTasks().subscribe();
  }

  triggerAddTask(status: string) {
    this.dialog.open(AddTask, {
      width: '500px',
      data: { status: status },
      panelClass: 'custom-dialog-container'
    });
  }

 onDrop(event: CdkDragDrop<string>) {
  const task = event.item.data; 
  const newStatus = event.container.data; 

  if (task.status !== newStatus) {
    this.onUpdateTask({ id: task.id, req: { status: newStatus } });
  }
}
  onUpdateTask(event: { id: number, req: TaskUpdateRequest }) {
    this.tasksService.updateTask(event.id, event.req).subscribe();
  }

  onDeleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe();
  }

  openComments(taskId: number) {
    this.dialog.open(Comments, {
      width: '600px',
      data: { taskId: taskId },
      panelClass: 'custom-dialog-container'
    });
  }

  toggleView(mode: 'board' | 'list') {
    this.viewMode.set(mode);
  }
}