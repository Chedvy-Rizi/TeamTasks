import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TeamResponse } from '../../shared/models/teams-model';
import { tap } from 'rxjs';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/teams';

  private notification = inject(NotificationService);
  private _teams = signal<TeamResponse[]>([]);
  teams$ = this._teams.asReadonly();

  getTeams() {
    return this.http.get<TeamResponse[]>(`${this.apiUrl}`).pipe(
      tap({
        next: (teams) => {
          this._teams.set(teams);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }

  addTeam(name: string) {
    return this.http.post<TeamResponse>(`${this.apiUrl}`, { name }).pipe(
      tap({
        next: (team) => {
          this._teams.update(teams => [...teams, { ...team, members_count: 1 }]);
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }

  addMemberToTeam(teamId: number, req: { userId: number, role: string }) {
    return this.http.post(`${this.apiUrl}/${teamId}/members`, req).pipe(
      tap({
        next: () => {
          this._teams.update(teams => teams.map(team => team.id === teamId ? { ...team, members_count: team.members_count + 1 } : team));
        },
        error: (err) => {
          this.notification.showError(err.error?.error)
        }
      })
    );
  }

}
