import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardMockupComponent } from '../dashboard-mockup/dashboard-mockup.component';
import { CountUpDirective } from '../../shared/count-up.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { TypingDirective } from '../../shared/directives/typing.directive';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { LocaleService } from '../../services/locale.service';

interface HeroStat {
  numericValue: number;
  decimals: number;
  formatted: string;
  prefix: string;
  suffix: string;
  label: string;
  textual?: boolean;
}

interface Activity {
  initials: string;
  name: string;
  action: string;
  time: string;
  tint: string;
}

const STATS: HeroStat[] = [
  { numericValue: 99.99, decimals: 2, formatted: '99.99', prefix: '', suffix: '%', label: 'Uptime SLA' },
  { numericValue: NaN, decimals: 0, formatted: 'Zero', prefix: '', suffix: '', label: 'Downtime Deploys', textual: true },
  { numericValue: 70, decimals: 0, formatted: '70', prefix: '', suffix: '%', label: 'Faster HR Ops' },
  { numericValue: 50, decimals: 0, formatted: '50', prefix: '', suffix: '+', label: 'Workflows Automated' },
  { numericValue: 100, decimals: 0, formatted: '100', prefix: '', suffix: '%', label: 'Cloud Native' },
];

const INITIAL_ACTIVITIES: Activity[] = [
  { initials: 'AS', name: 'Ananya S.', action: 'completed onboarding', time: 'just now', tint: 'from-aurora-1 to-aurora-3' },
  { initials: 'MR', name: 'Marcus R.', action: 'approved leave request', time: '2m ago', tint: 'from-accent to-aurora-2' },
  { initials: 'PN', name: 'Priya N.', action: 'submitted timesheet', time: '4m ago', tint: 'from-chart-3 to-aurora-3' },
];

const PHRASES = [
  'Built for the Future of Work',
  'Powered by Enterprise AI',
  'Designed for Global Teams',
  'Trusted by 2,800+ Companies',
];

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    DashboardMockupComponent,
    CountUpDirective,
    RevealDirective,
    TypingDirective,
    MagneticDirective,
    SpotlightDirective,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly locale = inject(LocaleService);

  readonly stats = STATS;
  readonly typingPhrases = PHRASES;

  readonly activities = signal<Activity[]>(INITIAL_ACTIVITIES);
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.timer = setInterval(() => this.rotate(), 3500);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private rotate(): void {
    const next: Activity = {
      initials: ['JD', 'KL', 'TS', 'RP', 'EW', 'BH'][Math.floor(Math.random() * 6)],
      name: ['Jordan D.', 'Kira L.', 'Theo S.', 'Riya P.', 'Elena W.', 'Bao H.'][Math.floor(Math.random() * 6)],
      action: [
        'requested time off',
        'joined Engineering',
        'completed a review',
        'updated profile',
        'submitted expense',
        'booked onboarding',
      ][Math.floor(Math.random() * 6)],
      time: 'just now',
      tint: ['from-aurora-1 to-aurora-3', 'from-accent to-aurora-2', 'from-chart-3 to-aurora-3', 'from-chart-4 to-aurora-3'][
        Math.floor(Math.random() * 4)
      ],
    };
    this.activities.update((arr) => [next, ...arr].slice(0, 3));
  }
}
