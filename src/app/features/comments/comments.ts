import { Component, inject, OnInit } from '@angular/core';
import { CommentsService } from '../../core/service/comments-service';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments implements OnInit {
  private commentsService = inject(CommentsService);
  private dialogRef = inject(MatDialogRef<Comments>);
  data = inject(MAT_DIALOG_DATA);

  comments = this.commentsService.comments$;
  newCommentBody = '';

  ngOnInit() {
    this.commentsService.getComments(this.data.taskId).subscribe();
  }

  addComment() {
    if (this.newCommentBody.trim()) {
      this.commentsService
        .addComment({ taskId: this.data.taskId, body: this.newCommentBody })
        .subscribe(() => {
          this.newCommentBody = '';
        });
    }
  }
  
  onClose() {
    this.dialogRef.close();
  }
}