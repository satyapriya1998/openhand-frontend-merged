import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { PageSubHeader } from '../page-sub-header/page-sub-header';

export interface QuickActionItem {
  label: string;
  icon: any;
  action: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, PageSubHeader],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss',
})
export class QuickActions {
  @Input() title = 'Quick Actions';
  @Input() icon: IconDefinition = faBolt;

  @Input() subtitle = 'Shortcuts';

  @Input() actions: QuickActionItem[] = [];

  @Output() actionClick = new EventEmitter<string>();
  faBolt = faBolt;
  onAction(action: string): void {
    this.actionClick.emit(action);
  }
}



