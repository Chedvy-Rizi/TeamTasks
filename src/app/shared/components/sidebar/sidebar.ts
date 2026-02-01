import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service/auth-service'; // וודא נתיב נכון
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthResponse } from '../../models/auth-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  public authService = inject(AuthService);
  user= this.authService.user$;
}