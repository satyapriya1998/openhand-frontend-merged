import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isDark = signal(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('knod-theme');
      const dark = stored ? stored === 'dark' : true;
      this.isDark.set(dark);
      document.documentElement.classList.toggle('dark', dark);
    }
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('knod-theme', next ? 'dark' : 'light');
    }
  }
}
