import { Injectable, signal, computed } from '@angular/core';
import { Notification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly notifications = signal<Notification[]>([]);
  readonly allNotifications = computed(() => this.notifications());
  readonly unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  constructor() {
    this.loadMockNotifications();
  }

  private loadMockNotifications(): void {
    const mock: Notification[] = [
      { id: '1', title: 'Leave Approved', message: 'Your leave request has been approved.', type: 'success', read: false, createdAt: new Date().toISOString() },
      { id: '2', title: 'New Policy', message: 'Organization policy has been updated.', type: 'info', read: false, createdAt: new Date().toISOString() },
      { id: '3', title: 'Meeting Reminder', message: 'Team meeting in 30 minutes.', type: 'warning', read: true, createdAt: new Date().toISOString() }
    ];
    this.notifications.set(mock);
  }

  markAsRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  removeNotification(id: string): void {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }
}
