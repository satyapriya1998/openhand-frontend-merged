import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'users',
    data: { breadcrumb: 'Users' },
    loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent),
    canActivate: [permissionGuard('view')],
  },
  {
    path: 'organization',
    data: { breadcrumb: 'Organization' },
    loadComponent: () =>
      import('./organization/organization.component').then((m) => m.OrganizationComponent),
    canActivate: [permissionGuard('view')],
  },
  {
    path: 'roles',
    data: { breadcrumb: 'Roles' },
    loadComponent: () => import('./roles/roles.component').then((m) => m.RolesComponent),
    canActivate: [permissionGuard('view')],
  },
  {
    path: 'permissions',
    data: { breadcrumb: 'Permissions' },
    loadComponent: () => import('./permissions/permissions').then((m) => m.Permissions),
    canActivate: [permissionGuard('view')],
  },
  {
    path: 'departments',
    data: { breadcrumb: 'Departments' },
    loadComponent: () =>
      import('./departments/departments.component').then((m) => m.DepartmentsComponent),
    canActivate: [permissionGuard('view')],
  },
  {
    path: 'levels',
    data: { breadcrumb: 'Levels' },
    loadComponent: () => import('./levels/levels').then((m) => m.LevelsComponent),
    canActivate: [permissionGuard('view')],
  },
  {
    path: 'designations',
    data: { breadcrumb: 'Designations' },
    loadComponent: () =>
      import('./designations/designations.component').then((m) => m.DesignationsComponent),
    canActivate: [permissionGuard('view')],
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
