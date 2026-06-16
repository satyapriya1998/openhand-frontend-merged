import { Directive, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Renders a typewriter effect by stepping through the supplied phrases
 * one character at a time. Pure DOM, no third party.
 *
 * Starts by typing the first phrase (never erasing it on first run).
 */
@Directive({
  selector: '[appTyping]',
  standalone: true,
})
export class TypingDirective implements OnInit, OnDestroy {
  @Input() phrases: string[] = [];
  /** ms per character while typing. Default tuned for a pleasant, readable pace. */
  @Input() typeSpeed = 48;
  /** ms per character while erasing. */
  @Input() eraseSpeed = 26;
  /** ms to wait once a phrase is fully typed before erasing. */
  @Input() pauseTime = 1600;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.phrases.length === 0) {
      this.el.nativeElement.textContent = this.phrases[0] ?? '';
      return;
    }
    this.el.nativeElement.classList.add('typing-cursor');
    this.el.nativeElement.setAttribute('aria-live', 'polite');
    this.el.nativeElement.style.contain = 'content';
    // Always start at zero so the very first run is a "typing" animation,
    // not an "erasing" animation.
    this.run(0, 0);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  /**
   * Drive a single phrase from `from` characters to `to` characters,
   * then schedule the next phase.
   */
  private run(phraseIndex: number, from: number, isErase = false): void {
    const phrase = this.phrases[phraseIndex];
    let i = from;

    const step = () => {
      if (!isErase && i < phrase.length) {
        // Typing: add one character.
        i++;
        this.el.nativeElement.textContent = phrase.slice(0, i);
        this.timer = setTimeout(step, this.typeSpeed);
      } else if (isErase && i > 0) {
        // Erasing: remove one character.
        i--;
        this.el.nativeElement.textContent = phrase.slice(0, i);
        this.timer = setTimeout(step, this.eraseSpeed);
      } else if (isErase) {
        // Finished erasing — move on to typing the next phrase.
        const next = (phraseIndex + 1) % this.phrases.length;
        this.timer = setTimeout(() => this.run(next, 0, false), 220);
      } else {
        // Finished typing — pause, then erase.
        this.timer = setTimeout(() => this.run(phraseIndex, phrase.length, true), this.pauseTime);
      }
    };

    step();
  }
}