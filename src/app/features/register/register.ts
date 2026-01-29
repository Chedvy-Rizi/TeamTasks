import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth-service';
import { RegisterRequest } from '../../shared/models/auth-model';
import { AuthForm } from '../../shared/components/auth-form/auth-form';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [AuthForm, RouterLink, RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
 
  onRegister(formData:RegisterRequest) {
    this.authService.Register(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/tasks']);
      }
    });
}
}
