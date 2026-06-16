import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TenantService } from '../services/tenant.service';

export const moduleGuard = (moduleId: string): CanActivateFn => {
  return () => {
    // const tenantService = inject(TenantService);
    // const router = inject(Router);

    // if (!tenantService.hasModule(moduleId)) {
    //   router.navigate(['/dashboard']);
    //   return false;
    // }

    return true;
  };
};