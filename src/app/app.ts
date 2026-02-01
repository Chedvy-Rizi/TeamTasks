import { Component, inject, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { Sidebar } from "./shared/components/sidebar/sidebar";
import { AuthService } from './core/service/auth-service';
import { Header } from "./shared/components/header/header";
import { Loader } from "./shared/components/loader/loader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TeamTasks');
  private authService = inject(AuthService);

  user = this.authService.user$;
}
