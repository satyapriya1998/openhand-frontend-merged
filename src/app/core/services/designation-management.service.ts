import { Injectable, inject } from '@angular/core';
import { DesignationService, CreateDesignationDto } from '../api/organization';

@Injectable({
  providedIn: 'root',
})
export class DesignationManagementService {
  private readonly designationService = inject(DesignationService);

  loadDesignations() {
    return this.designationService.apiDesignationDesignationlistGet();
  }

  createDesignation(payload: CreateDesignationDto) {
    return this.designationService.apiDesignationPost(payload);
  }

  updateDesignation(id: string, payload: CreateDesignationDto) {
    return this.designationService.apiDesignationIdPut(id, payload);
  }

  deleteDesignation(id: string) {
    return this.designationService.apiDesignationIdDelete(id);
  }

  getDesignationById(id: string) {
    return this.designationService.apiDesignationIdGet(id);
  }

  loadDashboard() {
    return this.designationService.apiDesignationDashboardGet();
  }
}
