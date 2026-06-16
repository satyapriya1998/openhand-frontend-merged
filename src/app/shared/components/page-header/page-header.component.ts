import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-page-header',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeader {
  @Input() title = '';
  @Input() subtitle: string | null = null;
  // @Input() icon: string | null = null;

  @Input() icon!: IconDefinition;
}
