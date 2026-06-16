import { Injectable, inject } from '@angular/core';

import { DepartmentService, CreateDepartmentDTO } from '../api/organization';

@Injectable({
  providedIn: 'root',
})
export class DepartmentManagementService {
  private readonly api = inject(DepartmentService);

  loadDepartments() {
    return this.api.apiDepartmentDepartmentlistGet();
  }

  loadDepartment(id: string) {
    return this.api.apiDepartmentIdGet(id);
  }

  createDepartment(payload: CreateDepartmentDTO) {
    return this.api.apiDepartmentPost(payload);
  }

  updateDepartment(id: string, payload: CreateDepartmentDTO) {
    return this.api.apiDepartmentIdPut(id, payload);
  }

  deleteDepartment(id: string) {
    return this.api.apiDepartmentIdDelete(id);
  }

  loadDashboard() {
    return this.api.apiDepartmentDashboardGet();
  }
}
