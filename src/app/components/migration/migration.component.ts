import { Component, inject } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { LocaleService } from '../../services/locale.service';

const STEPS = [
  { icon: 'fa-upload', title: 'Upload', desc: 'CSV import or one-click connect' },
  { icon: 'fa-file-circle-check', title: 'Validate', desc: 'Automatic data validation' },
  { icon: 'fa-database', title: 'Map', desc: 'Smart field mapping' },
  { icon: 'fa-download', title: 'Go Live', desc: 'Bulk migration complete' },
];

const POINTS = [
  'One-click import',
  'Bulk employee migration',
  'CSV imports',
  'Data validation',
  'Legacy HRMS migration',
  'Export anytime',
  'No vendor lock-in',
];

@Component({
  selector: 'app-migration',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective, SpotlightDirective],
  templateUrl: './migration.component.html',
  styleUrl: './migration.component.scss',
})
export class MigrationComponent {
  readonly locale = inject(LocaleService);
  readonly steps = STEPS;
  readonly points = POINTS;
}