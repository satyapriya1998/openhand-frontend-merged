import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
    standalone: true,
  imports: [CommonModule],
})
export class SectionCardComponent {
  @Input() title = '';
  @Input() icon = 'badge';
  @Input() editable = true;
  @Input() editing = false;
  @Output() editingChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onEdit() {
    this.editing = true;
    this.editingChange.emit(true);
  }

  onCancel() {
    this.editing = false;
    this.editingChange.emit(false);
    this.cancel.emit();
  }

  onSave() {
    this.save.emit();
  }
}