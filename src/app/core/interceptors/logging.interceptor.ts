import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoggingService } from '../services/logging.service';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // const loggingService = inject(LoggingService);
  const startTime = Date.now();

  return next(req).pipe(
    finalize(() => {
      const duration = Date.now() - startTime;
      // loggingService.debug(
      //   `${req.method} ${req.url} - ${duration}ms`,
      //   'HTTPLogger',
      //   { duration, url: req.url, method: req.method }
      // );
    })
  );
};
