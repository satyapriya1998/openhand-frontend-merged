import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantConfig } from '../models/tenant.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TenantService {
  // private readonly tenantConfig = signal<TenantConfig | null>(null);
  // readonly config = computed(() => this.tenantConfig());
  // readonly tenantId = computed(() => this.tenantConfig()?.id || environment.defaultTenantId);
  // readonly isLoaded = computed(() => !!this.tenantConfig());

  // constructor(private http: HttpClient) {}

  // loadTenantConfig(): Promise<void> {
  //   return new Promise((resolve) => {
  //     // In production, fetch from backend based on subdomain or header
  //     const tenantId = this.resolveTenantId();
  //     this.http.get<TenantConfig>(`${environment.apiBaseUrl}/tenants/${tenantId}`)
  //       .subscribe({
  //         next: (config) => {
  //           this.tenantConfig.set(config);
  //           resolve();
  //         },
  //         error: () => {
  //           // Fallback for demo
  //           this.tenantConfig.set(this.getDefaultConfig(tenantId));
  //           resolve();
  //         }
  //       });
  //   });
  // }

  // private resolveTenantId(): string {
  //   const host = window.location.hostname;
  //   if (host.includes('.')) {
  //     return host.split('.')[0];
  //   }
  //   return environment.defaultTenantId;
  // }

  // private getDefaultConfig(id: string): TenantConfig {
  //   return {
  //     id,
  //     name: 'Default Organization',
  //     modules: ['dashboard', 'profile', 'administration', 'leaves', 'recruitment', 'payroll', 'performance', 'reports'],
  //     features: {
  //       chatbot: true,
  //       socialLogin: true,
  //       multiCurrency: false
  //     }
  //   };
  // }

  // hasModule(module: string): boolean {
  //   return this.tenantConfig()?.modules?.includes(module) ?? false;
  // }

  // hasFeature(feature: string): boolean {
  //   return this.tenantConfig()?.features?.[feature] ?? false;
  // }
}
