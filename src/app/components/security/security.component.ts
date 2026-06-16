import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { CountUpDirective } from '../../shared/count-up.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';

interface SecurityStat {
  numericValue: number;
  decimals: number;
  formatted: string;
  prefix: string;
  suffix: string;
  label: string;
  textual?: boolean;
}

const STATS: SecurityStat[] = [
  {
    numericValue: 99.99,
    decimals: 2,
    formatted: '99.99',
    prefix: '',
    suffix: '%',
    label: 'Uptime SLA',
  },
  {
    numericValue: NaN,
    decimals: 0,
    formatted: 'Zero',
    prefix: '',
    suffix: '',
    label: 'Downtime Releases',
    textual: true,
  },
  {
    numericValue: 256,
    decimals: 0,
    formatted: '256',
    prefix: '',
    suffix: '-bit',
    label: 'AES Encryption Standard',
  },
];

const FEATURES = [
  { icon: 'fa-fingerprint', title: 'Biometric & MFA Authentication' },
  { icon: 'fa-shield-halved', title: 'SOC 2-Ready Architecture' },
  { icon: 'fa-lock', title: 'AES-256 Encryption at Rest' },
  { icon: 'fa-user-shield', title: 'Granular Role-Based Access' },
  { icon: 'fa-clipboard-check', title: 'Immutable Audit Logs' },
  { icon: 'fa-globe', title: 'GDPR & Data Residency' },
];

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [SectionHeadingComponent, CountUpDirective, RevealDirective, SpotlightDirective],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss',
})
export class SecurityComponent {
  readonly stats = STATS;
  readonly features = FEATURES;
}
