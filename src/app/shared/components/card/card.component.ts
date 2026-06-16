import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
  class="bg-white rounded-2xl border border-gray-200 overflow-hidden
         shadow-[0_20px_27px_0_rgba(0,0,0,0.05)]
         hover:shadow-[0_25px_35px_0_rgba(0,0,0,0.08)]
         hover:-translate-y-1
         transition-all duration-300 ease-in-out
         ring-0 ring-offset-0"
  [ngClass]="paddingClass"
>
  <div *ngIf="title || headerActions" class="flex items-center justify-between mb-4">
    <h3 *ngIf="title" class="text-lg font-medium text-gray-900">{{ title }}</h3>

    <div *ngIf="headerActions" class="flex items-center gap-2">
      <ng-content select="[header-actions]"></ng-content>
    </div>
  </div>

  <ng-content></ng-content>
</div>
  `
})
export class CardComponent {
  @Input() title = '';
  @Input() headerActions = false;
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get paddingClass(): string {
    const map = { none: '', sm: 'p-3', md: 'p-4 sm:p-6', lg: 'p-6 sm:p-8' };
    return map[this.padding];
  }
}
