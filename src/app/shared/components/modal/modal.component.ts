import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
   imports: [CommonModule, FontAwesomeModule],
  template: `
       <div class="modal-overlay" [class.show]="isOpen()" >
      <div 
        class="modal-container" 
        [style.width]="width" 
        [style.max-width]="maxWidth"
        [style.height]="height"
        [style.max-height]="maxHeight"
        (click)="$event.stopPropagation()"
        [class.show]="isOpen()"
      >
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button class="modal-close-btn" (click)="close()">
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </div>

        <div class="modal-body">
          <ng-content></ng-content>
        </div>

        @if (showFooter) {
          <div class="modal-footer">
            <ng-content select="[modal-footer]"></ng-content>
            @if (!customFooter) {
              <div class="default-footer">
                <button class="modal-btn modal-btn-secondary" (click)="close()">
                  {{ cancelText }}
                </button>
                <button class="modal-btn modal-btn-primary" (click)="confirm()">
                  {{ confirmText }}
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
    styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
    }

    .modal-overlay.show {
      opacity: 1;
      visibility: visible;
    }

    .modal-container {
      background: var(--hrms-surface, #ffffff);
      border-radius: 28px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      transform: scale(0.95);
      transition: transform 0.2s ease;
      border: 1px solid var(--hrms-border, #e2e8f0);
    }

    .modal-container.show {
      transform: scale(1);
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 16px 20px;
      border-bottom: 1px solid var(--hrms-border, #e2e8f0);
    }

    .modal-title {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: var(--hrms-text-primary, #1e293b);
    }

    .modal-close-btn {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      border: 1px solid var(--hrms-border, #e2e8f0);
      background: var(--hrms-surface-2, #f8fafc);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--hrms-text-muted, #64748b);
    }

    .modal-close-btn:hover {
      background: #fee2e2;
      color: #ef4444;
      border-color: #fecaca;
      transform: rotate(90deg);
    }

    .modal-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px 21px;
      max-height: calc(90vh - 140px);
    }

    .modal-body::-webkit-scrollbar {
      width: 6px;
    }

    .modal-body::-webkit-scrollbar-track {
      background: var(--hrms-border, #e2e8f0);
      border-radius: 10px;
    }

    .modal-body::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }

    .modal-footer {
      padding: 20px 28px 24px 28px;
      border-top: 1px solid var(--hrms-border, #e2e8f0);
    }

    .default-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
    }

    .modal-btn {
      padding: 12px 24px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .modal-btn-primary {
      background: linear-gradient(135deg, var(--hrms-primary, #3f81f3), #5b8dff);
      color: white;
      box-shadow: 0 4px 12px rgba(63, 129, 243, 0.25);
    }

    .modal-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(63, 129, 243, 0.3);
    }

    .modal-btn-secondary {
      background: white;
      border: 1px solid var(--hrms-border, #e2e8f0);
      color: var(--hrms-text-primary, #1e293b);
    }

    .modal-btn-secondary:hover {
      background: var(--hrms-surface-2, #f8fafc);
    }

    @media (max-width: 768px) {
      .modal-container {
        width: 95% !important;
        margin: 16px;
      }
      
      .modal-header {
        padding: 20px 24px 16px 24px;
      }
      
      .modal-body {
        padding: 20px 24px;
      }
      
      .modal-footer {
        padding: 16px 24px 20px 24px;
      }
      
      .modal-title {
        font-size: 20px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
   faTimes = faTimes;
  
  @Input() isOpen = signal(false);
  @Input() title = 'Modal';
  @Input() width = '600px';
  @Input() maxWidth = '90vw';
  @Input() height = 'auto';
  @Input() maxHeight = '90vh';
  @Input() showFooter = true;
  @Input() customFooter = false;
  @Input() cancelText = 'Cancel';
  @Input() confirmText = 'Confirm';
  
  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();
  
  close() {
    this.onClose.emit();
  }
  
  confirm() {
    this.onConfirm.emit();
  }
}
