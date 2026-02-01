import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-team',
  imports: [FormsModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam {
  private dialogRef = inject(MatDialogRef<AddTeam>);
  addTask = output<string>();
  teamName = '';
  showError: boolean = false;

  

  onAddTeam() {
    if (this.teamName.trim()) {
      this.dialogRef.close(this.teamName);
    } else {
      this.showError = true;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
