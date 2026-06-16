import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Advanced scroll-reveal directive used in the "premium" sections.
 * Adds a one-time class on intersection. Pairs with CSS `.reveal-fade-*`
 * keyframes defined in `styles.scss`.
 *
 * Variants:
 *   appReveal             → fade-up
 *   appReveal="scale"     → scale-in
 *   appReveal="blur"      → blur-to-focus
 *   appReveal="left"      → slide-in-left
 *   appReveal="right"     → slide-in-right
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: {
    '[class.reveal-pending]': 'true',
    '[attr.data-reveal]': 'variant',
  },
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() variant: 'up' | 'scale' | 'blur' | 'left' | 'right' = 'up';
  @Input() delay = 0;
  @Input() threshold = 0.15;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    if (this.delay) node.style.transitionDelay = `${this.delay}ms`;

    if (!isPlatformBrowser(this.platformId)) {
      node.classList.remove('reveal-pending');
      node.classList.add('reveal-shown');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.remove('reveal-pending');
            node.classList.add('reveal-shown');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: this.threshold, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
