import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TableColumn } from '../../../core/models/table.model';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  DropdownComponent,
  DropdownOption,
} from '../../../shared/components/dropdown/dropdown.component';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableComponent,
    CardComponent,
    ButtonComponent,
    ModalComponent,
    InputComponent,
    DropdownComponent,
    Breadcrumbs,
  ],
  template: `
    <div class="hrms-page page-container">
      <app-breadcrumbs></app-breadcrumbs>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-500">Manage employees and their accounts</p>
        </div>
        <app-button >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add User
        </app-button>
      </div>

      <app-card>
        <app-table
          [columns]="columns"
          [data]="users()"
          [showSearch]="true"
          [showPagination]="true"
          [pageSizeOptions]="[10, 25, 50]"
          [defaultPageSize]="10"
        >
          <ng-template #actions let-row>
            <div class="flex items-center gap-2">
              <button
                (click)="editUser(row)"
                class="text-primary-600 hover:text-primary-900 text-sm font-medium"
              >
                Edit
              </button>
              <button
                (click)="deleteUser(row)"
                class="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </ng-template>
        </app-table>
      </app-card>
    </div>

    <!-- Add User Modal -->
    <app-modal
     
      title="Add New User"
      size="lg"
   
    >
      <form [formGroup]="userForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <app-input label="Full Name" formControlName="name" [error]="getError('name')"></app-input>
        <app-input
          label="Email"
          type="email"
          formControlName="email"
          [error]="getError('email')"
        ></app-input>
        <app-input label="Employee ID" formControlName="employeeId"></app-input>
        <app-input label="Phone" formControlName="phone"></app-input>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <app-dropdown [options]="departmentOptions" formControlName="department"></app-dropdown>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Designation</label>
          <app-dropdown [options]="designationOptions" formControlName="designation"></app-dropdown>
        </div>
        <app-input label="Join Date" type="date" formControlName="joinDate"></app-input>
        <div class="flex items-center gap-4 pt-6">
          <label class="flex items-center">
            <input
              type="checkbox"
              formControlName="isActive"
              class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span class="ml-2 text-sm text-gray-600">Active</span>
          </label>
        </div>
      </form>
      <div footer class="flex gap-2 justify-end w-full">
        <app-button variant="secondary">Cancel</app-button>
        <app-button [loading]="isSaving()" (onClick)="saveUser()">Save User</app-button>
      </div>
    </app-modal>
  `,
})
export class UsersComponent {
  showAddModal = signal(false);
  isSaving = signal(false);
  users = signal<any[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@company.com',
      employeeId: 'EMP001',
      department: 'Engineering',
      designation: 'Senior Developer',
      status: 'active',
      joinDate: '2023-01-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      employeeId: 'EMP002',
      department: 'HR',
      designation: 'HR Manager',
      status: 'active',
      joinDate: '2022-06-20',
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@company.com',
      employeeId: 'EMP003',
      department: 'Sales',
      designation: 'Sales Lead',
      status: 'inactive',
      joinDate: '2021-03-10',
    },
    {
      id: '4',
      name: 'Emily Wilson',
      email: 'emily@company.com',
      employeeId: 'EMP004',
      department: 'Marketing',
      designation: 'Marketing Specialist',
      status: 'active',
      joinDate: '2024-01-05',
    },
    {
      id: '5',
      name: 'Robert Brown',
      email: 'robert@company.com',
      employeeId: 'EMP005',
      department: 'Engineering',
      designation: 'Junior Developer',
      status: 'active',
      joinDate: '2024-06-15',
    },
    {
      id: '6',
      name: 'Lisa Anderson',
      email: 'lisa@company.com',
      employeeId: 'EMP006',
      department: 'Finance',
      designation: 'Accountant',
      status: 'active',
      joinDate: '2022-11-01',
    },
    {
      id: '7',
      name: 'David Martinez',
      email: 'david@company.com',
      employeeId: 'EMP007',
      department: 'Engineering',
      designation: 'DevOps Engineer',
      status: 'active',
      joinDate: '2023-08-12',
    },
    {
      id: '8',
      name: 'Jennifer Taylor',
      email: 'jennifer@company.com',
      employeeId: 'EMP008',
      department: 'HR',
      designation: 'Recruiter',
      status: 'inactive',
      joinDate: '2023-02-28',
    },
  ]);

  columns: TableColumn[] = [
    { key: 'employeeId', label: 'Emp ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'designation', label: 'Designation', sortable: true },
    { key: 'status', label: 'Status', sortable: true, type: 'badge' },
    { key: 'joinDate', label: 'Join Date', sortable: true, type: 'date' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];

  departmentOptions: DropdownOption[] = [
    { label: 'Engineering', value: 'Engineering' },
    { label: 'HR', value: 'HR' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Finance', value: 'Finance' },
  ];

  designationOptions: DropdownOption[] = [
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'HR Manager', value: 'HR Manager' },
    { label: 'Sales Lead', value: 'Sales Lead' },
    { label: 'Accountant', value: 'Accountant' },
  ];

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employeeId: [''],
      phone: [''],
      department: [''],
      designation: [''],
      joinDate: [''],
      isActive: [true],
    });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isSaving.set(true);
    setTimeout(() => {
      this.users.update((list) => [
        ...list,
        {
          ...this.userForm.value,
          id: Date.now().toString(),
          status: this.userForm.value.isActive ? 'active' : 'inactive',
        },
      ]);
      this.isSaving.set(false);
      this.showAddModal.set(false);
      this.userForm.reset({ isActive: true });
    }, 800);
  }

  editUser(user: any): void {
    this.userForm.patchValue(user);
    this.showAddModal.set(true);
  }

  deleteUser(user: any): void {
    if (confirm(`Delete ${user.name}?`)) {
      this.users.update((list) => list.filter((u) => u.id !== user.id));
    }
  }

  getError(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.touched && control?.invalid) {
      if (control.hasError('required')) return 'Required';
      if (control.hasError('email')) return 'Invalid email';
    }
    return '';
  }
}
