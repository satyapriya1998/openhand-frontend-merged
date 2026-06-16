import { Routes } from '@angular/router';

export const ASSETS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./assets').then((m) => m.Assets),
  },

  {
    path: ':id',
    data: {
      breadcrumb: 'Asset Details',
    },
    loadComponent: () => import('./asset-details/asset-details').then((m) => m.AssetDetails),
  },
];
