import { Injectable } from '@angular/core';
import { HRMS_THEMES } from './theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  applyTheme(themeName: keyof typeof HRMS_THEMES) {
    const theme = HRMS_THEMES[themeName];

    const root = document.documentElement;

    root.style.setProperty('--hrms-primary', theme.primary);
    root.style.setProperty('--hrms-primary-light', theme.primaryLight);
    root.style.setProperty('--hrms-primary-dark', theme.primaryDark);
    root.style.setProperty('--hrms-accent', theme.accent);

    root.style.setProperty('--hrms-sidebar-gradient', theme.sidebarGradient);
  }
}
