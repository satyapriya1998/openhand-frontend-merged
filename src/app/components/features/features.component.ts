import { Component, inject } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { LocaleService } from '../../services/locale.service';

interface Feature {
  icon: string;
  title: string;
  points: string[];
  tag: string;
  tint: string;
}

const FEATURES: Feature[] = [
  {
    icon: 'fa-user-plus',
    title: 'Smart Employee Onboarding',
    points: ['Automated workflows', 'Digital documents', 'Welcome kits', 'Training assignments'],
    tag: 'Onboarding',
    tint: 'from-aurora-1/20 to-aurora-3/20 text-primary',
  },
  {
    icon: 'fa-calendar-days',
    title: 'Leave Management',
    points: ['Leave requests', 'Holiday calendars', 'Approval workflows', 'Team availability'],
    tag: 'Time-off',
    tint: 'from-accent/20 to-aurora-2/20 text-accent',
  },
  {
    icon: 'fa-boxes-stacked',
    title: 'Asset Management',
    points: ['Asset assignment', 'Inventory tracking', 'Lifecycle management', 'Maintenance scheduling'],
    tag: 'Assets',
    tint: 'from-chart-3/20 to-aurora-3/20 text-chart-3',
  },
  {
    icon: 'fa-building',
    title: 'Organization Management',
    points: ['Departments', 'Teams', 'Hierarchies', 'Role management'],
    tag: 'Org',
    tint: 'from-chart-4/20 to-aurora-2/20 text-chart-4',
  },
  {
    icon: 'fa-table-columns',
    title: 'Project Management',
    points: ['Sprint tracking', 'Task assignment', 'Team collaboration', 'Progress monitoring'],
    tag: 'Projects',
    tint: 'from-chart-5/20 to-aurora-3/20 text-chart-5',
  },
  {
    icon: 'fa-clock',
    title: 'Attendance & Time Tracking',
    points: ['Shift management', 'Attendance monitoring', 'Work hours tracking'],
    tag: 'Time',
    tint: 'from-aurora-1/20 to-aurora-2/20 text-primary',
  },
  {
    icon: 'fa-briefcase',
    title: 'Recruitment & Hiring',
    points: ['Job posting', 'Applicant tracking', 'Interview scheduling'],
    tag: 'ATS',
    tint: 'from-chart-3/20 to-aurora-2/20 text-chart-3',
  },
  {
    icon: 'fa-bullseye',
    title: 'Performance Management',
    points: ['Goals & OKRs', 'Reviews', 'Continuous feedback'],
    tag: 'Performance',
    tint: 'from-accent/20 to-aurora-3/20 text-accent',
  },
  {
    icon: 'fa-id-card',
    title: 'Employee Self-Service',
    points: ['Requests', 'Documents', 'Benefits', 'Profile management'],
    tag: 'ESS',
    tint: 'from-chart-4/20 to-aurora-3/20 text-chart-4',
  },
  {
    icon: 'fa-wallet',
    title: 'Payroll Integration',
    points: ['Salary processing', 'Tax support', 'Compensation management'],
    tag: 'Payroll',
    tint: 'from-chart-5/20 to-aurora-2/20 text-chart-5',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Compliance Management',
    points: ['Labor law compliance', 'Audit trails', 'Policy management'],
    tag: 'Compliance',
    tint: 'from-aurora-1/20 to-aurora-3/20 text-primary',
  },
  {
    icon: 'fa-diagram-project',
    title: 'Workflow Automation',
    points: ['No-code builder', 'Approval chains', 'Automated notifications'],
    tag: 'Automate',
    tint: 'from-chart-3/20 to-aurora-3/20 text-chart-3',
  },
];

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective, SpotlightDirective],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  readonly locale = inject(LocaleService);
  readonly features = FEATURES;
}
