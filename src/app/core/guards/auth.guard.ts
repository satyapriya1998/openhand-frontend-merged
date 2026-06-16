import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route,
  state
) => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  const hostname =
    window.location.hostname;

  const url =
    state.url;

  // PUBLIC ROUTES
  // ALWAYS ALLOW

  if (
    url.startsWith('/public')
  ) {

    return true;
  }

  // AUTH ROUTES
  // ALWAYS ALLOW

  if (
    url.startsWith('/auth')
  ) {

    return true;
  }

  // CALLBACK ROUTE
  // REQUIRED FOR SESSION RESTORE

  if (
    url.startsWith('/auth/callback')
  ) {

    return true;
  }

  // ROOT LOCALHOST
  // DO NOT ALLOW HRMS

  if (
    hostname === 'localhost'
  ) {

    return router.createUrlTree([
      '/public/login'
    ]);
  }

  // AUTHENTICATED

  if (
    authService.authenticated()
  ) {

    return true;
  }

  // TOKEN EXISTS
  // SESSION MAY STILL BE RESTORING

  if (
    authService.getToken()
  ) {

    return true;
  }

  // NOT AUTHENTICATED

  return router.createUrlTree(
    ['/auth/login'],
    {
      queryParams: {
        returnUrl: state.url
      }
    }
  );
};