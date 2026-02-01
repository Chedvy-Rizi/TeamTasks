import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../../shared/models/teams-model';
import { NotificationService } from './notification-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';

  private _users = signal<UserResponse[]>([]);
  users$ = this._users.asReadonly();

  private notification = inject(NotificationService);

  getUsers() {
    return this.http.get<UserResponse[]>(`${this.apiUrl}`).pipe(
      tap({
        next: (users) => {
          this._users.set(users);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    )
  }

}
