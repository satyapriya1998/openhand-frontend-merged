import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Listens to the pointer position at the page level and writes normalized
 * CSS variables (`--pmx`, `--pmy` in the range -1..1, plus `--pmIntensity`)
 * to the document root, so background layers (e.g. the global particle field)
 * can subtly drift with the cursor.
 *
 * No-op on touch / SSR / reduced-motion devices.
 */
@Directive({
  selector: '[appGlobalMouseParallax]',
  standalone: true,
})
export class GlobalMouseParallaxDirective implements OnInit, OnDestroy {
  /** 0..1 — global strength of the page-level parallax drift. */
  @Input() strength = 0.6;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private active = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.active = true;
  }

  ngOnDestroy(): void {
    this.active = false;
  }

  @HostListener('window:pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    if (!this.active) return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const x = (event.clientX / w) * 2 - 1; // -1..1
    const y = (event.clientY / h) * 2 - 1;
    const root = document.documentElement.style;
    root.setProperty('--pmIntensity', this.strength.toFixed(2));
    root.setProperty('--mouse-x', `${event.clientX}px`);
    root.setProperty('--mouse-y', `${event.clientY}px`);
    root.setProperty('--pmx', x.toFixed(3));
    root.setProperty('--pmy', y.toFixed(3));
  }

  @HostListener('window:pointerleave')
  onLeave(): void {
    if (!this.active) return;
    const root = document.documentElement.style;
    root.setProperty('--pmx', '0');
    root.setProperty('--pmy', '0');
  }
}
