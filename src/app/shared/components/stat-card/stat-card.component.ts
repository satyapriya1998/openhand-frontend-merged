import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
   standalone: true,
  imports: [CommonModule],
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value: string | number = 0;
  @Input() icon = 'insights';
  @Input() color: 'primary' | 'accent' | 'warning' | 'danger' | 'info' = 'primary';
  @Input() trend: string | null = null;
  @Input() trendUp = true;
}