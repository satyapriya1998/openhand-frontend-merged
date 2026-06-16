// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faUserShield } from '@fortawesome/free-solid-svg-icons';

// import { faShieldHalved, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';

// import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
// import { PageHeader } from '../../../shared/components/page-header/page-header.component';

// interface Role {
//   id: number;
//   name: string;
// }

// interface ModuleItem {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// interface SubModuleItem {
//   id: number;
//   moduleId: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// interface PermissionItem {
//   subModuleId: number;
//   name: string;
//   view: boolean;
//   create: boolean;
//   edit: boolean;
//   delete: boolean;
//   approve: boolean;
//   export: boolean;
// }

// @Component({
//   selector: 'app-permissions',
//   standalone: true,
//   imports: [CommonModule, FormsModule, FontAwesomeModule, Breadcrumbs, PageHeader],
//   templateUrl: './permissions.html',
//   styleUrl: './permissions.scss',
// })
// export class Permissions {
//   protected readonly faShieldHalved = faShieldHalved;
//   protected readonly faFilter = faFilter;
//   protected readonly faPlus = faPlus;
//   protected readonly faUserShield = faUserShield;
//   selectedRole = 1;
//   subModules: SubModuleItem[] = [];
//   permissions: PermissionItem[] = [];
//   roles: Role[] = [
//     { id: 1, name: 'HR Manager' },
//     { id: 2, name: 'Department Head' },
//     { id: 3, name: 'Employee' },
//   ];

//   modules: ModuleItem[] = [
//     {
//       id: 1,
//       name: 'Employee Management',
//       description: 'Manage employees and employee data',
//       selected: true,
//     },
//     {
//       id: 2,
//       name: 'Leave Management',
//       description: 'Manage leave requests',
//       selected: false,
//     },
//     {
//       id: 3,
//       name: 'Payroll',
//       description: 'Payroll processing',
//       selected: false,
//     },
//     {
//       id: 4,
//       name: 'Onboarding',
//       description: 'Employee onboarding',
//       selected: false,
//     },
//   ];

//   allSubModules: SubModuleItem[] = [
//     {
//       id: 1,
//       moduleId: 1,
//       name: 'Employee List',
//       description: 'Manage employees',
//       selected: false,
//     },
//     {
//       id: 2,
//       moduleId: 1,
//       name: 'Departments',
//       description: 'Manage departments',
//       selected: false,
//     },
//     {
//       id: 3,
//       moduleId: 1,
//       name: 'Designations',
//       description: 'Manage designations',
//       selected: false,
//     },

//     {
//       id: 4,
//       moduleId: 2,
//       name: 'Leave Requests',
//       description: 'Leave approvals',
//       selected: false,
//     },

//     {
//       id: 5,
//       moduleId: 2,
//       name: 'Leave Balance',
//       description: 'Leave balances',
//       selected: false,
//     },
//   ];

//   allPermissions: PermissionItem[] = [
//     {
//       subModuleId: 1,
//       name: 'Employee List',
//       view: true,
//       create: true,
//       edit: true,
//       delete: false,
//       approve: false,
//       export: true,
//     },

//     {
//       subModuleId: 2,
//       name: 'Departments',
//       view: true,
//       create: true,
//       edit: true,
//       delete: false,
//       approve: false,
//       export: false,
//     },

//     {
//       subModuleId: 3,
//       name: 'Designations',
//       view: true,
//       create: true,
//       edit: true,
//       delete: false,
//       approve: false,
//       export: false,
//     },
//   ];

//   savePermissions(): void {
//     console.log('Permissions Saved');
//   }
//   onModuleChange(): void {
//     const selectedModuleIds = this.modules.filter((x) => x.selected).map((x) => x.id);

//     this.subModules = this.allSubModules.filter((x) => selectedModuleIds.includes(x.moduleId));

//     this.permissions = [];
//   }
//   onSubModuleChange(): void {
//     const selectedSubModuleIds = this.subModules.filter((x) => x.selected).map((x) => x.id);

//     this.permissions = this.allPermissions.filter((x) =>
//       selectedSubModuleIds.includes(x.subModuleId),
//     );
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faShieldHalved, faFilter, faPlus, faUserShield } from '@fortawesome/free-solid-svg-icons';

import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';

interface Role {
  id: number;
  name: string;
}

interface ModuleItem {
  id: number;
  name: string;
  description: string;
  selected: boolean;
}

interface SubModuleItem {
  id: number;
  moduleId: number;
  name: string;
  description: string;
  selected: boolean;
}

interface PermissionItem {
  subModuleId: number;
  name: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  export: boolean;
}

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, Breadcrumbs, PageHeader],
  templateUrl: './permissions.html',
  styleUrl: './permissions.scss',
})
export class Permissions {
  protected readonly faShieldHalved = faShieldHalved;
  protected readonly faFilter = faFilter;
  protected readonly faPlus = faPlus;
  protected readonly faUserShield = faUserShield;

