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
 * Adds a soft mouse-following color shift (and optional parallax tilt)
 * to its host element. The element gets a layered radial-gradient that
 * follows the cursor, plus CSS custom properties that other styles
 * (`.mouse-shift-bg`, `.mouse-shift-glow`, …) can read to react.
 *
 * Usage:
 *   <div appMouseParallax>...</div>
 *   <div appMouseParallax [intensity]="0.6">...</div>
 *
 * The directive is a no-op on touch / SSR / reduced-motion devices.
 */
@Directive({
  selector: '[appMouseParallax]',
  standalone: true,
  host: {
    '[style.position]': '"relative"',
    '[style.overflow]': '"hidden"',
  },
})
export class MouseParallaxDirective implements OnInit, OnDestroy {
  /** 0..1 — how strong the color shift follows the cursor. */
  @Input() intensity = 0.55;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private active = false;
  private rafId: number | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
    const px = x / rect.width;   // 0..1
    const py = y / rect.height;  // 0..1
    const intensity = this.intensity;

    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      // Color-shift: hue rotation + position-aware tint, exposed as CSS vars.
      const hueShift = (px - 0.5) * 18 * intensity;
      const sat = 1 + py * 0.08 * intensity;
      target.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
      target.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
      target.style.setProperty('--mhue', `${hueShift.toFixed(2)}deg`);
      target.style.setProperty('--msat', sat.toFixed(3));
      target.style.setProperty('--mintensity', intensity.toFixed(2));
      // Subtle 3d parallax: tilt the element a few degrees.
      const rx = (0.5 - py) * 4 * intensity;
      const ry = (px - 0.5) * 4 * intensity;
      target.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      target.style.setProperty('--mtx', `${(px - 0.5) * 16 * intensity}px`);
      target.style.setProperty('--mty', `${(py - 0.5) * 16 * intensity}px`);
    });
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (!this.active) return;
    const target = this.el.nativeElement;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    target.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    target.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
    target.style.setProperty('--mintensity', '0');
    this.rafId = requestAnimationFrame(() => {
      target.style.transition = '';
    });
  }
}
