import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs';
@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  @Input() breadcrumbs: any[] = [];
  @Input() user: any;
  @Input() userInitials: string = '';
  @Input() notifications: any[] = [];
  @Input() unread = 0;

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleMobile = new EventEmitter<void>();
  @Output() toggleNotif = new EventEmitter<void>();
  @Output() toggleProfile = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onMenuClick() {
    if (window.innerWidth < 1024) {
      this.toggleMobile.emit(); // mobile
    } else {
      this.toggleSidebar.emit(); // desktop
    }
  }
}
