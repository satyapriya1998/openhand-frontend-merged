export interface Designation {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  level: number;
  status: 'active' | 'inactive';
}
