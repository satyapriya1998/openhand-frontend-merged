import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { ConfigService } from '../../core/services/config.service';
import { BreadcrumbItem } from '../../shared/components/breadcrumbs/breadcrumbs';
import { Topbar } from '../topbar/topbar';
import { Sidenav } from '../sidenav/sidenav';

import { ChatbotComponent } from '../../shared/components/chatbot/chatbot.component'; 

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, RouterModule, Topbar, Sidenav, ChatbotComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  private router = inject(Router);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  configService = inject(ConfigService);

  sidebarCollapsed = signal(false);
  mobileMenuOpen = signal(false);
  isMobile = signal(window.innerWidth < 1024);

  showNotifications = signal(false);
  showProfile = signal(false);

  expandedMenus = signal<string[]>([]);
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  // menuItems = computed(() => this.configService.config()?.modules || []);

  menuItems = this.authService.tenantModules

  userInitials = computed(() => {
    const name = this.authService.user()?.name || '';
    return name
      .split(' ')
      .map((n: any) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 1024);
      if (!this.isMobile()) this.mobileMenuOpen.set(false);
    });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.updateBreadcrumbs();
      this.showNotifications.set(false);
      this.showProfile.set(false);
      if (this.isMobile()) this.mobileMenuOpen.set(false);
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  toggleMenu(id: string) {
    this.expandedMenus.update((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));
  }

  toggleNotifications() {
    this.showNotifications.update((v) => !v);
    this.showProfile.set(false);
  }

  toggleProfile() {
    this.showProfile.update((v) => !v);
    this.showNotifications.set(false);
  }

  logout() {
    this.authService.logout();
  }

  private updateBreadcrumbs() {
    const url = this.router.url;
    const segments = url.split('/').filter((s) => s);

    const items: BreadcrumbItem[] = [{ label: 'Home', route: '/dashboard' }];

    let path = '';
    segments.forEach((seg) => {
      path += '/' + seg;
      items.push({
        label: seg.charAt(0).toUpperCase() + seg.slice(1),
        route: path,
      });
    });

    this.breadcrumbs.set(items);
  }
}
