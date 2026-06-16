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
 * Adds an "in-view" class to the host element the first time it scrolls into
 * the viewport. Pair with a CSS transition/animation to reveal sections.
 *
 * Usage:
 *   <div appReveal class="reveal">...</div>
 *   <div appReveal [delay]="200" class="reveal">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() delay = 0;
  @Input() threshold = 0.15;
  /** When true, removes the class and re-applies it on every entry. */
  @Input() repeat = false;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.el.nativeElement.classList.add('reveal-pending');
    if (this.delay) this.el.nativeElement.style.transitionDelay = `${this.delay}ms`;

    if (!isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.classList.add('reveal-shown');
      this.el.nativeElement.classList.remove('reveal-pending');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('reveal-shown');
            this.el.nativeElement.classList.remove('reveal-pending');
            if (!this.repeat) this.observer?.unobserve(entry.target);
          } else if (this.repeat) {
            this.el.nativeElement.classList.remove('reveal-shown');
            this.el.nativeElement.classList.add('reveal-pending');
          }
        }
      },
      { threshold: this.threshold },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
