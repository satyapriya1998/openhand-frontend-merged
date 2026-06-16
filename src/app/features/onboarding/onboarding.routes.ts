import { Routes } from '@angular/router';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: 'list',
    data: { breadcrumb: 'Onboarding List' },
    loadComponent: () => import('./onboarding-list/onboarding-list').then((m) => m.OnboardingList),
  },
//   {
//     path: 'detail',
//     data: { breadcrumb: 'Onboarding Detail' },
//     loadComponent: () =>
//       import('./onboarding-detail/onboarding-detail').then((m) => m.OnboardingDetail),
//   },
  {
    path: 'detail/:id',
    data: { breadcrumb: 'Onboarding Detail' },
    loadComponent: () =>
      import('./onboarding-detail/onboarding-detail').then((m) => m.OnboardingDetail),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];