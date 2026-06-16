import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusBadge',
  standalone: true
})
export class StatusBadgePipe implements PipeTransform {
  transform(value: string): { class: string; label: string } {
    const map: Record<string, { class: string; label: string }> = {
      active: { class: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { class: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      pending: { class: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { class: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { class: 'bg-red-100 text-red-800', label: 'Rejected' },
      draft: { class: 'bg-blue-100 text-blue-800', label: 'Draft' }
    };
    return map[value?.toLowerCase()] || { class: 'bg-gray-100 text-gray-800', label: value };
  }
}
