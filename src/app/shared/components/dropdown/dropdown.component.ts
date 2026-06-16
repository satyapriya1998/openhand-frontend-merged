import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownOption {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true
    }
  ],
  template: `
    <div class="relative inline-block text-left w-full">
      <button
        type="button"
        (click)="toggle()"
        class="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        [disabled]="disabled"
      >
        <span>{{ selectedLabel || placeholder }}</span>
        <svg class="-mr-1 ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div *ngIf="isOpen" class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 max-h-60 overflow-auto">
        <div class="py-1" role="menu">
          <button
            *ngFor="let option of options"
            (click)="select(option)"
            [disabled]="option.disabled"
            class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            [ngClass]="{ 'bg-primary-50 text-primary-700': isSelected(option) }"
            role="menuitem"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder = 'Select...';
  @Input() value: any;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<any>();

  isOpen = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  select(option: DropdownOption): void {

  if (option.disabled) return;

  this.value = option.value;

  // Reactive forms
  this.onChange(option.value);

  // Two-way binding
  this.valueChange.emit(option.value);

  this.onTouched();

  this.isOpen = false;
}

  isSelected(option: DropdownOption): boolean {
    return this.value === option.value;
  }

  get selectedLabel(): string {
    return this.options.find(o => o.value === this.value)?.label || '';
  }
}