  selectedRole = 1;

  subModules: SubModuleItem[] = [];
  permissions: PermissionItem[] = [];

  constructor() {
    this.onModuleChange();
  }

  roles: Role[] = [
    {
      id: 1,
      name: 'HR Manager',
    },
    {
      id: 2,
      name: 'Department Head',
    },
    {
      id: 3,
      name: 'Employee',
    },
  ];

  modules: ModuleItem[] = [
    {
      id: 1,
      name: 'Employee Management',
      description: 'Manage employees and employee data',
      selected: true,
    },
    {
      id: 2,
      name: 'Leave Management',
      description: 'Manage leave requests',
      selected: false,
    },
    {
      id: 3,
      name: 'Payroll',
      description: 'Payroll processing',
      selected: false,
    },
    {
      id: 4,
      name: 'Onboarding',
      description: 'Employee onboarding',
      selected: false,
    },
  ];

  allSubModules: SubModuleItem[] = [
    {
      id: 1,
      moduleId: 1,
      name: 'Employee List',
      description: 'Manage employees',
      selected: false,
    },
    {
      id: 2,
      moduleId: 1,
      name: 'Departments',
      description: 'Manage departments',
      selected: false,
    },
    {
      id: 3,
      moduleId: 1,
      name: 'Designations',
      description: 'Manage designations',
      selected: false,
    },
    {
      id: 4,
      moduleId: 2,
      name: 'Leave Requests',
      description: 'Leave approvals',
      selected: false,
    },
    {
      id: 5,
      moduleId: 2,
      name: 'Leave Balance',
      description: 'Leave balances',
      selected: false,
    },
    {
      id: 6,
      moduleId: 3,
      name: 'Payroll Run',
      description: 'Manage payroll runs',
      selected: false,
    },
    {
      id: 7,
      moduleId: 3,
      name: 'Salary Components',
      description: 'Manage salary structures',
      selected: false,
    },
    {
      id: 8,
      moduleId: 4,
      name: 'Candidate Tracking',
      description: 'Track candidates',
      selected: false,
    },
  ];

  allPermissions: PermissionItem[] = [
    {
      subModuleId: 1,
      name: 'Employee List',
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: false,
      export: true,
    },
    {
      subModuleId: 2,
      name: 'Departments',
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: false,
      export: false,
    },
    {
      subModuleId: 3,
      name: 'Designations',
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: false,
      export: false,
    },
    {
      subModuleId: 4,
      name: 'Leave Requests',
      view: true,
      create: false,
      edit: true,
      delete: false,
      approve: true,
      export: true,
    },
    {
      subModuleId: 5,
      name: 'Leave Balance',
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      export: true,
    },
    {
      subModuleId: 6,
      name: 'Payroll Run',
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: true,
      export: true,
    },
    {
      subModuleId: 7,
      name: 'Salary Components',
      view: true,
      create: true,
      edit: true,
      delete: true,
      approve: false,
      export: false,
    },
    {
      subModuleId: 8,
      name: 'Candidate Tracking',
      view: true,
      create: true,
      edit: true,
      delete: false,
      approve: false,
      export: true,
    },
  ];

  get selectedRoleName(): string {
    return this.roles.find((x) => x.id === this.selectedRole)?.name ?? '';
  }

  get selectedModulesCount(): number {
    return this.modules.filter((x) => x.selected).length;
  }

  get selectedSubModulesCount(): number {
    return this.subModules.filter((x) => x.selected).length;
  }

  get selectedPermissionsCount(): number {
    return this.permissions.reduce((total, item) => {
      return (
        total +
        Number(item.view) +
        Number(item.create) +
        Number(item.edit) +
        Number(item.delete) +
        Number(item.approve) +
        Number(item.export)
      );
    }, 0);
  }

  onModuleChange(): void {
    const selectedModuleIds = this.modules.filter((x) => x.selected).map((x) => x.id);

    this.subModules = this.allSubModules
      .filter((x) => selectedModuleIds.includes(x.moduleId))
      .map((x) => ({
        ...x,
        selected: true,
      }));

    this.onSubModuleChange();
  }

  onSubModuleChange(): void {
    const selectedSubModuleIds = this.subModules.filter((x) => x.selected).map((x) => x.id);

    this.permissions = this.allPermissions.filter((x) =>
      selectedSubModuleIds.includes(x.subModuleId),
    );
  }

  savePermissions(): void {
    const payload = {
      roleId: this.selectedRole,
      roleName: this.selectedRoleName,
      modules: this.modules.filter((x) => x.selected),
      subModules: this.subModules.filter((x) => x.selected),
      permissions: this.permissions,
    };

    console.log('Permission Payload', payload);
  }
}
