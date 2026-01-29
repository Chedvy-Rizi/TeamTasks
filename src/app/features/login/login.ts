import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth-service';
import { LoginRequest } from '../../shared/models/auth-model';
import { AuthForm } from '../../shared/components/auth-form/auth-form';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [AuthForm, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(formData: LoginRequest) {
    this.authService.Login(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/tasks']);
      }
    });
  }
}
