export interface Department {
  id: string;
  name: string;
  code: string;
  head?: string;
  employeeCount?: number;
  status: 'active' | 'inactive';
}
