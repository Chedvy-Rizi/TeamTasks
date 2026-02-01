import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-generic-error',
  imports: [MatIcon],
  templateUrl: './generic-error.html',
  styleUrl: './generic-error.css',
})
export class GenericError {

  public data = inject<{ message: string }>(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef<GenericError>);
}
