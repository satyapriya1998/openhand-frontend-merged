import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotificationService } from '../../../core/services/notification.service'; 


import { BreadcrumbItem } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { Topbar } from '../topbar/topbar';
import { Sidenav } from '../sidenav/sidenav';

//import { ChatbotComponent } from '../../../shared/components/chatbot/chatbot.component';
import { PublicAuthService } from '../../../core/services/public.service';

@Component({
  selector: 'app-public-layout',
  imports: [CommonModule, RouterOutlet, RouterModule, Topbar, Sidenav],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {

    private router = inject(Router);
 notificationService = inject(NotificationService);
  publicAuthService = inject(PublicAuthService)

   sidebarCollapsed = signal(false);
  mobileMenuOpen = signal(false);
  isMobile = signal(window.innerWidth < 1024);

  showNotifications = signal(false);
  showProfile = signal(false);

  expandedMenus = signal<string[]>(['administration', 'leaves']);
  breadcrumbs = signal<BreadcrumbItem[]>([]);

    menuItems = signal({
  modules: [
    {
      id: 'welcome',
      name: 'Welcome',
      icon: 'user',
      route: '/public/onboarding/welcome',
      enabled: true
    },
    {
      id: 'personalInfo',
      name: 'Personal Info',
      icon: 'user',
      route: '/public/onboarding/personal-info',
      enabled: true
    },
    {
      id: 'address',
      name: 'Address',
      icon: 'user',
      route: '/public/onboarding/address',
      enabled: true
    },
    {
      id: 'education',
      name: 'Education',
      icon: 'user',
      route: '/public/onboarding/education',
      enabled: true
    },
      {
      id: 'experience',
      name: 'Experience',
      icon: 'user',
      route: '/public/onboarding/experience',
      enabled: true
    },
      {
      id: 'documents',
      name: 'Documents',
      icon: 'user',
      route: '/public/onboarding/documents',
      enabled: true
    },
      {
      id: 'bankDetials',
      name: 'Bank Detials',
      icon: 'user',
      route: '/public/onboarding/bank-details',
      enabled: true
    },
     {
      id: 'emergencyContact',
      name: 'Emergency Contact',
      icon: 'user',
      route: '/public/onboarding/emergency-contact',
      enabled: true
    },
     {
      id: 'reviewAndSubmit',
      name: 'Review & Submit',
      icon: 'user',
      route: '/public/onboarding/review-submit',
      enabled: true
    },
    
   
  ],
  permissions: [],
  forms: []
});

 userInitials = computed(() => {
    const name = this.publicAuthService.authUser();
    return name
    
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
    // this.authService.logout();
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
