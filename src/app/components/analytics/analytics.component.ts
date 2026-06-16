import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { CountUpDirective } from '../../shared/count-up.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';

interface Kpi {
  icon: string;
  label: string;
  /** Pure numeric value the counter animates towards. */
  numericValue: number;
  /** Decimal places to display. */
  decimals: number;
  /** Pre-formatted starting string (rendered in the template SSR/no-JS fallback). */
  formattedStart: string;
  prefix: string;
  suffix: string;
}

const ATTENDANCE = [
  { m: 'Jan', v: 88 },
  { m: 'Feb', v: 91 },
  { m: 'Mar', v: 86 },
  { m: 'Apr', v: 94 },
  { m: 'May', v: 90 },
  { m: 'Jun', v: 96 },
];

const HIRING = [
  { m: 'Applied', v: 1200 },
  { m: 'Screened', v: 540 },
  { m: 'Interview', v: 210 },
  { m: 'Offer', v: 75 },
  { m: 'Hired', v: 48 },
];

const DEPT = [
  { name: 'Engineering', v: 38 },
  { name: 'Sales', v: 24 },
  { name: 'Ops', v: 18 },
  { name: 'HR', v: 12 },
  { name: 'Other', v: 8 },
];

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

const KPIS: Kpi[] = [
  {
    icon: 'fa-users',
    label: 'Employee Count',
    numericValue: 2847,
    decimals: 0,
    formattedStart: '0',
    prefix: '',
    suffix: '',
  },
  {
    icon: 'fa-arrow-trend-down',
    label: 'Attrition Rate',
    numericValue: 4.2,
    decimals: 1,
    formattedStart: '0.0',
    prefix: '',
    suffix: '%',
  },
  {
    icon: 'fa-boxes-stacked',
    label: 'Asset Utilization',
    numericValue: 92,
    decimals: 0,
    formattedStart: '0',
    prefix: '',
    suffix: '%',
  },
  {
    icon: 'fa-user-check',
    label: 'Productivity',
    numericValue: 87,
    decimals: 0,
    formattedStart: '0',
    prefix: '',
    suffix: '%',
  },
];

/** SVG viewbox is 300 x 160. We map attendance% (80-100) into y (20-130). */
const ATTENDANCE_MIN = 80;
const ATTENDANCE_MAX = 100;
const CHART_HEIGHT = 110;
const CHART_TOP = 20;

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [SectionHeadingComponent, CountUpDirective, RevealDirective, SpotlightDirective],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {
  readonly kpis = KPIS;
  readonly attendance = ATTENDANCE;
  readonly hiring = HIRING;
  readonly dept = DEPT;
  readonly chartColors = CHART_COLORS;

  readonly maxHiring = Math.max(...HIRING.map((h) => h.v));
  readonly minHiring = Math.min(...HIRING.map((h) => h.v));

  /** Pre-computed chart geometry. */
  readonly attendancePoints = this.computeAttendancePoints();
  readonly attendanceLinePath = this.buildLinePath(this.attendancePoints);
  readonly attendanceAreaPath = this.buildAreaPath(this.attendancePoints);
  /** Long enough to be safely larger than the actual path length so the
   *  draw-stroke animation always hides the path completely at the start. */
  readonly attendanceLineLen = 1200;
  readonly attendanceFillLen = 1200;

  /** Width (%) of the i-th funnel step, tapering toward the bottom. */
  funnelWidth(i: number): number {
    const n = HIRING.length;
    // 100% at top, ~40% at bottom
    return 100 - (i / Math.max(n - 1, 1)) * 60;
  }

  deptTotal(): number {
    return this.dept.reduce((sum, d) => sum + d.v, 0);
  }

  deptDonutGradient(): string {
    const total = this.deptTotal();
    let cumulative = 0;
    const stops = this.dept.map((item, i) => {
      const start = cumulative;
      cumulative += (item.v / total) * 100;
      return `${CHART_COLORS[i % CHART_COLORS.length]} ${start}% ${cumulative}%`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }

  private computeAttendancePoints(): { x: number; y: number; v: number }[] {
    const n = ATTENDANCE.length;
    const stepX = 300 / (n - 1);
    return ATTENDANCE.map((item, i) => {
      const t =
        (item.v - ATTENDANCE_MIN) / (ATTENDANCE_MAX - ATTENDANCE_MIN);
      const y = CHART_TOP + (1 - t) * CHART_HEIGHT;
      return { x: i * stepX, y, v: item.v };
    });
  }

  private buildLinePath(points: { x: number; y: number }[]): string {
    if (!points.length) return '';
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(' ');
  }

  private buildAreaPath(points: { x: number; y: number }[]): string {
    if (!points.length) return '';
    const linePath = this.buildLinePath(points);
    const last = points[points.length - 1];
    const first = points[0];
    // Drop down to the chart baseline (y=160) and close the shape.
    return `${linePath} L ${last.x.toFixed(2)} 160 L ${first.x.toFixed(2)} 160 Z`;
  }
}
