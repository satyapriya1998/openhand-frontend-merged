import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealDirective } from '../../shared/reveal.directive';

const ROWS = [
  'AI Powered',
  'Faster Setup',
  'Better UI',
  'Modular Architecture',
  'Unlimited Customization',
  'Better Analytics',
  'Global Ready',
  'Cost Effective',
  'Zero Downtime',
  'Modern APIs',
  'Mobile First',
];

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss',
})
export class ComparisonComponent {
  readonly rows = ROWS;
}
