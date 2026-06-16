import { Component, HostListener, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  /** Current scroll position 0..1, used by the gradient scroll progress bar. */
  readonly scrollProgress = signal(0);
  
  private lastScrollTime = 0;
  private readonly scrollThrottle = 16; // ~60fps

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.onScroll(), 50);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Throttle scroll events for better performance
    const now = performance.now();
    if (now - this.lastScrollTime < this.scrollThrottle) {
      return;
    }
    this.lastScrollTime = now;
    
    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const progress = Math.min(1, Math.max(0, window.scrollY / max));

    this.scrollProgress.set(progress);
  }
}
