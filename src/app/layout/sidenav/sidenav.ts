import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCalendar, faIdCard } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  @Input() collapsed = false;
  @Input() menuItems: any[] = [];
  @Input() expandedMenus: string[] = [];
  @Input() mobileOpen = false;
  @Output() toggleMenu = new EventEmitter<string>();
  faChartLine = faChartLine;
  faUsers = faUsers;
  faUser = faUser;
  faCalendar = faCalendar;
  faIdCard = faIdCard;
  faChevronDown = faChevronDown;

  iconMap: any = {
    dashboard: faChartLine,
    profile: faUser,
    administration: faUsers,
    leaves: faCalendar,
    onboarding: faUsers,
    assets: faBoxArchive,
  };
}
