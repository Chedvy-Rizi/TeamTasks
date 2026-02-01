import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/service/loading-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
loadingService = inject(LoadingService);
}
