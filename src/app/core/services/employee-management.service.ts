// // employee-management.service.ts

// import { Injectable, inject } from '@angular/core';

// import { EmployeeService, AddEmployeeDto } from '../api/organization';

// @Injectable({
//   providedIn: 'root',
// })
// export class EmployeeManagementService {
//   private readonly api = inject(EmployeeService);

//   loadEmployees() {
//     return this.api.apiEmployeeGet();
//   }

//   loadEmployee(id: string) {
//     return this.api.apiEmployeeIdGet(id);
//   }

//   createEmployee(payload: CreateEmployeeDto) {
//     return this.api.apiEmployeePost(payload);
//   }

//   updateEmployee(id: string, payload: CreateEmployeeDto) {
//     return this.api.apiEmployeeIdPut(id, payload);
//   }

//   deleteEmployee(id: string) {
//     return this.api.apiEmployeeIdDelete(id);
//   }
// }

import { Injectable, inject } from '@angular/core';
import { EmployeeService, AddEmployeeDto } from '../api/organization';

@Injectable({
  providedIn: 'root',
})
export class EmployeeManagementService {
  private readonly api = inject(EmployeeService);

  createEmployee(payload: AddEmployeeDto) {
    return this.api.apiEmployeePost(payload);
  }
}
