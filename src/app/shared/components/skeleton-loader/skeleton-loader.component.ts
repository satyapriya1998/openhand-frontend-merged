import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
    standalone: true,
  imports: [CommonModule],
})
export class SkeletonLoaderComponent {
  @Input() rows = 4;
  @Input() variant: 'table' | 'cards' | 'profile' | 'line' = 'table';

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i);
  }
}