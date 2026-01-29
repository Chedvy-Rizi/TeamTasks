import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CommentResponse } from '../../shared/models/comment-model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/comments';

  private _comments = signal<CommentResponse[]>([]);
  comments$ = this._comments.asReadonly();

  getComments(taskId: number) {
    return this.http.get<CommentResponse[]>(`${this.baseUrl}?taskId=${taskId}`).pipe(
      tap({
        next: (comments) => {
          this._comments.set(comments);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  addComment(comment: { taskId: number; body: string }) {
    return this.http.post<CommentResponse>(`${this.baseUrl}`, comment).pipe(
      tap({
        next: (newComment) => {
          this._comments.update(comments => [...comments, newComment]);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }
}
