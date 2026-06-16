import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface StatCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: IconDefinition;
  color: string;
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCards {
  readonly cards = input.required<StatCard[]>();
}
