import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-sub-header',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './page-sub-header.html',
  styleUrl: './page-sub-header.scss',
})
export class PageSubHeader {
  @Input() title = '';
  @Input() subtitle: string | null = null;

  @Input() icon!: IconDefinition;

  // CUSTOMIZATION
  @Input() titleSize = '18px';
  @Input() titleWeight = 700;

  @Input() subtitleSize = '12px';

  @Input() compact = false;

  @Input() iconSize = '18px';
  @Input() iconContainerSize = '42px';
  @Input() variant: 'default' | 'policy' | 'card' = 'default';
  
}
