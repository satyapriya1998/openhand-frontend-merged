import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  timestamp: string;
  userId?: string;
  tenantId?: string;
  metadata?: Record<string, any>;
}

@Injectable({ providedIn: 'root' })
export class LoggingService {
  // private readonly logBuffer: LogEntry[] = [];
  // private readonly bufferSize = 50;

  // constructor(private http: HttpClient) {}

  // debug(message: string, context?: string, metadata?: Record<string, any>): void {
  //   this.log(LogLevel.DEBUG, message, context, metadata);
  // }

  // info(message: string, context?: string, metadata?: Record<string, any>): void {
  //   this.log(LogLevel.INFO, message, context, metadata);
  // }

  // warn(message: string, context?: string, metadata?: Record<string, any>): void {
  //   this.log(LogLevel.WARN, message, context, metadata);
  // }

  // error(message: string, context?: string, metadata?: Record<string, any>): void {
  //   this.log(LogLevel.ERROR, message, context, metadata);
  //   this.flush();
  // }

  // trackActivity(action: string, details?: Record<string, any>): void {
  //   this.info(`User activity: ${action}`, 'ActivityTracker', details);
  // }

  // private log(level: LogLevel, message: string, context?: string, metadata?: Record<string, any>): void {
  //   const entry: LogEntry = {
  //     level,
  //     message,
  //     context,
  //     timestamp: new Date().toISOString(),
  //     metadata
  //   };

  //   if (level === LogLevel.ERROR) {
  //     console.error(`[${context}] ${message}`, metadata);
  //   } else if (level === LogLevel.WARN) {
  //     console.warn(`[${context}] ${message}`, metadata);
  //   } else {
  //     console.log(`[${level}][${context}] ${message}`, metadata);
  //   }

  //   this.logBuffer.push(entry);
  //   if (this.logBuffer.length >= this.bufferSize) {
  //     this.flush();
  //   }
  // }

  // private flush(): void {
  //   if (this.logBuffer.length === 0) return;
  //   const logs = [...this.logBuffer];
  //   this.logBuffer.length = 0;

  //   this.http.post(`${environment.apiBaseUrl}/logs/batch`, { logs })
  //     .pipe()
  //     .subscribe({
  //       error: (err) => console.error('Failed to send logs', err)
  //     });
  // }
}
