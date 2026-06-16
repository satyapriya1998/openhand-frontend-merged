import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Observable, shareReplay } from 'rxjs';
import { OrganizationService, OrganizationDTO, OrganizationPolicyDTO } from '../api/tenant';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationManagementService {
  private countries$?: Observable<any[]>;
  private timezones$?: Observable<any[]>;
  private readonly api = inject(OrganizationService);

  private readonly authService = inject(AuthService);

  loadOrganization() {
    const tenantId = this.authService.tenant()?.id;

    return this.api.apiOrganizationSetupTenantIdGet(tenantId);
  }
  // loadCountries() {
  //   return this.api.apiOrganizationCountriesGet();
  // }

  // loadTimezones() {
  //   return this.api.apiOrganizationTimezonesGet();
  // }
  loadCountries() {
    if (!this.countries$) {
      this.countries$ = this.api.apiOrganizationCountriesGet().pipe(shareReplay(1));
    }

    return this.countries$;
  }

  loadTimezones() {
    if (!this.timezones$) {
      this.timezones$ = this.api.apiOrganizationTimezonesGet().pipe(shareReplay(1));
    }

    return this.timezones$;
  }
  saveOrganization(payload: OrganizationDTO) {
    const tenantId = this.authService.tenant()?.id;

    return this.api.apiOrganizationSetupTenantIdPut(tenantId, payload);
  }

  loadPolicy() {
    const tenantId = this.authService.tenant()?.id;

    return this.api.apiOrganizationPolicyTenantIdGet(tenantId);
  }

  savePolicy(payload: OrganizationPolicyDTO) {
    const tenantId = this.authService.tenant()?.id;

    return this.api.apiOrganizationPolicyTenantIdPut(tenantId, payload);
  }
}
