import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/public-login/public-login').then(
        (m) => m.PublicLogin
      ),
  },

  {
    path: '',
    loadComponent: () =>
      import('./layout/public-layout/public-layout').then(
        (m) => m.PublicLayout
      ),
    children: [
      {
        path: 'onboarding',
        children: [
          {
            path: '',
            redirectTo: 'welcome',
            pathMatch: 'full',
          },

          {
            path: 'welcome',
            loadComponent: () =>
              import('./pages/public-welcome/public-welcome').then(
                (m) => m.PublicWelcome
              ),
          },

          {
            path: 'personal-info',
            loadComponent: () =>
              import('./pages/public-personal-info/public-personal-info').then(
                (m) => m.PublicPersonalInfo
              ),
          },

          {
            path: 'address',
            loadComponent: () =>
              import('./pages/public-address/public-address').then(
                (m) => m.PublicAddress
              ),
          },

          {
            path: 'education',
            loadComponent: () =>
              import('./pages/public-education/public-education').then(
                (m) => m.PublicEducation
              ),
          },

          {
            path: 'experience',
            loadComponent: () =>
              import('./pages/public-experience/public-experience').then(
                (m) => m.PublicExperience
              ),
          },

          {
            path: 'documents',
            loadComponent: () =>
              import('./pages/public-documents/public-documents').then(
                (m) => m.PublicDocuments
              ),
          },

          {
            path: 'bank-details',
            loadComponent: () =>
              import('./pages/public-bank-detials/public-bank-detials').then(
                (m) => m.PublicBankDetials
              ),
          },

          {
            path: 'emergency-contact',
            loadComponent: () =>
              import('./pages/public-emergency-contact/public-emergency-contact').then(
                (m) => m.PublicEmergencyContact
              ),
          },

          {
            path: 'review-submit',
            loadComponent: () =>
              import('./pages/public-review-and-submit/public-review-and-submit').then(
                (m) => m.PublicReviewAndSubmit
              ),
          },
        ],
      },
    ],
  },
];