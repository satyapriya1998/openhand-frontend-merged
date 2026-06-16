import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class ConfirmDialogComponent {
  @Input() data!: ConfirmDialogData;
  @Output() close = new EventEmitter<boolean>();

  onCancel(): void {
    this.close.emit(false);
  }

  onConfirm(): void {
    this.close.emit(true);
  }
}