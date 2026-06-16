import { Injectable, inject } from '@angular/core';

import {
  OnboardingService,
  EmployeePersonalDetailsDto,
  EmployeeIdentityInfoDto,
  EmployeeAddressDto,
  EmployeeEducationDto,
  EmployeeExperienceDto,
  EmployeeBankDetailDto,
  EmployeeEmergencyContactDto,
} from '../api/organization';

@Injectable({
  providedIn: 'root',
})
export class OnboardingManagementService {
  private readonly api = inject(OnboardingService);

  /* ==========================================
   * PERSONAL DETAILS
   * ========================================== */

  savePersonalDetails(employeeId: string, payload: EmployeePersonalDetailsDto) {
    return this.api.apiOnboardingEmployeeIdPersonalDetailsPost(employeeId, payload);
  }

  /* ==========================================
   * IDENTITY
   * ========================================== */

  saveIdentityInfo(employeeId: string, payload: EmployeeIdentityInfoDto) {
    return this.api.apiOnboardingEmployeeIdIdentityInfoPost(employeeId, payload);
  }

  /* ==========================================
   * ADDRESS
   * ========================================== */

  saveAddress(employeeId: string, payload: EmployeeAddressDto) {
    return this.api.apiOnboardingEmployeeIdAddressPost(employeeId, payload);
  }

  /* ==========================================
   * EDUCATION
   * ========================================== */

  saveEducation(employeeId: string, payload: EmployeeEducationDto) {
    return this.api.apiOnboardingEmployeeIdEducationPost(employeeId, payload);
  }

  /* ==========================================
   * EXPERIENCE
   * ========================================== */

  saveExperience(employeeId: string, payload: EmployeeExperienceDto) {
    return this.api.apiOnboardingEmployeeIdExperiencePost(employeeId, payload);
  }

  /* ==========================================
   * BANK DETAILS
   * ========================================== */

  saveBankDetails(employeeId: string, payload: EmployeeBankDetailDto) {
    return this.api.apiOnboardingEmployeeIdBankDetailPost(employeeId, payload);
  }

  /* ==========================================
   * EMERGENCY CONTACT
   * ========================================== */

  saveEmergencyContact(employeeId: string, payload: EmployeeEmergencyContactDto) {
    return this.api.apiOnboardingEmployeeIdEmergencyContactPost(employeeId, payload);
  }

  /* ==========================================
   * DOCUMENTS
   * ========================================== */

  uploadDocument(employeeId: string, documentType: string, file: File) {
    return this.api.apiOnboardingEmployeeIdUploadDocumentPost(employeeId, documentType, file);
  }

  getDocuments(employeeId: string) {
    return this.api.apiOnboardingEmployeeIdDocumentsGet(employeeId);
  }

  /* ==========================================
   * DASHBOARD
   * ========================================== */

  loadDashboard() {
    return this.api.apiOnboardingDashboardSummaryGet();
  }

  loadStatusDistribution() {
    return this.api.apiOnboardingStatusDistributionGet();
  }

  loadEmployees(pageNumber = 1, pageSize = 10) {
    return this.api.apiOnboardingEmployeesGet(pageNumber, pageSize);
  }
}
