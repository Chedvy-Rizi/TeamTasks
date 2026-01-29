import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-member',
  imports: [FormsModule],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  addMemmber = output<number>();
  userId!: number;

  onAddMember() {
    this.addMemmber.emit(this.userId);
  }
}
