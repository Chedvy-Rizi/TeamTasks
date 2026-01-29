import { Component, input } from '@angular/core';
import { TeamResponse } from '../../models/teams-model';

@Component({
  selector: 'app-taem-card',
  imports: [],
  templateUrl: './taem-card.html',
  styleUrl: './taem-card.css',
})
export class TaemCard {
  taem = input.required<TeamResponse>();
  
}
