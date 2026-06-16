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
 * Applies a subtle "magnetic" effect to buttons, attracting the element
 * towards the cursor on hover. Disabled on touch devices & SSR.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective implements OnInit, OnDestroy {
  @Input() strength = 0.25;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private rafId: number | null = null;
  private active = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;
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
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const tx = x * this.strength;
    const ty = y * this.strength;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      target.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (!this.active) return;
    const target = this.el.nativeElement;
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    target.style.transform = 'translate3d(0, 0, 0)';
    target.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    this.rafId = requestAnimationFrame(() => {
      target.style.transition = '';
    });
  }
}
