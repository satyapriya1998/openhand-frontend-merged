import { Component, OnDestroy, signal } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealDirective } from '../../shared/reveal.directive';

const TESTIMONIALS = [
  {
    quote:
      'Knodtecone replaced four separate tools and cut our HR operations time by 70%. The AI copilot answers employee questions before they even reach my desk.',
    name: 'Ananya Sharma',
    role: 'HR Director, FinEdge',
    initials: 'AS',
  },
  {
    quote:
      'Migration from our legacy system took three days, not three months. The multi-tenant architecture scaled effortlessly across our 12 global offices.',
    name: 'Marcus Reedwell',
    role: 'CTO, Northbridge Labs',
    initials: 'MR',
  },
  {
    quote:
      'As a founder, I needed something that just works. Beautiful UI, zero downtime, and the analytics give me a real-time pulse on the entire workforce.',
    name: 'Priya Nair',
    role: 'Founder & CEO, Lumora',
    initials: 'PN',
  },
  {
    quote:
      "The no-code workflow builder let my ops team automate onboarding and approvals without engineering help. It's a genuine force multiplier.",
    name: 'Daniel Okafor',
    role: 'Head of Operations, Veltrix',
    initials: 'DO',
  },
];

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements OnDestroy {
  readonly testimonials = TESTIMONIALS;
  readonly index = signal(0);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.intervalId = setInterval(() => {
      this.index.update((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  current() {
    return this.testimonials[this.index()];
  }

  go(dir: number): void {
    this.index.update(
      (i) => (i + dir + this.testimonials.length) % this.testimonials.length,
    );
  }

  goTo(i: number): void {
    this.index.set(i);
  }
}
