import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';

const LOGOS = [
  'Nimbus',
  'Vortex Labs',
  'Quanta',
  'Helio',
  'Northwind',
  'Apex Cloud',
  'Lumen',
  'Stratus',
  'Forge',
  'Meridian',
];

@Component({
  selector: 'app-trusted-by',
  standalone: true,
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './trusted-by.component.html',
  styleUrl: './trusted-by.component.scss',
})
export class TrustedByComponent {
  readonly logos = [...LOGOS, ...LOGOS];
}
