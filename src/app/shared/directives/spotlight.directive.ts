import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Adds a spotlight effect (radial gradient following the cursor) to
 * card-like elements. Disabled on touch devices and reduced motion.
 */
@Directive({
  selector: '[appSpotlight]',
  standalone: true,
  host: {
    '[style.position]': '"relative"',
    '[style.overflow]': '"hidden"',
  },
})
export class SpotlightDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private active = false;
  private rafId: number | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    this.active = true;
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  @HostListener('pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    if (!this.active) return;
    const target = this.el.nativeElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      target.style.setProperty('--spotlight-x', `${x}px`);
      target.style.setProperty('--spotlight-y', `${y}px`);
    });
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (!this.active) return;
    const target = this.el.nativeElement;
    target.style.setProperty('--spotlight-x', `-9999px`);
    target.style.setProperty('--spotlight-y', `-9999px`);
  }
}
