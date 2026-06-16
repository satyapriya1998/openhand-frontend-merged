import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHourglassHalf,
  faCheckCircle,
  faCalendarAlt,
  faStickyNote,
  faTimesCircle,
  faCheck,
  faUserCircle,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

// Types
type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

interface LeaveRequest {
  id: number;
  employee: string;
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  appliedOn: string;
  reason: string;
  status: LeaveStatus;
}


@Component({
  selector: 'app-leave-approval',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './leave-approval.html',
  styleUrl: './leave-approval.scss',
})
export class LeaveApproval {

 faHourglassHalf = faHourglassHalf;
  faCheckCircle = faCheckCircle;
  faCalendarAlt = faCalendarAlt;
  faStickyNote = faStickyNote;
  faTimesCircle = faTimesCircle;
  faCheck = faCheck;
  faUserCircle = faUserCircle;

  // State
  loading = signal<boolean>(false);
  private allRequests = signal<LeaveRequest[]>([]);

  constructor() {
    this.loadHardcodedData();
  }

  // Computed values
  pendingRequests = computed(() =>
    this.allRequests().filter(r => r.status === 'Pending')
  );

  pastDecisions = computed(() =>
    this.allRequests().filter(r => r.status !== 'Pending').slice(0, 6)
  );

  pastDecisionsCount = computed(() =>
    this.allRequests().filter(r => r.status !== 'Pending').length
  );

  // Load hardcoded data
  private loadHardcodedData(): void {
    this.loading.set(true);

    // Simulate async loading
    setTimeout(() => {
      this.allRequests.set([
        {
          id: 1,
          employee: 'Sarah Johnson',
          employeeId: 'EMP-1001',
          type: 'Annual',
          startDate: '2026-06-10',
          endDate: '2026-06-14',
          days: 5,
          appliedOn: '2026-05-25',
          reason: 'Family vacation to celebrate anniversary',
          status: 'Pending'
        },
        {
          id: 2,
          employee: 'Michael Chen',
          employeeId: 'EMP-1002',
          type: 'Sick',
          startDate: '2026-06-02',
          endDate: '2026-06-03',
          days: 2,
          appliedOn: '2026-06-01',
          reason: 'Flu symptoms, need rest',
          status: 'Pending'
        },
        {
          id: 3,
          employee: 'Emily Rodriguez',
          employeeId: 'EMP-1003',
          type: 'Personal',
          startDate: '2026-06-15',
          endDate: '2026-06-15',
          days: 1,
          appliedOn: '2026-05-28',
          reason: 'Moving to new apartment',
          status: 'Pending'
        },
        {
          id: 4,
          employee: 'David Kim',
          employeeId: 'EMP-1004',
          type: 'Annual',
          startDate: '2026-05-20',
          endDate: '2026-05-25',
          days: 6,
          appliedOn: '2026-05-10',
          reason: 'Trip to Japan',
          status: 'Approved'
        },
        {
          id: 5,
          employee: 'Lisa Thompson',
          employeeId: 'EMP-1005',
          type: 'Sick',
          startDate: '2026-05-15',
          endDate: '2026-05-16',
          days: 2,
          appliedOn: '2026-05-14',
          reason: 'Doctor appointment and recovery',
          status: 'Approved'
        },
        {
          id: 6,
          employee: 'James Wilson',
          employeeId: 'EMP-1006',
          type: 'Unpaid',
          startDate: '2026-05-05',
          endDate: '2026-05-09',
          days: 5,
          appliedOn: '2026-04-20',
          reason: 'Family emergency',
          status: 'Rejected'
        },
        {
          id: 7,
          employee: 'Maria Garcia',
          employeeId: 'EMP-1007',
          type: 'Annual',
          startDate: '2026-04-10',
          endDate: '2026-04-17',
          days: 8,
          appliedOn: '2026-03-15',
          reason: 'Spring break vacation',
          status: 'Approved'
        },
        {
          id: 8,
          employee: 'Robert Taylor',
          employeeId: 'EMP-1008',
          type: 'Sick',
          startDate: '2026-04-22',
          endDate: '2026-04-23',
          days: 2,
          appliedOn: '2026-04-21',
          reason: 'Dental surgery recovery',
          status: 'Approved'
        }
      ]);
      this.loading.set(false);
    }, 500); // Simulate network delay
  }

  // Approve request
  approveRequest(request: LeaveRequest): void {
    this.updateRequestStatus(request, 'Approved');
    this.showToast(`✅ Leave approved for ${request.employee}`, 'success');
  }

  // Reject request with confirmation
  rejectRequest(request: LeaveRequest): void {
    if (confirm(`Reject ${request.employee}'s ${request.type} leave request from ${request.startDate} to ${request.endDate}?`)) {
      this.updateRequestStatus(request, 'Rejected');
      this.showToast(`❌ Leave rejected for ${request.employee}`, 'error');
    }
  }

  // Update request status
  private updateRequestStatus(request: LeaveRequest, newStatus: LeaveStatus): void {
    this.allRequests.update(requests =>
      requests.map(r =>
        r.id === request.id ? { ...r, status: newStatus } : r
      )
    );
  }

  // Get badge class for status
  statusBadgeClass(status: LeaveStatus): string {
    const classes = {
      Approved: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Rejected: 'bg-red-100 text-red-800',
      Cancelled: 'bg-gray-100 text-gray-600'
    };
    return classes[status] || classes.Pending;
  }

  // Simple toast notification (can be replaced with a proper toast service)
  private showToast(message: string, type: 'success' | 'error'): void {
    // Create a temporary toast element
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white text-sm z-50 transition-opacity duration-300 ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

}
