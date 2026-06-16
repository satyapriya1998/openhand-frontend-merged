import { ChangeDetectionStrategy, Component, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementTable } from '../../../shared/components/management-table/management-table';
// import { FormsModule } from '@angular/forms';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

import {
  faFilter,
  faPlus,
  faBuilding,
  faUsers,
  faUserTie,
  faSitemap,
  faSearch,
  faSliders,
  faEllipsis,
  faPlusCircle,
  faList,
  faUserPlus,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { inject } from '@angular/core';
import { StatsCards } from '../../../shared/components/stats-cards/stats-cards';
import { DepartmentManagementService } from '../../../core/services/department-management.service';
import { EmployeeManagementService } from '../../../core/services/employee-management.service';
import { QuickActions } from '../../../shared/components/quick-actions/quick-actions';
import { PageLayout } from '../../../shared/components/page-layout/page-layout';
import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    Breadcrumbs,
    PageHeader,
    ModalComponent,
    ReactiveFormsModule,
    StatsCards,
    ManagementTable,
    QuickActions,
    PageLayout,
    PageSubHeader
  ],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentsComponent implements OnInit {
  faSitemap = faSitemap;
  readonly faFilter = faFilter;
  readonly faPlus = faPlus;
  readonly faBuilding = faBuilding;
  readonly faUsers = faUsers;
  readonly faUserTie = faUserTie;
  readonly faSearch = faSearch;
  readonly faSliders = faSliders;
  readonly faEllipsis = faEllipsis;
  readonly faPlusCircle = faPlusCircle;
  readonly faList = faList;
  readonly faUserPlus = faUserPlus;
  readonly faEdit = faPenToSquare;
  readonly faDelete = faTrashCan;
  faBolt=faBolt;
  private readonly departmentManagementService = inject(DepartmentManagementService);
  readonly isDeleteDepartmentModalOpen = signal(false);
  readonly activeMenu = signal<number | null>(null);
  readonly selectedDepartment = signal<any | null>(null);
  readonly averageTeamSize = signal(0);
  private readonly fb = inject(FormBuilder);
  readonly totalDepartments = signal(0);
  readonly totalEmployees = signal(0);
  readonly activeDepartments = signal(0);
  readonly statusDropdownOpen = signal(false);

  toggleStatusDropdown(): void {
    this.statusDropdownOpen.update((v) => !v);
  }

  selectStatus(status: 'Active' | 'Inactive', event: Event): void {
    event.stopPropagation();

    this.departmentForm.patchValue({
      status,
    });

    this.departmentForm.get('status')?.markAsTouched();

    this.statusDropdownOpen.set(false);
  }

  readonly statsCards = computed(() => [
    {
      title: 'Total Departments',
      value: this.totalDepartments().toString(),
      subtitle: 'Across organization',
      icon: this.faBuilding,
      color: 'blue',
    },
    {
      title: 'Total Employees',
      value: this.totalEmployees().toString(),
      subtitle: 'Across departments',
      icon: this.faUsers,
      color: 'green',
    },
    {
      title: 'Active Departments',
      value: this.activeDepartments(),

      subtitle: 'Currently active',
      icon: this.faUserTie,
      color: 'purple',
    },
    {
      title: 'Avg. Team Size',
      value: this.averageTeamSize().toString(),
      subtitle: 'Per department',
      icon: this.faSitemap,
      color: 'orange',
    },
  ]);
  readonly departmentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['Active', Validators.required],
  });
  toggleMenu(id: number): void {
    console.log('MENU CLICKED', id);
    this.activeMenu.set(this.activeMenu() === id ? null : id);
  }
  isInvalid(field: string): boolean {
    const control = this.departmentForm.get(field);

    return !!control && control.invalid && control.touched;
  }

  getError(field: string): string {
    const control = this.departmentForm.get(field);

    if (!control?.errors) return '';

    if (control.errors['required']) {
      return `${field} is required`;
    }

    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    }

    return 'Invalid value';
  }
  private readonly employeeManagementService = inject(EmployeeManagementService);

  readonly allDepartments = signal<any[]>([]);

  readonly departments = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.allDepartments();
    }

    return this.allDepartments().filter(
      (department) =>
        department.name?.toLowerCase().includes(term) ||
        department.description?.toLowerCase().includes(term),
    );
  });
  readonly parentDepartments = signal(['Engineering', 'Sales', 'HR', 'Finance', 'Operations']);
  readonly searchTerm = signal('');
  readonly quickActions = signal([
    {
      label: 'Add Department',
      icon: this.faPlusCircle,
      action: 'add',
    },
    {
      label: 'Department List',
      icon: this.faList,
      action: 'list',
    },
    {
      label: 'Assign Manager',
      icon: this.faUserPlus,
      action: 'manager',
    },
    {
      label: 'View Hierarchy',
      icon: this.faSitemap,
      action: 'hierarchy',
    },
  ]);
  readonly distribution = signal([
    {
      name: 'Engineering',
      value: 82,
    },
    {
      name: 'HR & Admin',
      value: 48,
    },
    {
      name: 'Finance',
      value: 36,
    },
    {
      name: 'Marketing',
      value: 56,
    },
  ]);

  readonly isAddDepartmentModalOpen = signal(false);
  readonly isHierarchyOpen = signal(false);
  ngOnInit(): void {
    this.loadDepartments();
    // this.loadEmployees();
    this.loadDashboard();
  }
  newDepartment = {
    name: '',
    code: '',
    parentDepartment: '',
    head: '',
    employees: 0,
    location: '',
    status: 'Active',
    description: '',
  };
  loadDashboard(): void {
    this.departmentManagementService.loadDashboard().subscribe({
      next: (response: any) => {
        this.totalDepartments.set(response.totalDepartments ?? 0);
        this.totalEmployees.set(response.totalEmployees ?? 0);
        this.averageTeamSize.set(response.averageTeamSize ?? 0);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  openAddDepartmentModal(): void {
    this.selectedDepartment.set(null);
    this.resetDepartmentForm();
    this.isAddDepartmentModalOpen.set(true);
  }

  closeAddDepartmentModal(): void {
    this.isAddDepartmentModalOpen.set(false);

    this.resetDepartmentForm();
  }
  isValid(field: string): boolean {
    const control = this.departmentForm.get(field);

    return !!control && control.valid && control.touched;
  }

  saveDepartment(): void {
    this.departmentForm.markAllAsTouched();

    if (this.departmentForm.invalid) {
      return;
    }

    const payload = {
      name: this.departmentForm.value.name,
      description: this.departmentForm.value.description,
      status: this.departmentForm.value.status === 'Active' ? 1 : 2,
    };

    const selected = this.selectedDepartment();

    if (selected) {
      this.departmentManagementService.updateDepartment(selected.id, payload).subscribe({
        next: () => {
          this.loadDepartments();
          this.closeEditDepartmentModal();
        },
      });

      return;
    }

    this.departmentManagementService.createDepartment(payload).subscribe({
      next: () => {
        this.loadDepartments();
        this.closeAddDepartmentModal();
      },
    });
  }

  loadDepartments(): void {
    this.departmentManagementService.loadDepartments().subscribe({
      next: (response: any) => {
        const activeCount = response.filter((x: any) => x.status === 1).length;

        this.activeDepartments.set(activeCount);
        console.log('RAW RESPONSE', response);

        this.allDepartments.set(
          response.map((x: any) => ({
            id: x.id,
            name: x.name,
            description: x.description,
            // type: 'Main Department',
            employees: x.employeeCount ?? 0,
            status: x.status === 1 ? 'Active' : 'Inactive',
          })),
        );
        console.log('lll', this.allDepartments());
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  resetDepartmentForm(): void {
    this.departmentForm.reset({
      name: '',
      status: 'Active',
      description: '',
    });
  }

  handleQuickAction(action: string): void {
    switch (action) {
      case 'add':
        this.openAddDepartmentModal();
        break;

      case 'list':
        window.scrollTo({
          top: 400,
          behavior: 'smooth',
        });
        break;

      case 'manager':
        alert('Assign Manager feature coming soon');
        break;

      case 'hierarchy':
        this.isHierarchyOpen.set(true);
        break;
    }
  }
  closeHierarchy(): void {
    this.isHierarchyOpen.set(false);
  }

  editDepartment(department: any): void {
    console.log('EDIT CLICKED', department);
    this.activeMenu.set(null);
    this.selectedDepartment.set(department);

    this.departmentForm.patchValue({
      name: department.name,
      status: department.status,
      description: department.description ?? '',
    });
    this.isAddDepartmentModalOpen.set(true);
    // this.isEditDepartmentModalOpen.set(true);
  }

  closeEditDepartmentModal(): void {
    this.isAddDepartmentModalOpen.set(false);

    this.selectedDepartment.set(null);

    this.resetDepartmentForm();
  }
  confirmDeleteDepartment(department: any): void {
    this.activeMenu.set(null);
    this.selectedDepartment.set(department);

    this.isDeleteDepartmentModalOpen.set(true);
  }

  closeDeleteDepartmentModal(): void {
    this.isDeleteDepartmentModalOpen.set(false);
  }

  deleteDepartment(): void {
    const department = this.selectedDepartment();
    console.log('DELETE DEPARTMENT', department);
    console.log('DELETE ID', department?.id);
    if (!department) return;

    this.departmentManagementService.deleteDepartment(department.id).subscribe({
      next: () => {
        this.loadDepartments();

        this.closeDeleteDepartmentModal();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  readonly hierarchyDepartments = signal([
    {
      name: 'Engineering',
      color: 'blue',
      employees: 48,
      children: ['Embedded', 'Software', 'Mechanical'],
    },
    {
      name: 'Sales',
      color: 'green',
      employees: 26,
      children: ['Inside Sales', 'Field Sales'],
    },
    {
      name: 'HR',
      color: 'purple',
      employees: 14,
      children: ['Recruitment', 'Employee Relations'],
    },
    {
      name: 'Finance',
      color: 'orange',
      employees: 18,
      children: ['Accounts', 'Payroll'],
    },
  ]);
}
