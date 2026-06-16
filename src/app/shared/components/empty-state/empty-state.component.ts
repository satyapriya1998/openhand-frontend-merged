import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
   standalone: true,
  imports: [CommonModule],
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'No data to show';
  @Input() message = 'Try adjusting your filters or come back later.';
  @Input() actionLabel: string | null = null;
}