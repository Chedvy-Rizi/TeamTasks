import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../../shared/models/auth-model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  private router = inject(Router);
  private notification = inject(NotificationService);

  private _user = signal<AuthUser | null>(null);
  user$ = this._user.asReadonly();

  constructor() {
    this.initAuth();
  }

  Register(request: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this._user.set(res.user);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }

  Login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this._user.set(res.user);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }

  initAuth() {
    const token = localStorage.getItem('token');

    if (token) {
      this.http.get<AuthUser>(`${this.apiUrl}/me`).subscribe({
        next: (res) => {
          this._user.set(res);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
          this.logout();
        }
      });

    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this._user.set(null);
    this.router.navigate(['/login']);
  }

}
