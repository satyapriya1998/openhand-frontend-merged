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
 * Subtle 3D tilt-on-hover for hero cards & feature previews.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit, OnDestroy {
  @Input() maxTilt = 6;
  @Input() scale = 1.01;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private rafId: number | null = null;
  private active = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.active = true;
    this.el.nativeElement.style.transformStyle = 'preserve-3d';
    this.el.nativeElement.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  @HostListener('pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    if (!this.active) return;
    const target = this.el.nativeElement;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * this.maxTilt;
    const ry = (px - 0.5) * this.maxTilt;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      target.style.transition = 'transform 0.05s linear';
      target.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${this.scale})`;
    });
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (!this.active) return;
    const target = this.el.nativeElement;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    target.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    target.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
  }
}
