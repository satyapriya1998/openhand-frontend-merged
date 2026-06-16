import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Animates a numeric value from 0 (or `from`) to the bound value when the
 * element scrolls into view. The textContent of the host element is updated
 * on every animation frame so the user sees a smooth count-up.
 *
 * Usage:
 *   <span [appCountUp]="2847" [decimals]="0" [duration]="1500">0</span>
 *   <span [appCountUp]="99.99" [decimals]="2" suffix="%">0%</span>
 *   <span [appCountUp]="50" suffix="+">0+</span>
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appCountUp') value = 0;
  @Input() from = 0;
  @Input() duration = 1500;
  @Input() decimals = 0;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() separator = ',';
  @Input() delay = 0;
  /** When true the value re-animates every time it enters the viewport. */
  @Input() repeat = false;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;
  private rafId?: number;
  private startTime?: number;
  private hasAnimated = false;

  ngOnInit(): void {
    // Render the starting value so SSR / first paint doesn't show "undefined".
    this.render(this.from);

    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!this.hasAnimated || this.repeat) {
              this.hasAnimated = true;
              this.animate();
            }
          } else if (this.repeat) {
            // Allow re-animation when scrolled out and back in.
            this.hasAnimated = false;
            this.render(this.from);
          }
        }
      },
      { threshold: 0.35 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-trigger animation if the target value changes after first paint
    // (e.g. live data feed, language switch, etc.).
    if (changes['value'] && !changes['value'].firstChange && this.hasAnimated) {
      this.animate();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private animate(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.delay > 0) {
      setTimeout(() => this.start(), this.delay);
    } else {
      this.start();
    }
  }

  private start(): void {
    this.startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - (this.startTime ?? now);
      const progress = Math.min(elapsed / this.duration, 1);
      // easeOutCubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = this.from + (this.value - this.from) * eased;
      this.render(current);
      if (progress < 1) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.rafId = undefined;
        this.render(this.value);
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private render(n: number): void {
    const fixed = n.toFixed(this.decimals);
    const [intPart, decPart] = fixed.split('.');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);
    const text = decPart
      ? `${this.prefix}${formattedInt}.${decPart}${this.suffix}`
      : `${this.prefix}${formattedInt}${this.suffix}`;
    this.el.nativeElement.textContent = text;
  }
}
