import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUmbrellaBeach, 
  faBriefcase, 
  faHeartbeat, 
  faCalendarAlt,
  faDownload,
  faPlane,
  faLaptopMedical,
  faLeaf,
  faMapMarkerAlt,
  faStar,
  faBell,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

export interface LeaveBalance {
  id: string;
  type: string;
  icon: any;
  color: string;
  total: number;
  used: number;
  remaining: number;
}

export interface Holiday {
  date: Date;
  day: string;
  name: string;
  type: 'national' | 'festival' | 'regional';
  location?: string;
}


@Component({
  selector: 'app-leave-details',
 imports: [CommonModule, FontAwesomeModule],
   providers: [DatePipe],
  templateUrl: './leave-details.html',
  styleUrl: './leave-details.scss',
})
export class LeaveDetails {

    // readonly faUser = faUser;
    // readonly faCalendarDays = faCalendarDays;

  //  leaveDetails = signal<any>(null);

    // readonly activeTab = signal('details');


  loading = false;
  selectedFilter: 'all' | 'national' | 'festival' | 'regional' = 'all';
  faDownload = faDownload;
  faGlobe = faGlobe;
  faStar = faStar;
  faMapMarkerAlt = faMapMarkerAlt;

  // Hardcoded leave balances
  balances: LeaveBalance[] = [
    {
      id: '1',
      type: 'Annual',
      icon: faUmbrellaBeach,
      color: '#3b82f6',
      total: 22,
      used: 8,
      remaining: 14
    },
    {
      id: '2',
      type: 'Sick',
      icon: faLaptopMedical,
      color: '#10b981',
      total: 12,
      used: 3,
      remaining: 9
    },
    {
      id: '3',
      type: 'Casual',
      icon: faLeaf,
      color: '#f59e0b',
      total: 6,
      used: 2,
      remaining: 4
    },
    {
      id: '4',
      type: 'Business',
      icon: faBriefcase,
      color: '#8b5cf6',
      total: 5,
      used: 1,
      remaining: 4
    }
  ];

  // Hardcoded holidays with types
  holidays: Holiday[] = [
    { date: new Date(2025, 0, 1), day: 'Wednesday', name: "New Year's Day", type: 'national' },
    { date: new Date(2025, 0, 15), day: 'Wednesday', name: 'Makar Sankranti', type: 'festival', location: 'North India' },
    { date: new Date(2025, 1, 26), day: 'Wednesday', name: 'Republic Day', type: 'national' },
    { date: new Date(2025, 2, 8), day: 'Saturday', name: 'Holi', type: 'festival', location: 'National' },
    { date: new Date(2025, 2, 29), day: 'Friday', name: 'Good Friday', type: 'festival' },
    { date: new Date(2025, 3, 1), day: 'Tuesday', name: 'Annual Day', type: 'regional', location: 'Headquarters' },
    { date: new Date(2025, 3, 10), day: 'Thursday', name: 'Ram Navami', type: 'festival' },
    { date: new Date(2025, 4, 1), day: 'Thursday', name: 'Labor Day', type: 'national' },
    { date: new Date(2025, 4, 26), day: 'Monday', name: 'Buddha Purnima', type: 'festival' },
    { date: new Date(2025, 5, 15), day: 'Sunday', name: "Founder's Day", type: 'regional', location: 'All Offices' },
    { date: new Date(2025, 6, 4), day: 'Friday', name: 'Independence Day', type: 'national' },
    { date: new Date(2025, 7, 15), day: 'Friday', name: 'Independence Day Celebration', type: 'national' },
    { date: new Date(2025, 7, 19), day: 'Tuesday', name: 'Raksha Bandhan', type: 'festival' },
    { date: new Date(2025, 8, 2), day: 'Thursday', name: 'Janmashtami', type: 'festival' },
    { date: new Date(2025, 8, 15), day: 'Wednesday', name: 'Ganesh Chaturthi', type: 'festival', location: 'Maharashtra' },
    { date: new Date(2025, 9, 2), day: 'Thursday', name: 'Gandhi Jayanti', type: 'national' },
    { date: new Date(2025, 9, 20), day: 'Monday', name: 'Diwali', type: 'festival', location: 'National' },
    { date: new Date(2025, 10, 5), day: 'Wednesday', name: 'Guru Nanak Jayanti', type: 'festival' },
    { date: new Date(2025, 11, 25), day: 'Thursday', name: 'Christmas Day', type: 'national' },
    { date: new Date(2025, 11, 31), day: 'Wednesday', name: "New Year's Eve", type: 'festival' }
  ];

  get filteredHolidays() {
    if (this.selectedFilter === 'all') return this.holidays;
    return this.holidays.filter(h => h.type === this.selectedFilter);
  }

  constructor(private datePipe: DatePipe) {}

  percentUsed(b: LeaveBalance): number {
    return b.total === 0 ? 0 : Math.min(100, Math.round((b.used / b.total) * 100));
  }

  getHolidayCount(type: string): number {
    return this.holidays.filter(h => h.type === type).length;
  }

  getWeekendCount(): number {
    return this.holidays.filter(h => h.day === 'Saturday' || h.day === 'Sunday').length;
  }

  isWeekend(day: string): boolean {
    return day === 'Saturday' || day === 'Sunday';
  }

  getHolidayIcon(type: string): any {
    switch(type) {
      case 'national': return faGlobe;
      case 'festival': return faStar;
      case 'regional': return faMapMarkerAlt;
      default: return faCalendarAlt;
    }
  }

  getHolidayColor(type: string): string {
    switch(type) {
      case 'national': return '#3b82f6';
      case 'festival': return '#ec4899';
      case 'regional': return '#f59e0b';
      default: return '#64748b';
    }
  }

}
