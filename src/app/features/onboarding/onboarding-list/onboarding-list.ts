import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormGroup } from '@angular/forms';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { OnboardingDetail } from '../onboarding-detail/onboarding-detail';
import { Router } from '@angular/router';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { DepartmentManagementService } from '../../../core/services/department-management.service';
import { StatsCards } from '../../../shared/components/stats-cards/stats-cards';
import { ManagementTable } from '../../../shared/components/management-table/management-table';
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
  faClipboardList,
  faUserCheck,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faHourglassHalf,
  faEnvelope,
  faCalendarAlt,
  faFileSignature,
  faUser,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { inject } from '@angular/core';
import { EmployeeManagementService } from '../../../core/services/employee-management.service';
import { AddEmployeeDto } from '../../../core/api/organization';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuickActions } from '../../../shared/components/quick-actions/quick-actions';
import { PageLayout } from '../../../shared/components/page-layout/page-layout';

@Component({
  selector: 'app-onboarding-list',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    Breadcrumbs,
    ReactiveFormsModule,
    PageHeader,
    ModalComponent,
    OnboardingDetail,
    StatsCards,
    ManagementTable,
    QuickActions,
    PageLayout,
  ],
  templateUrl: './onboarding-list.html',
  styleUrls: ['./onboarding-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingList {
  faUser = faUser;
   faBolt=faBolt;
  isAddEmployeeModalOpen = signal(false);
  readonly departments = signal<any[]>([]);
  private readonly employeeService = inject(EmployeeManagementService);
  readonly quickActions = signal([
    {
      label: 'Add Employee',
      icon: faUserPlus,
      action: 'add',
    },
    {
      label: 'Send Reminders',
      icon: faEnvelope,
      action: 'reminders',
    },
    {
      label: 'Schedule Interview',
      icon: faCalendarAlt,
      action: 'interview',
    },
    {
      label: 'Bulk Approve',
      icon: faFileSignature,
      action: 'approve',
    },
  ]);
  // isEmployeeDetailModalOpen = signal(false);

  // newEmployee = {
  //   name: '',
  //   email: '',
  //   department: '',
  //   joiningDate: '',
  //   progress: 0,
  //   status: 'Pending',
  // };
  handleQuickAction(action: string): void {
    switch (action) {
      case 'add':
        this.openAddEmployeeModal();
        break;

      case 'reminders':
        console.log('Send reminders');
        break;

      case 'interview':
        console.log('Schedule interview');
        break;

      case 'approve':
        console.log('Bulk approve');
        break;
    }
  }
  private readonly departmentService = inject(DepartmentManagementService);
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.addEmployeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNumber: [''],
      departmentId: [''],
      joiningDate: [''],
    });
    this.loadDepartments();
  }
  private loadDepartments(): void {
    this.departmentService.loadDepartments().subscribe({
      next: (response: any) => {
        console.log('Departments', response);

        this.departments.set(response);
      },
      error: (error: unknown) => {
        console.error('Failed to load departments', error);
      },
    });
  }
  addEmployeeForm!: FormGroup;
  openAddEmployeeModal() {
    this.isAddEmployeeModalOpen.set(true);
  }

  // openEmployeeDetailModal() {
  //   this.isEmployeeDetailModalOpen.set(true);
  // }
  openEmployeeDetail(employeeId: number) {
    this.router.navigate(['/onboarding/detail', employeeId]);
  }
  closeAddEmployeeModal() {
    this.isAddEmployeeModalOpen.set(false);
    this.resetForm();
  }

  saveEmployee() {
    const payload: AddEmployeeDto = {
      firstName: this.addEmployeeForm.value.firstName ?? '',
      lastName: this.addEmployeeForm.value.lastName ?? '',
      email: this.addEmployeeForm.value.email ?? '',
      mobileNumber: this.addEmployeeForm.value.mobileNumber ?? '',
      departmentId: this.addEmployeeForm.value.departmentId ?? '',
      joiningDate: this.addEmployeeForm.value.joiningDate
        ? new Date(this.addEmployeeForm.value.joiningDate)
        : undefined,
    };

    this.employeeService.createEmployee(payload).subscribe({
      next: (response) => {
        console.log('Employee created', response);

        this.closeAddEmployeeModal();

        // reload onboarding list here
      },
      error: (error: unknown) => {
        console.error('Employee creation failed', error);
      },
    });
  }
  saveEmployeeDetail() {}
  resetForm() {
    this.addEmployeeForm.reset();
  }
  // resetForm() {
  //   this.newEmployee = {
  //     name: '',
  //     email: '',
  //     department: '',
  //     joiningDate: '',
  //     progress: 0,
  //     status: 'Pending',
  //   };
  // }

  // Icons
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
  readonly faClipboardList = faClipboardList;
  readonly faUserCheck = faUserCheck;
  readonly faClock = faClock;
  readonly faCheckCircle = faCheckCircle;
  readonly faTimesCircle = faTimesCircle;
  readonly faHourglassHalf = faHourglassHalf;
  readonly faEnvelope = faEnvelope;
  readonly faCalendarAlt = faCalendarAlt;
  readonly faFileSignature = faFileSignature;

  // Stats Cards (Onboarding Summary)
  readonly statsCards = signal([
    {
      title: 'Pending Review',
      value: '8',
      subtitle: 'Awaiting document check',
      icon: this.faHourglassHalf,
      color: 'orange',
    },
    {
      title: 'Under Review',
      value: '5',
      subtitle: 'Being processed',
      icon: this.faClock,
      color: 'blue',
    },
    {
      title: 'Approved',
      value: '12',
      subtitle: 'Ready to join',
      icon: this.faCheckCircle,
      color: 'green',
    },
    {
      title: 'Rejected',
      value: '2',
      subtitle: 'Incomplete applications',
      icon: this.faTimesCircle,
      color: 'purple',
    },
  ]);

  // Onboarding Employees List
  readonly onboardingEmployees = signal([
    {
      id: 1,
      name: 'Priya Sharma',
      department: 'Engineering',
      joiningDate: '2024-06-15',
      progress: 75,
      status: 'Under Review',
      email: 'priya.sharma@example.com',
    },
    {
      id: 2,
      name: 'Amit Verma',
      department: 'Marketing',
      joiningDate: '2024-06-20',
      progress: 40,
      status: 'Pending',
      email: 'amit.verma@example.com',
    },
    {
      id: 3,
      name: 'Neha Gupta',
      department: 'Finance',
      joiningDate: '2024-06-10',
      progress: 100,
      status: 'Approved',
      email: 'neha.gupta@example.com',
    },
    {
      id: 4,
      name: 'Rahul Mehta',
      department: 'Human Resources',
      joiningDate: '2024-06-18',
      progress: 60,
      status: 'Under Review',
      email: 'rahul.mehta@example.com',
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      department: 'Engineering',
      joiningDate: '2024-06-25',
      progress: 20,
      status: 'Pending',
      email: 'sneha.reddy@example.com',
    },
    {
      id: 6,
      name: 'Vikram Singh',
      department: 'Sales',
      joiningDate: '2024-06-05',
      progress: 100,
      status: 'Approved',
      email: 'vikram.singh@example.com',
    },
  ]);

  // Status distribution for chart
  readonly distribution = signal([
    {
      name: 'Pending',
      value: 35,
    },
    {
      name: 'Under Review',
      value: 28,
    },
    {
      name: 'Approved',
      value: 45,
    },
    {
      name: 'Rejected',
      value: 8,
    },
  ]);

  // Helper method to get status class
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'approved';
      case 'under review':
        return 'under-review';
      case 'pending':
        return 'pending';
      case 'rejected':
        return 'rejected';
      default:
        return 'pending';
    }
  }

  // Helper method to get progress bar color
  getProgressClass(progress: number): string {
    if (progress >= 100) return 'completed';
    if (progress >= 70) return 'high';
    if (progress >= 40) return 'medium';
    return 'low';
  }
}
