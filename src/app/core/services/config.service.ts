import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface UIConfig {
  modules: ModuleConfig[];
  permissions: PermissionConfig[];
  forms: FormConfig[];
}

export interface ModuleConfig {
  id: string;
  name: string;
  icon: string;
  route: string;
  children?: ModuleConfig[];
  enabled: boolean;
  requiredPermission?: string;
}

export interface PermissionConfig {
  module: string;
  actions: string[];
}

export interface FormConfig {
  id: string;
  fields: FormFieldConfig[];
}

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'date' | 'select' | 'multiselect' | 'checkbox' | 'toggle' | 'textarea' | 'number';
  label: string;
  required?: boolean;
  options?: { label: string; value: any }[];
  validations?: { type: string; message: string; value?: any }[];
  defaultValue?: any;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  // private readonly uiConfig = signal<UIConfig | null>(null);
  // readonly config = computed(() => this.uiConfig());

  // constructor(private http: HttpClient) {}

  // loadConfig(): Promise<void> {
  //   return new Promise((resolve) => {
  //     this.http.get<UIConfig>(`${environment.apiBaseUrl}/config/ui`)
  //       .subscribe({
  //         next: (config) => {
  //           this.uiConfig.set(config);
  //           resolve();
  //         },
  //         error: () => {
  //           this.uiConfig.set(this.getDefaultConfig());
  //           resolve();
  //         }
  //       });
  //   });
  // }

  // getModuleConfig(moduleId: string): ModuleConfig | undefined {
  //   return this.uiConfig()?.modules?.find(m => m.id === moduleId);
  // }

  // getFormConfig(formId: string): FormConfig | undefined {
  //   return this.uiConfig()?.forms?.find(f => f.id === formId);
  // }

  // private getDefaultConfig(): UIConfig {
  //   return {
  //     modules: [
  //       { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard', enabled: true },
  //       { id: 'profile', name: 'My Profile', icon: 'user', route: '/profile', enabled: true },
  //       {
  //         id: 'administration', name: 'Administration', icon: 'settings', route: '/admin', enabled: true,
  //         children: [
  //           { id: 'users', name: 'User Management', icon: 'users', route: '/admin/users', enabled: true },
  //           { id: 'organization', name: 'Organization Setup', icon: 'building', route: '/admin/organization', enabled: true },
  //           { id: 'roles', name: 'Roles & Permissions', icon: 'shield', route: '/admin/roles', enabled: true },
  //           { id: 'departments', name: 'Departments', icon: 'git-branch', route: '/admin/departments', enabled: true },
  //           { id: 'designations', name: 'Designations', icon: 'briefcase', route: '/admin/designations', enabled: true }
  //         ]
  //       },
  //       {
  //         id: 'leaves', name: 'Leaves', icon: 'calendar', route: '/leaves', enabled: true,
  //         children: [
  //           { id: 'leave-details', name: 'Leave Details', icon: 'pie-chart', route: '/leaves/details', enabled: true },
  //           { id: 'apply-leave', name: 'Apply Leave', icon: 'plus-circle', route: '/leaves/apply', enabled: true },
  //           { id: 'leave-list', name: 'Leave List', icon: 'list', route: '/leaves/list', enabled: true },
  //           { id: 'leave-approval', name: 'Leave Approval', icon: 'check-circle', route: '/leaves/approval', enabled: true }
  //         ]
  //       }
  //     ],
  //     permissions: [],
  //     forms: []
  //   };
  // }
}
