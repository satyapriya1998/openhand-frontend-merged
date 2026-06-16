import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
//import { InputComponent } from '../../../shared/components/input/input.component';
import { TableColumn } from '../../../core/models/table.model';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    ButtonComponent,
    TableComponent,
    ModalComponent,
    Breadcrumbs,
  ],
  template: `
    <div class="hrms-page page-container">
      <app-breadcrumbs></app-breadcrumbs>
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Leave Approval</h1>
        <p class="text-gray-500">Review and approve leave requests</p>
      </div>

      <app-card>
        <app-table
          [columns]="columns"
          [data]="pendingLeaves()"
          [showSearch]="true"
          [showPagination]="true"
          [defaultPageSize]="10"
        >
          <ng-template #actions let-row>
            <div class="flex items-center gap-2">
              <button
                (click)="openApproveModal(row, 'approve')"
                class="text-green-600 hover:text-green-900 text-sm font-medium"
              >
                Approve
              </button>
              <button
                (click)="openApproveModal(row, 'decline')"
                class="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Decline
              </button>
            </div>
          </ng-template>
        </app-table>
      </app-card>

      <!-- Approval Modal -->
      <app-modal
    
        [title]="modalTitle()"
    
        size="md"
      >
        <form [formGroup]="approvalForm" class="space-y-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-sm">
              <span class="font-medium">Employee:</span> {{ selectedLeave()?.employee }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Leave Type:</span> {{ selectedLeave()?.type }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Duration:</span>
              {{ selectedLeave()?.startDate | date: 'mediumDate' }} -
              {{ selectedLeave()?.endDate | date: 'mediumDate' }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Reason:</span> {{ selectedLeave()?.reason }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Comments</label>
            <textarea
              formControlName="comments"
              rows="3"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Add your comments..."
            ></textarea>
          </div>
        </form>
        <div footer class="flex gap-2 justify-end w-full">
          <app-button variant="secondary" >Cancel</app-button>
          <app-button
            [variant]="modalAction() === 'approve' ? 'primary' : 'danger'"
            [loading]="isProcessing()"
            (onClick)="submitApproval()"
          >
            {{ modalAction() === 'approve' ? 'Approve' : 'Decline' }}
          </app-button>
        </div>
      </app-modal>
    </div>
  `,
})
export class LeaveApprovalComponent {
  showModal = signal(false);
  isProcessing = signal(false);
  modalAction = signal<'approve' | 'decline'>('approve');
  modalTitle = signal('Approve Leave');
  selectedLeave = signal<any>(null);

  pendingLeaves = signal([
    {
      id: '1',
      employee: 'John Smith',
      type: 'Casual Leave',
      startDate: '2026-05-10',
      endDate: '2026-05-12',
      days: 3,
      reason: 'Family function',
      appliedOn: '2026-05-02',
    },
    {
      id: '2',
      employee: 'Emily Wilson',
      type: 'Sick Leave',
      startDate: '2026-05-03',
      endDate: '2026-05-03',
      days: 1,
      reason: 'Not feeling well',
      appliedOn: '2026-05-02',
    },
    {
      id: '3',
      employee: 'David Martinez',
      type: 'Earned Leave',
      startDate: '2026-05-15',
      endDate: '2026-05-20',
      days: 6,
      reason: 'Vacation trip',
      appliedOn: '2026-04-28',
    },
    {
      id: '4',
      employee: 'Jennifer Taylor',
      type: 'Comp Off',
      startDate: '2026-05-05',
      endDate: '2026-05-05',
      days: 1,
      reason: 'Worked on weekend',
      appliedOn: '2026-05-01',
    },
  ]);

  columns: TableColumn[] = [
    { key: 'employee', label: 'Employee', sortable: true },
    { key: 'type', label: 'Leave Type', sortable: true },
    { key: 'startDate', label: 'From', sortable: true, type: 'date' },
    { key: 'endDate', label: 'To', sortable: true, type: 'date' },
    { key: 'days', label: 'Days', sortable: true, width: '80px' },
    { key: 'reason', label: 'Reason', sortable: true },
    { key: 'actions', label: 'Actions', type: 'actions', width: '180px' },
  ];

  approvalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.approvalForm = this.fb.group({
      comments: [''],
    });
  }

  openApproveModal(leave: any, action: 'approve' | 'decline'): void {
    this.selectedLeave.set(leave);
    this.modalAction.set(action);
    this.modalTitle.set(action === 'approve' ? 'Approve Leave' : 'Decline Leave');
    this.approvalForm.reset();
    this.showModal.set(true);
  }

  submitApproval(): void {
    this.isProcessing.set(true);
    setTimeout(() => {
      this.pendingLeaves.update((list) => list.filter((l) => l.id !== this.selectedLeave()?.id));
      this.isProcessing.set(false);
      this.showModal.set(false);
      alert(`Leave ${this.modalAction() === 'approve' ? 'approved' : 'declined'} successfully!`);
    }, 800);
  }
}
