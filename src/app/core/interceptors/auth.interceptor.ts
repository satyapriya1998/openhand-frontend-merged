import { HttpInterceptorFn, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
let refreshTokenSubject: Observable<string> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // ATTACH TOKEN
  if (token && !req.url.includes('/refresh')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
      // Skip token refresh for login and refresh endpoints
      if (
        error.status !== 401 ||
        req.url.includes('/login') ||
        req.url.includes('/refresh')
      ) {
        return throwError(() => error);
      }

      // Handle token refresh
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject = authService.refreshAccessToken();

        return refreshTokenSubject.pipe(
          switchMap((): Observable<HttpEvent<unknown>> => {
            const newToken = authService.token();
            if (newToken) {
              const retryRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next(retryRequest);
            }
            return throwError(() => error);
          }),
          catchError((refreshError): Observable<HttpEvent<unknown>> => {
            authService.logout();
            return throwError(() => refreshError);
          }),
          finalize(() => {
            isRefreshing = false;
            refreshTokenSubject = null;
          })
        );
      } else {
        // Wait for refresh to complete
        return refreshTokenSubject!.pipe(
          switchMap((): Observable<HttpEvent<unknown>> => {
            const newToken = authService.token();
            if (newToken) {
              const retryRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next(retryRequest);
            }
            return throwError(() => error);
          })
        );
      }
    })
  );
};