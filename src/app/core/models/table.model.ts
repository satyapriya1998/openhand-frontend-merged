export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'date' | 'badge' | 'actions' | 'custom';
  template?: any;
}

export interface TableConfig {
  columns: TableColumn[];
  pageSize: number;
  pageSizeOptions: number[];
  showSearch: boolean;
  showFilters: boolean;
  showPagination: boolean;
  selectable?: boolean;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  search: string;
  sortColumn: string;
  sortDirection: 'asc' | 'desc' | '';
  filters: Record<string, any>;
}
