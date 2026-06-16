import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
})
export class SectionHeadingComponent {
  @Input() eyebrow?: string;
  @Input({ required: true }) title!: string;
  @Input() description?: string;
}
