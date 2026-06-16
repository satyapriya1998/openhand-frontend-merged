import { CommonModule } from '@angular/common';
import { Component, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { inject, signal } from '@angular/core';
import { StatsCards } from '../../../shared/components/stats-cards/stats-cards';
import { ManagementTable } from '../../../shared/components/management-table/management-table';
import {
  faUserShield,
  faFilter,
  faPlus,
  faSearch,
  faSliders,
  faEllipsis,
  faUsers,
  faLock,
  faUserTag,
  faCopy,
  faDownload,
  faUpload,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faTable, faKey } from '@fortawesome/free-solid-svg-icons';
import { RolesManagementService } from '../../../core/services/roles-management.service';
import { QuickActions } from '../../../shared/components/quick-actions/quick-actions';
import { PageLayout } from '../../../shared/components/page-layout/page-layout';
interface Role {
  name: string;
  description: string;
  users: number;
  type: 'System' | 'Custom';
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    Breadcrumbs,
    PageHeader,
    ModalComponent,
    StatsCards,
    ManagementTable,
    QuickActions,
    PageLayout
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  protected readonly faUserShield = faUserShield;
  protected readonly faFilter = faFilter;
  protected readonly faPlus = faPlus;
  protected readonly faSearch = faSearch;
  protected readonly faSliders = faSliders;
  protected readonly faEllipsis = faEllipsis;
  readonly isAddRoleModalOpen = signal(false);
  readonly faPenToSquare = faPenToSquare;
  readonly faTrashCan = faTrashCan;
   faBolt=faBolt;
  private readonly rolesManagementService = inject(RolesManagementService);
  readonly allRoles = signal<any[]>([]);
  readonly totalRoles = signal(0);
  readonly assignedUsers = signal(0);
  readonly permissions = signal(0);
  readonly averageUsersPerRole = signal(0);
  readonly isEditRoleModalOpen = signal(false);
  readonly isDeleteRoleModalOpen = signal(false);

  readonly statusDropdownOpen = signal(false);
  readonly activeRoles = signal(0);

  faTable = faTable;
  faKey = faKey;
  toggleStatusDropdown(): void {
    this.statusDropdownOpen.update((v) => !v);
  }
  handleQuickAction(action: string): void {
    switch (action) {
      case 'create':
        this.openAddRoleModal();
        break;

      case 'permissions':
        console.log('Permissions');
        break;

      case 'matrix':
        console.log('Role Matrix');
        break;

      case 'assign':
        console.log('Assign Users');
        break;
    }
  }
  selectStatus(value: 'Active' | 'Inactive', event: Event): void {
    event.stopPropagation();

    this.newRole.status = value;

    this.statusDropdownOpen.set(false);
  }

  readonly roleFormSubmitted = signal(false);
  isRoleInvalid(field: 'name' | 'description' | 'status'): boolean {
    const value = this.newRole[field];

    if (!this.roleFormSubmitted()) {
      return false;
    }

    switch (field) {
      case 'name':
        return !value || value.trim().length < 3 || value.trim().length > 80;

      case 'description':
        return !value || value.trim().length < 5 || value.trim().length > 300;

      case 'status':
        return !value;

      default:
        return false;
    }
  }

  getRoleError(field: 'name' | 'description' | 'status'): string {
    const value = this.newRole[field];

    switch (field) {
      case 'name':
        if (!value?.trim()) {
          return 'Role name is required';
        }

        if (value.trim().length < 3) {
          return 'Role name must be at least 3 characters';
        }

        if (value.trim().length > 80) {
          return 'Role name cannot exceed 80 characters';
        }

        return '';

      case 'description':
        if (!value?.trim()) {
          return 'Description is required';
        }

        if (value.trim().length < 5) {
          return 'Description must be at least 5 characters';
        }

        if (value.trim().length > 300) {
          return 'Description cannot exceed 300 characters';
        }

        return '';

      case 'status':
        return !value ? 'Status is required' : '';

      default:
        return '';
    }
  }

  isRoleFormValid(): boolean {
    return (
      this.newRole.name?.trim().length >= 3 &&
      this.newRole.name?.trim().length <= 80 &&
      this.newRole.description?.trim().length >= 5 &&
      this.newRole.description?.trim().length <= 300 &&
      !!this.newRole.status
    );
  }

  searchTerm = signal('');
  selectedRole: any = null;
  newRole = {
    name: '',
    description: '',
    type: 'Custom',
    status: 'Active',
  };

  readonly statsCards = computed(() => [
    {
      title: 'Total Roles',
      value: this.totalRoles(),
      subtitle: 'Active roles',
      color: 'blue',
      icon: faUserShield,
    },
    {
      title: 'Assigned Users',
      value: this.assignedUsers(),
      subtitle: 'Across all roles',
      color: 'green',
      icon: faUsers,
    },
    {
      title: 'Active Roles',
      value: this.activeRoles(),
      subtitle: 'Currently active',
      color: 'purple',
      icon: faLock,
    },
    {
      title: 'Avg. User/Roles',
      value: this.averageUsersPerRole(),
      subtitle: 'Organization roles',
      color: 'orange',
      icon: faUserTag,
    },
  ]);

  readonly roles = signal<any[]>([]);
  quickActions = [
    {
      label: 'Create Role',
      icon: faPlus,
      action: 'create',
    },
    {
      label: 'Permissions',
      icon: faKey,
      action: 'permissions',
    },
    {
      label: 'Role Matrix',
      icon: faTable,
      action: 'matrix',
    },
    {
      label: 'Assign Users',
      icon: faUsers,
      action: 'assign',
    },
  ];

  activities = [
    'HR Manager role updated',
    'Finance Manager role created',
    'Employee permissions modified',
  ];
  ngOnInit(): void {
    this.loadRoles();
    this.loadDashboard();
  }
  loadDashboard(): void {
    this.rolesManagementService.loadDashboard().subscribe({
      next: (response: any) => {
        this.totalRoles.set(response.totalRoles ?? 0);
        this.assignedUsers.set(response.assignedUsers ?? 0);
        this.permissions.set(response.permissions ?? 0);
        this.averageUsersPerRole.set(response.averageUsersPerRole ?? 0);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  readonly isLoading = signal(true);

  loadRoles(): void {
    this.isLoading.set(true);

    this.rolesManagementService.loadRoles().subscribe({
      next: (response: any) => {
        const activeCount = response.filter((x: any) => x.status === 1).length;

        this.activeRoles.set(activeCount);
        this.roles.set(
          response.map((x: any) => ({
            id: x.id,
            name: x.name,
            description: x.description,
            users: x.userCount ?? 0,
            type: x.type ?? 'Custom',
            status: x.status === 1 ? 'Active' : 'Inactive',
          })),
        );

        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading.set(false);
      },
    });
  }

  // loadRoles(): void {
  //   this.rolesManagementService.loadRoles().subscribe({
  //     next: (response: any) => {
  //       this.roles.set(
  //         response.map((x: any) => ({
  //           id: x.id,
  //           name: x.name,
  //           description: x.description,
  //           users: x.userCount ?? 0,
  //           type: x.type ?? 'Custom',
  //           status: x.status === 1 ? 'Active' : 'Inactive',
  //         })),
  //       );
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //     },
  //   });
  // }
  openAddRoleModal(): void {
    this.resetRoleForm();
    this.isAddRoleModalOpen.set(true);
  }

  closeAddRoleModal(): void {
    this.isAddRoleModalOpen.set(false);
    this.resetRoleForm();
  }
  editRole(role: any): void {
    this.selectedRole = role;

    this.newRole = {
      name: role.name,
      description: role.description,
      type: role.type ?? 'Custom',
      status: role.status,
    };

    this.isEditRoleModalOpen.set(true);
  }
  deleteRole(role: any): void {
    this.selectedRole = role;
    this.isDeleteRoleModalOpen.set(true);
  }

  saveRole(): void {
    this.roleFormSubmitted.set(true);

    if (!this.isRoleFormValid()) {
      return;
    }
    if (!this.isRoleFormValid()) {
      return;
    }
    const payload = {
      name: this.newRole.name,
      description: this.newRole.description,
      status: this.newRole.status === 'Active' ? 1 : 2,
    };

    this.rolesManagementService.createRole(payload).subscribe({
      next: () => {
        this.loadRoles();
        this.loadDashboard();

        this.closeAddRoleModal();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  resetRoleForm(): void {
    this.roleFormSubmitted.set(false);
    this.newRole = {
      name: '',
      description: '',
      type: 'Custom',
      status: 'Active',
    };
  }

  confirmDeleteRole(): void {
    if (!this.selectedRole?.id) {
      return;
    }

    this.rolesManagementService.deleteRole(this.selectedRole.id).subscribe({
      next: () => {
        this.loadRoles();
        this.loadDashboard();
        this.isDeleteRoleModalOpen.set(false);
        this.selectedRole = null;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  updateRole(): void {
    this.roleFormSubmitted.set(true);

    if (!this.isRoleFormValid()) {
      return;
    }
    if (!this.selectedRole?.id) {
      return;
    }

    const payload = {
      name: this.newRole.name,
      description: this.newRole.description,
      status: this.newRole.status === 'Active' ? 1 : 2,
    };

    this.rolesManagementService.updateRole(this.selectedRole.id, payload).subscribe({
      next: () => {
        this.loadRoles();
        this.loadDashboard();
        this.isEditRoleModalOpen.set(false);
        this.selectedRole = null;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  readonly filteredRoles = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.roles();
    }

    return this.roles().filter(
      (role) =>
        role.name?.toLowerCase().includes(term) ||
        role.description?.toLowerCase().includes(term) ||
        role.status?.toLowerCase().includes(term),
    );
  });
}
