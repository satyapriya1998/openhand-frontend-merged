import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border border-gray-200 rounded-md overflow-hidden">
      <button
        type="button"
        (click)="toggle()"
        class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        <span class="text-sm font-medium text-gray-900">{{ title }}</span>
        <svg 
          class="w-5 h-5 text-gray-500 transform transition-transform duration-200"
          [ngClass]="{ 'rotate-180': isOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div 
        class="overflow-hidden transition-all duration-300 ease-in-out"
        [style.max-height]="isOpen ? '1000px' : '0'"
      >
        <div class="px-4 py-3 bg-white">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class AccordionComponent {
  @Input() title = '';
  @Input() isOpen = false;
  @Output() toggled = new EventEmitter<boolean>();

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.toggled.emit(this.isOpen);
  }
}
