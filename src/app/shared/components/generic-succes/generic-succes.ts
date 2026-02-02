import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-generic-succes',
  imports: [MatIcon],
  templateUrl: './generic-succes.html',
  styleUrl: './generic-succes.css',
})
export class GenericSucces {
snackBarRef = inject(MatSnackBarRef);
  data = inject(MAT_SNACK_BAR_DATA);
}
