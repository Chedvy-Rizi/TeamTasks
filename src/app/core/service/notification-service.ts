import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericError } from '../../shared/components/generic-error/generic-error';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);


  
  
  showError(message: string) {
    this.snackBar.openFromComponent(GenericError, {
      data: { message: message }, 
      duration: 5000,             
      horizontalPosition: 'end',  
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar-wrapper'] 
    });
  }


  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'] 
    });
  }
}