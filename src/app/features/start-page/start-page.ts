import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css',
})
export class StartPage {
  
}
