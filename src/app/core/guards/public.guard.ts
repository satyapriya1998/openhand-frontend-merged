import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PublicAuthService } from '../services/public.service';  

// export const publicAuthGuard: CanActivateFn = (
//   route,
//   state
// ) => {
//   const authService = inject(PublicAuthService);
//   const router = inject(Router);

//   if (authService.isAuthenticated()) {
//     return true;
//   }

//   router.navigate(['/public/login']);
//   return false;
// };