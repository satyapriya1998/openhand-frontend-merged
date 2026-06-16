import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { LocaleService } from '../../services/locale.service';
import { RevealDirective } from '../../shared/reveal.directive';

const PLANS = [
  { name: 'Free' as const, monthly: 0, highlighted: false },
  { name: 'Growth' as const, monthly: 2999, highlighted: false },
  { name: 'Business' as const, monthly: 9999, highlighted: true },
  { name: 'Enterprise' as const, monthly: null, highlighted: false },
];

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterModule, SectionHeadingComponent, RevealDirective],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  readonly locale = inject(LocaleService);
  readonly plans = PLANS;
  readonly yearly = signal(false);

  toggleYearly(): void {
    this.yearly.update((value) => !value);
  }

  copy() {
    return this.locale.t().pricing;
  }

  planCopy(name: (typeof PLANS)[number]['name']) {
    return this.copy().plans[name];
  }

  formatPrice(monthly: number | null): string {
    return this.locale.formatPrice(monthly, this.yearly());
  }
}
