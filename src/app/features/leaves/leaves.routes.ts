import { Routes } from '@angular/router';

export const LEAVES_ROUTES: Routes = [
  {
    path: 'main',
    data: { breadcrumb: 'Leave Main' },

    loadComponent: () =>
      import('./leaves-main/leaves-main').then(
        (m) => m.LeavesMain
      ),

    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },

      {
        path: 'details',
        data: { breadcrumb: 'Leave Details' },
        loadComponent: () =>
          import('./leave-details/leave-details').then(
            (m) => m.LeaveDetails
          ),
      },

      {
        path: 'list',
        data: { breadcrumb: 'Leave List' },
        loadComponent: () =>
          import('./leave-list/leave-list').then(
            (m) => m.LeaveList
          ),
      },

      {
        path: 'apply',
        data: { breadcrumb: 'Apply Leave' },
        loadComponent: () =>
          import('./apply-leave/apply-leave').then(
            (m) => m.ApplyLeave
          ),
      },

      {
        path: 'approval',
        data: { breadcrumb: 'Leave Approval' },
        loadComponent: () =>
          import('./leave-approval/leave-approval').then(
            (m) => m.LeaveApproval
          ),
      },

      {
        path: 'employee-leaves',
        data: { breadcrumb: 'Employee Leaves' },
        loadComponent: () =>
          import('./employee-leave/employee-leave').then(
            (m) => m.EmployeeLeave
          ),
      },

      {
        path: 'my-team',
        data: { breadcrumb: 'My Team' },
        loadComponent: () =>
          import('./my-team/my-team').then(
            (m) => m.MyTeam
          ),
      },
    ],
  },

  // {
  //   path: '',
  //   redirectTo: 'main',
  //   pathMatch: 'full',
  // },
];