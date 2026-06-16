// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-leave-list',
//   imports: [],
//   templateUrl: './leave-list.html',
//   styleUrl: './leave-list.scss',
// })
// export class LeaveList {

// }



import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type LeaveStatus =
  | 'Approved'
  | 'Pending'
  | 'Rejected'
  | 'Cancelled';

export type LeaveType =
  | 'Casual'
  | 'Earned'
  | 'Comp Off'
  | 'Special'
  | 'Sick';

export interface LeaveRequest {
  id: number;
  employee: string;
  employeeId: string;
  requestDate: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  requestedDays: number;
  status: LeaveStatus;
  reason: string;
}

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.scss',
})
export class LeaveList {
  search = signal('');

  statusFilter = signal<'All' | LeaveStatus>('All');

  typeFilter = signal<'All' | LeaveType>('All');

  leaves = signal<LeaveRequest[]>([
    {
      id: 1,
      employee: 'Rahul Sharma',
      employeeId: 'EMP-1001',
      requestDate: '2026-05-20',
      type: 'Casual',
      startDate: '2026-05-28',
      endDate: '2026-05-30',
      requestedDays: 3,
      status: 'Pending',
      reason: 'Family function',
    },
    {
      id: 2,
      employee: 'Ananya Rao',
      employeeId: 'EMP-1024',
      requestDate: '2026-05-14',
      type: 'Sick',
      startDate: '2026-05-15',
      endDate: '2026-05-17',
      requestedDays: 2,
      status: 'Approved',
      reason: 'Medical leave',
    },
    {
      id: 3,
      employee: 'Karthik N',
      employeeId: 'EMP-1031',
      requestDate: '2026-05-10',
      type: 'Earned',
      startDate: '2026-06-01',
      endDate: '2026-06-05',
      requestedDays: 5,
      status: 'Rejected',
      reason: 'Vacation',
    },
  ]);

  filteredLeaves = computed(() => {
    return this.leaves().filter((leave) => {
      const q = this.search().toLowerCase();

      const matchesSearch =
        !q ||
        leave.employee.toLowerCase().includes(q) ||
        leave.employeeId.toLowerCase().includes(q) ||
        leave.reason.toLowerCase().includes(q);

      const matchesStatus =
        this.statusFilter() === 'All' ||
        leave.status === this.statusFilter();

      const matchesType =
        this.typeFilter() === 'All' ||
        leave.type === this.typeFilter();

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  });

  total = computed(() => this.leaves().length);

  approved = computed(
    () =>
      this.leaves().filter(
        (x) => x.status === 'Approved'
      ).length
  );

  pending = computed(
    () =>
      this.leaves().filter(
        (x) => x.status === 'Pending'
      ).length
  );

  rejected = computed(
    () =>
      this.leaves().filter(
        (x) => x.status === 'Rejected'
      ).length
  );

  approveLeave(id: number): void {
    this.updateStatus(id, 'Approved');
  }

  rejectLeave(id: number): void {
    this.updateStatus(id, 'Rejected');
  }

  private updateStatus(
    id: number,
    status: LeaveStatus
  ): void {
    this.leaves.update((rows) =>
      rows.map((leave) =>
        leave.id === id
          ? { ...leave, status }
          : leave
      )
    );
  }

  getStatusClass(status: LeaveStatus): string {
    return (
      {
        Approved: 'approved',
        Pending: 'pending',
        Rejected: 'rejected',
        Cancelled: 'cancelled',
      }[status] || 'pending'
    );
  }
}