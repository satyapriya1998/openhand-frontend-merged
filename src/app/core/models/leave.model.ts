export interface LeaveType {
  id: string;
  name: string;
  code: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  color: string;
}

export interface LeaveRequest {
  id?: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  halfDay?: boolean;
  status?: 'pending' | 'approved' | 'rejected' | 'draft';
  appliedBy?: string;
  appliedOn?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'public' | 'company';
}
