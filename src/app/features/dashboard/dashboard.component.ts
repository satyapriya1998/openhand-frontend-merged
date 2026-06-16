import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { AuthService } from '../../core/services/auth.service';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../shared/components/page-header/page-header.component';
import { faCalendarDays, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, Breadcrumbs, PageHeader, FontAwesomeModule],
  template: `
    <div class="hrms-page page-container">
      <app-breadcrumbs></app-breadcrumbs>
 <app-page-header
        [title]="'Good to see you, ' + userName"
        subtitle="Here's a quick snapshot of your organization today."
        [icon]="faChartLine"
      >
        <button class="page-header-btn">
          <fa-icon [icon]="faCalendarDays"></fa-icon>
          Apr 23, 2026
        </button>

        <button class="page-header-btn  primary" routerLink="/leaves/apply">
          <fa-icon [icon]="faPlus"></fa-icon>
          Apply Leave
        </button>
      </app-page-header>



      <div class="mb-6">
      
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <app-card padding="md">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Employees</p>
              <p class="text-2xl font-bold text-gray-900">248</p>
            </div>
          </div>
        </app-card>

        <app-card padding="md">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Present Today</p>
              <p class="text-2xl font-bold text-gray-900">231</p>
            </div>
          </div>
        </app-card>

        <app-card padding="md">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Pending Leaves</p>
              <p class="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </app-card>

        <app-card padding="md">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Open Positions</p>
              <p class="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </app-card>
      </div>

      <!-- Quick Actions & Recent -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <app-card title="Quick Actions" [headerActions]="true">
            <div header-actions>
              <a
                routerLink="/leaves/apply"
                class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >Apply Leave &rarr;</a
              >
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a
                routerLink="/leaves/apply"
                class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div
                  class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-2"
                >
                  <svg
                    class="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Apply Leave</span>
              </a>
              <a
                routerLink="/profile"
                class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div
                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2"
                >
                  <svg
                    class="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">My Profile</span>
              </a>
              <a
                routerLink="/admin/users"
                class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2"
                >
                  <svg
                    class="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Users</span>
              </a>
              <a
                routerLink="/leaves/approval"
                class="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                <div
                  class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-2"
                >
                  <svg
                    class="w-5 h-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700">Approvals</span>
              </a>
            </div>
          </app-card>

          <app-card title="Recent Activity">
            <div class="space-y-4">
              <div
                *ngFor="let activity of recentActivity()"
                class="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div
                  class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-xs text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </app-card>
        </div>

        <div class="space-y-6">
          <app-card title="Upcoming Holidays">
            <div class="space-y-3">
              <div
                *ngFor="let holiday of upcomingHolidays()"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ holiday.name }}</p>
                  <p class="text-xs text-gray-500">{{ holiday.date | date: 'EEE, MMM d' }}</p>
                </div>
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  [ngClass]="
                    holiday.type === 'public'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  "
                >
                  {{ holiday.type }}
                </span>
              </div>
            </div>
          </app-card>

          <app-card title="My Leave Balance">
            <div class="space-y-3">
              <div *ngFor="let leave of leaveBalance()">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-700">{{ leave.name }}</span>
                  <span class="font-medium text-gray-900">{{ leave.used }}/{{ leave.total }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    [style.width.%]="(leave.used / leave.total) * 100"
                  ></div>
                </div>
              </div>
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  authService = inject(AuthService);

   faPlus = faPlus;
  faChartLine = faChartLine;
faCalendarDays = faCalendarDays
    userName = 'shiva';


    onMouseMove(event: MouseEvent, card: HTMLElement) {
  const rect = card.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const moveX = (x - centerX) / 10;
  const moveY = (y - centerY) / 10;

  card.style.boxShadow = `
    ${-moveX}px ${-moveY}px 30px rgba(8, 73, 204, 0.45)
  `;
}

onMouseLeave(card: HTMLElement) {
  card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
}

  recentActivity = signal([
    { title: 'Leave request approved by Manager', time: '2 hours ago' },
    { title: 'Profile updated successfully', time: '5 hours ago' },
    { title: 'New company policy published', time: '1 day ago' },
    { title: 'Payroll processed for April 2026', time: '2 days ago' },
  ]);

  upcomingHolidays = signal([
    { name: 'Labor Day', date: '2026-05-01', type: 'public' },
    { name: 'Company Anniversary', date: '2026-05-15', type: 'company' },
    { name: 'Memorial Day', date: '2026-05-25', type: 'public' },
  ]);

  leaveBalance = signal([
    { name: 'Casual Leave', used: 5, total: 12 },
    { name: 'Earned Leave', used: 8, total: 20 },
    { name: 'Sick Leave', used: 2, total: 10 },
  ]);
}
