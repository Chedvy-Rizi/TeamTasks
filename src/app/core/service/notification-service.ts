import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericError } from '../../shared/components/generic-error/generic-error';
import { GenericSucces } from '../../shared/components/generic-succes/generic-succes';


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
    this.snackBar.openFromComponent(GenericSucces, {
      data: { message: message },
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['hitech-success-snackbar'] 
    });
  }
}