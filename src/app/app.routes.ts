import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // PUBLIC WEBSITE
  // localhost:4200/public/*
  {
    path: 'public',
    loadChildren: () => import('./publicModule/public.routes').then((m) => m.PUBLIC_ROUTES),
  },

  // AUTH
  // localhost:4200/auth/*
  // knodtec.localhost:4200/auth/*
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // LANDING PAGE (Public - No auth required)
  {
    path: '',
    loadComponent: () =>
      import('./landing-home/landing-home.component').then((m) => m.LandingHomeComponent),
  },

  // PROTECTED HRMS
  {
    path: 'app',
    canActivate: [authGuard],

    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),

    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        data: {
          breadcrumb: 'Dashboard',
        },
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },

      {
        path: 'profile',
        data: {
          breadcrumb: 'Profile',
        },
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },

      {
        path: 'admin',
        data: {
          breadcrumb: 'Administration',
        },
        loadChildren: () =>
          import('./features/administration/admin.routes').then((m) => m.ADMIN_ROUTES),
      },

      {
        path: 'leaves',
        data: {
          breadcrumb: 'Leaves',
        },
        loadChildren: () => import('./features/leaves/leaves.routes').then((m) => m.LEAVES_ROUTES),
      },
      {
        path: 'onboarding',
        data: { breadcrumb: 'Onboarding' },
        loadChildren: () =>
          import('./features/onboarding/onboarding.routes').then((m) => m.ONBOARDING_ROUTES),
      },

      {
        path: 'assets',
        data: {
          breadcrumb: 'Assets',
        },
        loadChildren: () => import('./features/assets/assets.routes').then((m) => m.ASSETS_ROUTES),
      },
    ],
  },

  // NOT FOUND
  {
    path: '**',
    redirectTo: '',
  },
];
