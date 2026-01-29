import { Component, inject, input, output } from '@angular/core';
import { CommentsService } from '../../core/service/comments-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [FormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  private commentsService = inject(CommentsService);
  taskId = input.required<number>();
  closeComments = output<void>();
  comments = this.commentsService.comments$;
  newCommentBody = '';

  ngOnInit() {
    this.commentsService.getComments(this.taskId()).subscribe();
  }
  addComment() {
    if (this.newCommentBody.trim()) {
      this.commentsService
        .addComment({ taskId: this.taskId(), body: this.newCommentBody })
        .subscribe(() => {
          this.newCommentBody = '';
        });
    }
  }
  onCloseComments() {
    this.closeComments.emit();
  }
}
