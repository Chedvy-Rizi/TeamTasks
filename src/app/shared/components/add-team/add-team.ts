import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-team',
  imports: [FormsModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam {
  addTask = output<string>();
  teamName = '';

  onAddTeam() {
    this.addTask.emit(this.teamName);
  }
}
