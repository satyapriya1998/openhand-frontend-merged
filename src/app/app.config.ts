import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { TenantService } from './core/services/tenant.service';
import { ConfigService } from './core/services/config.service';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { tenantInterceptor } from './core/interceptors/tenant.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';

import { provideDefaultClient as provideIdentityApi } from './core/api/identity';

import { provideDefaultClient as provideTenantApi } from './core/api/tenant';

import { provideDefaultClient as provideSubscriptionApi } from './core/api/subscription';

import { environment } from '../environments/environment';

import { provideDefaultClient as provideOrganizationApi } from './core/api/organization';
export function initializeApp(
  tenantService: TenantService,
  configService: ConfigService,
): () => Promise<void> {
  return async () => {
    // await tenantService.loadTenantConfig();
    // await configService.loadConfig();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideIdentityApi({
      basePath: `${environment.api.gateway}${environment.api.services.identity}`,
    }),
    provideTenantApi({
      basePath: `${environment.api.gateway}${environment.api.services.tenant}`,
    }),
    provideSubscriptionApi({
      basePath: `${environment.api.gateway}${environment.api.services.subscription}`,
    }),
    provideOrganizationApi({
      basePath: `${environment.api.gateway}${environment.api.services.department}`,
    }),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [],
      multi: true,
    },
  ],
};
