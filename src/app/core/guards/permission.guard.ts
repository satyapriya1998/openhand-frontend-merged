import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const permissionGuard = (requiredPermission: string): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    // const loggingService = inject(LoggingService);
    const user = authService.user();

    // Mock permission check - in production, check against user roles/permissions
    const hasPermission = user?.role === 'admin' || user?.role === 'manager' || requiredPermission === 'view';

    if (!hasPermission) {
      // loggingService.warn(`Access denied to ${state.url}`, 'PermissionGuard', { user: user?.id, required: requiredPermission });
      router.navigate(['/dashboard']);
      return false;
    }

    return true;
  };
};
