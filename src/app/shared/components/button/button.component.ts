import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
      class="inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      [ngClass]="classes"
    >
      <svg *ngIf="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: string = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() block = false;
  @Output() onClick = new EventEmitter<Event>();

  get classes(): string {
    const variants: Record<ButtonVariant, string> = {
      primary: 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 border border-transparent',
      secondary: 'text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500 border border-gray-300',
      danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-transparent',
      link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline border-none shadow-none bg-transparent'
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    return `${variants[this.variant]} ${sizes[this.size]} ${this.block ? 'w-full' : ''}`;
  }
}
