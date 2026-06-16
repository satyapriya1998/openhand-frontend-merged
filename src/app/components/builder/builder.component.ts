import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';

interface Widget {
  id: string;
  label: string;
  span: string;
  tint: string;
  icon: string;
}

const WIDGETS: Widget[] = [
  {
    id: 'headcount',
    label: 'Headcount',
    span: 'col-span-2',
    tint: 'from-aurora-1/25',
    icon: 'fa-users',
  },
  {
    id: 'leave',
    label: 'Leave',
    span: 'col-span-1',
    tint: 'from-accent/25',
    icon: 'fa-umbrella-beach',
  },
  {
    id: 'payroll',
    label: 'Payroll',
    span: 'col-span-1',
    tint: 'from-chart-3/25',
    icon: 'fa-money-bill-trend-up',
  },
  {
    id: 'attendance',
    label: 'Attendance',
    span: 'col-span-2',
    tint: 'from-chart-4/25',
    icon: 'fa-calendar-check',
  },
];

const POINTS = [
  'Fully drag-and-drop dashboard',
  'Widget customization',
  'Custom workflows',
  'Dynamic forms',
  'Personalized employee experiences',
  'Organization-specific modules',
];

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
})
export class BuilderComponent {
  /** Widgets still in the palette, in display order. */
  readonly palette = signal<Widget[]>([...WIDGETS]);
  /** Widgets the user has dropped into the canvas, newest last. */
  readonly dropped = signal<Widget[]>([]);

  /** Id of the widget currently being dragged from the palette. */
  draggingId: string | null = null;
  /** When true, the drop zone is being hovered with a draggable. */
  dropZoneActive = false;
  /** Id of a palette card being hovered over for re-ordering. */
  hoverId: string | null = null;

  readonly points = POINTS;

  trackById = (_: number, w: Widget) => w.id;
  trackByIndex = (i: number) => i;

  onDragStart(event: DragEvent, widget: Widget): void {
    this.draggingId = widget.id;
    event.dataTransfer?.setData('text/plain', widget.id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  onDragEnd(): void {
    this.draggingId = null;
    this.dropZoneActive = false;
    this.hoverId = null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    this.dropZoneActive = true;
  }

  onDragLeave(event: DragEvent): void {
    // Only clear when leaving the drop zone itself, not a child element.
    const related = event.relatedTarget as Node | null;
    const current = event.currentTarget as Node | null;
    if (current && related && current.contains(related)) return;
    this.dropZoneActive = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dropZoneActive = false;
    const id = event.dataTransfer?.getData('text/plain') ?? this.draggingId;
    if (!id) return;
    this.dropWidget(id);
  }

  /** Click/keyboard activation (e.g. Enter) — same effect as dropping. */
  activate(widget: Widget): void {
    this.dropWidget(widget.id);
  }

  /** Remove a dropped widget (returns it to the palette). */
  removeFromCanvas(widget: Widget): void {
    this.dropped.update((list) => list.filter((w) => w.id !== widget.id));
    this.palette.update((list) =>
      [...list, widget].sort(
        (a, b) => WIDGETS.findIndex((w) => w.id === a.id) - WIDGETS.findIndex((w) => w.id === b.id),
      ),
    );
  }

  resetCanvas(): void {
    this.dropped.set([]);
    this.palette.set([...WIDGETS]);
  }

  private dropWidget(id: string): void {
    let moved: Widget | undefined;
    this.palette.update((list) => {
      const idx = list.findIndex((w) => w.id === id);
      if (idx === -1) return list;
      moved = list[idx];
      return list.filter((w) => w.id !== id);
    });
    if (moved) {
      this.dropped.update((list) => [...list, moved!]);
    }
  }
}
