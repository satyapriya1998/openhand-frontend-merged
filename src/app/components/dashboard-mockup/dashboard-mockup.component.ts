import { Component } from '@angular/core';

const BARS = [42, 65, 38, 78, 55, 88, 70, 95];

@Component({
  selector: 'app-dashboard-mockup',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-mockup.component.html',
  styleUrl: './dashboard-mockup.component.scss',
})
export class DashboardMockupComponent {
  readonly bars = BARS;
  readonly stats = [
    { icon: 'fa-users', label: 'Employees', value: '2,847', tint: 'text-primary', trend: '+12%' },
    { icon: 'fa-calendar-check', label: 'On Leave', value: '34', tint: 'text-accent', trend: 'today' },
    { icon: 'fa-boxes-stacked', label: 'Assets', value: '1,205', tint: 'text-chart-3', trend: '+8%' },
  ];
  readonly avatarGradients = [
    'bg-gradient-to-br from-aurora-1 to-aurora-3',
    'bg-gradient-to-br from-accent to-aurora-3',
    'bg-gradient-to-br from-chart-3 to-aurora-3',
    'bg-gradient-to-br from-chart-4 to-aurora-3',
  ];
}
