import { Component, Input, Output, EventEmitter, signal, computed, TemplateRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableColumn, PaginationState } from '../../../core/models/table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div *ngIf="showSearch" class="relative max-w-sm w-full">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearch()"
            placeholder="Search..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div class="flex items-center gap-2">
          <ng-content select="[actions]"></ng-content>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th *ngIf="selectable" class="px-6 py-3 text-left">
                <input type="checkbox" [checked]="allSelected()" (change)="toggleAll()" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
              </th>
              <th
                *ngFor="let col of columns"
                (click)="sort(col)"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700"
                [style.width]="col.width"
              >
                <div class="flex items-center gap-1">
                  {{ col.label }}
                  <span *ngIf="col.sortable" class="text-gray-400">
                    <svg *ngIf="sortColumn() !== col.key" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>
                    <svg *ngIf="sortColumn() === col.key && sortDirection() === 'asc'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
                    <svg *ngIf="sortColumn() === col.key && sortDirection() === 'desc'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              *ngFor="let row of paginatedData(); let i = index"
              class="hover:bg-gray-50 transition-colors duration-150"
              [ngClass]="{ 'bg-primary-50': isSelected(row) }"
            >
              <td *ngIf="selectable" class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" [checked]="isSelected(row)" (change)="toggleRow(row)" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"/>
              </td>
              <td *ngFor="let col of columns" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <ng-container [ngSwitch]="col.type">
                  <span *ngSwitchCase="'badge'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    [ngClass]="getBadgeClass(row[col.key])">
                    {{ row[col.key] }}
                  </span>
                  <span *ngSwitchCase="'date'" class="text-gray-500">
                    {{ row[col.key] | date:'mediumDate' }}
                  </span>
                  <div *ngSwitchCase="'actions'" class="flex items-center gap-2">
                    <ng-container *ngTemplateOutlet="getActionTemplate(col.key) || defaultAction; context: { $implicit: row }"></ng-container>
                  </div>
                  <span *ngSwitchDefault>{{ row[col.key] }}</span>
                </ng-container>
              </td>
            </tr>
            <tr *ngIf="paginatedData().length === 0">
              <td [attr.colspan]="columns.length + (selectable ? 1 : 0)" class="px-6 py-12 text-center text-gray-500">
                No data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div *ngIf="showPagination" class="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <select [(ngModel)]="pageSize" (change)="onPageSizeChange()" class="border-gray-300 rounded-md text-sm focus:ring-primary-500 focus:border-primary-500">
            <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }} / page</option>
          </select>
          <span class="text-sm text-gray-700">
            Showing {{ startIndex() + 1 }} to {{ endIndex() }} of {{ totalItems() }} entries
          </span>
        </div>
        <div class="flex items-center gap-1">
          <button (click)="goToPage(1)" [disabled]="currentPage() === 1" class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
          </button>
          <button (click)="goToPage(currentPage() - 1)" [disabled]="currentPage() === 1" class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="px-3 py-1 text-sm">Page {{ currentPage() }} of {{ totalPages() }}</span>
          <button (click)="goToPage(currentPage() + 1)" [disabled]="currentPage() === totalPages()" class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <button (click)="goToPage(totalPages())" [disabled]="currentPage() === totalPages()" class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>

    <ng-template #defaultAction let-row>
      <button class="text-primary-600 hover:text-primary-900 text-sm font-medium">Edit</button>
      <button class="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
    </ng-template>
  `
})
export class TableComponent implements AfterContentInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() showSearch = true;
  @Input() showPagination = true;
  @Input() selectable = false;
  @Input() pageSizeOptions = [10, 25, 50, 100];
  @Input() defaultPageSize = 10;

  @Output() pageChange = new EventEmitter<PaginationState>();
  @Output() selectionChange = new EventEmitter<any[]>();

  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;
  actionTemplates: Record<string, TemplateRef<any>> = {};

  searchQuery = '';
  currentPage = signal(1);
  pageSize = signal(10);
  sortColumn = signal('');
  sortDirection = signal<'asc' | 'desc' | ''>('');
  selectedRows = signal<any[]>([]);

  filteredData = computed(() => {
    let result = [...this.data];
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(row =>
        this.columns.some(col =>
          String(row[col.key]).toLowerCase().includes(query)
        )
      );
    }
    if (this.sortColumn() && this.sortDirection()) {
      result.sort((a, b) => {
        const aVal = a[this.sortColumn()];
        const bVal = b[this.sortColumn()];
        if (aVal < bVal) return this.sortDirection() === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection() === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  });

  totalItems = computed(() => this.filteredData().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()) || 1);
  startIndex = computed(() => (this.currentPage() - 1) * this.pageSize());
  endIndex = computed(() => Math.min(this.startIndex() + this.pageSize(), this.totalItems()));

  paginatedData = computed(() => {
    const start = this.startIndex();
    const end = this.endIndex();
    return this.filteredData().slice(start, end);
  });

  allSelected = computed(() => {
    const data = this.paginatedData();
    return data.length > 0 && data.every(row => this.isSelected(row));
  });

  ngAfterContentInit(): void {
    this.pageSize.set(this.defaultPageSize);
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.emitState();
  }

  sort(col: TableColumn): void {
    if (!col.sortable) return;
    if (this.sortColumn() === col.key) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col.key);
      this.sortDirection.set('asc');
    }
    this.emitState();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.emitState();
  }

  onPageSizeChange(): void {
    this.currentPage.set(1);
    this.emitState();
  }

  isSelected(row: any): boolean {
    return this.selectedRows().some(r => r.id === row.id);
  }

  toggleRow(row: any): void {
    if (this.isSelected(row)) {
      this.selectedRows.update(rows => rows.filter(r => r.id !== row.id));
    } else {
      this.selectedRows.update(rows => [...rows, row]);
    }
    this.selectionChange.emit(this.selectedRows());
  }

  toggleAll(): void {
    const data = this.paginatedData();
    if (this.allSelected()) {
      this.selectedRows.update(rows => rows.filter(r => !data.some(d => d.id === r.id)));
    } else {
      const newRows = data.filter(d => !this.isSelected(d));
      this.selectedRows.update(rows => [...rows, ...newRows]);
    }
    this.selectionChange.emit(this.selectedRows());
  }

  getBadgeClass(value: string): string {
    const classes: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      draft: 'bg-blue-100 text-blue-800'
    };
    return classes[value?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  }

  getActionTemplate(key: string): TemplateRef<any> | null {
    return this.actionTemplates[key] || null;
  }

  private emitState(): void {
    this.pageChange.emit({
      page: this.currentPage(),
      pageSize: this.pageSize(),
      total: this.totalItems(),
      search: this.searchQuery,
      sortColumn: this.sortColumn(),
      sortDirection: this.sortDirection(),
      filters: {}
    });
  }
}
