import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../core/service/users-service';

@Component({
  selector: 'app-add-member',
  imports: [FormsModule],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  private dialogRef = inject(MatDialogRef<AddMember>);
  private usersService = inject(UsersService);

  data = inject(MAT_DIALOG_DATA);

  userId!: number;
  showError = false;
  users = this.usersService.users$;

  ngOnInit() {
    this.usersService.getUsers().subscribe();
  }

  onAddMember() {
    if (this.userId) {
      this.dialogRef.close(Number(this.userId));
    } else {
      this.showError = true;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
