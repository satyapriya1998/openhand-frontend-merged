import { Injectable, inject } from '@angular/core';

import { RolesService, CreateRoleDto } from '../api/organization';

@Injectable({
  providedIn: 'root',
})
export class RolesManagementService {
  private readonly api = inject(RolesService);

  loadRoles() {
    return this.api.apiRolesRolesListGet();
  }

  loadDashboard() {
    return this.api.apiRolesDashboardGet();
  }

  loadRole(id: string) {
    return this.api.apiRolesIdGet(id);
  }

  createRole(payload: CreateRoleDto) {
    return this.api.apiRolesPost(payload);
  }

  updateRole(id: string, payload: CreateRoleDto) {
    return this.api.apiRolesIdPut(id, payload);
  }

  deleteRole(id: string) {
    return this.api.apiRolesIdDelete(id);
  }
}
