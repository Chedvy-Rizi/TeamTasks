import { Component, input, output } from '@angular/core';
import { TeamResponse } from '../../models/teams-model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-taem-card',
  imports: [MatIcon],
  templateUrl: './taem-card.html',
  styleUrl: './taem-card.css',
})
export class TaemCard {
  taem = input.required<TeamResponse>();
  
  requestAddMember = output<void>(); 

  onBtnClick() {
    this.requestAddMember.emit(); 
  }
}
