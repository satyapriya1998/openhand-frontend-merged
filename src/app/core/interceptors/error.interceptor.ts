import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggingService } from '../services/logging.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // const loggingService = inject(LoggingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        message = error.error.message;
      } else {
        switch (error.status) {
          case 400: message = error.error?.message || 'Bad Request'; break;
          case 403: message = 'You do not have permission to perform this action'; break;
          case 404: message = 'Resource not found'; break;
          case 422: message = error.error?.message || 'Validation failed'; break;
          case 500: message = 'Internal server error'; break;
          default: message = `Error ${error.status}: ${error.statusText}`;
        }
      }

      // loggingService.error(message, 'HTTPInterceptor', {
      //   url: req.url,
      //   method: req.method,
      //   status: error.status,
      //   error: error.error
      // });

      return throwError(() => ({ ...error, userMessage: message }));
    })
  );
};
