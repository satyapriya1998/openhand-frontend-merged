import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError, finalize } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginDto, SignUpDto, UserDto } from '../api/identity';
import { UserService } from '../api/identity';
import { SessionModel } from '../models/session.model';

import { AuthResponse, LoginRequest, SignupRequest } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // ----------------------------------------------------------------------------------------------------
  // INJECTS
  // ----------------------------------------------------------------------------------------------------

  private readonly api = inject(UserService);

  private readonly router = inject(Router);

  // ----------------------------------------------------------------------------------------------------
  // STORAGE KEYS
  // ----------------------------------------------------------------------------------------------------

  private readonly sessionKey = 'hrms_session';

  // ----------------------------------------------------------------------------------------------------
  // SIGNALS
  // ----------------------------------------------------------------------------------------------------

  private readonly tokenSignal = signal<string | null>(null);

  private readonly refreshTokenSignal = signal<string | null>(null);

  private readonly messageSignal = signal<string | null>(null);

  private readonly userSignal = signal<any | null>(null);

  private readonly tenantSignal = signal<any | null>(null);

  private readonly permissionsSignal = signal<string[]>([]);

  // GLOBAL MODULES
  private readonly globalModulesSignal = signal<any[]>([]);

  // TENANT MODULES
  private readonly tenantModulesSignal = signal<any[]>([]);

  private readonly loadingSignal = signal(false);

  private readonly authenticatedSignal = signal(false);

  private readonly errorSignal = signal<string | null>(null);

  private readonly menuItems = signal({
    modules: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'layout-dashboard',
        route: '/dashboard',
        enabled: true,
      },
      {
        id: 'profile',
        name: 'My Profile',
        icon: 'user',
        route: '/profile',
        enabled: true,
      },
      {
        id: 'administration',
        name: 'Administration',
        icon: 'settings',
        route: '/admin',
        enabled: true,
        children: [
          {
            id: 'users',
            name: 'User Management',
            icon: 'users',
            route: '/admin/users',
            enabled: true,
          },
          {
            id: 'organization',
            name: 'Organization Setup',
            icon: 'building',
            route: '/admin/organization',
            enabled: true,
          },
          {
            id: 'roles',
            name: 'Roles',
            icon: 'shield',
            route: '/admin/roles',
            enabled: true,
          },
          // {
          //   id: 'roles',
          //   name: 'Permissions',
          //   icon: 'shield',
          //   route: '/admin/permissions',
          //   enabled: true,
          // },
          {
            id: 'departments',
            name: 'Departments',
            icon: 'git-branch',
            route: '/admin/departments',
            enabled: true,
          },
          {
            id: 'designations',
            name: 'Designations',
            icon: 'briefcase',
            route: '/admin/designations',
            enabled: true,
          },
          {
            id: 'levels',
            name: 'Levels',
            icon: 'briefcase',
            route: '/admin/levels',
            enabled: true,
          },
        ],
      },
      {
        id: 'leaves',
        name: 'Leaves',
        icon: 'calendar',
        route: '/leaves',
        enabled: true,
        children: [
          {
            id: 'leave-details',
            name: 'Leave Details',
            icon: 'pie-chart',
            route: '/leaves/details',
            enabled: true,
          },
          {
            id: 'apply-leave',
            name: 'Apply Leave',
            icon: 'plus-circle',
            route: '/leaves/apply',
            enabled: true,
          },
          {
            id: 'leave-list',
            name: 'Leave List',
            icon: 'list',
            route: '/leaves/list',
            enabled: true,
          },
          {
            id: 'leave-approval',
            name: 'Leave Approval',
            icon: 'check-circle',
            route: '/leaves/approval',
            enabled: true,
          },
        ],
      },
      {
        id: 'onboarding',
        name: 'Onboarding',
        icon: 'settings',
        route: '/onboarding',
        enabled: true,
        children: [
          // {
          //   id: 'onboarding-detail',
          //   name: 'Oboarding Detail',
          //   icon: 'pie-chart',
          //   route: '/onboarding/detail',
          //   enabled: true
          // },

          {
            id: 'onboarding-list',
            name: 'Onboarding List',
            icon: 'list',
            route: '/onboarding/list',
            enabled: true,
          },
        ],
      },
      {
        id: 'assets',
        name: 'Assets',
        icon: 'box-archive',
        route: '/assets',
        enabled: true,
      },
    ],
    permissions: [],
    forms: [],
  });

  // ----------------------------------------------------------------------------------------------------
  // PUBLIC SIGNALS
  // ----------------------------------------------------------------------------------------------------

  readonly token = computed(() => this.tokenSignal());

  readonly refreshToken = computed(() => this.refreshTokenSignal());

  readonly message = computed(() => this.messageSignal());

  readonly user = computed(() => this.userSignal());

  readonly tenant = computed(() => this.tenantSignal());

  readonly permissions = computed(() => this.permissionsSignal());

  readonly globalModules = computed(() => this.globalModulesSignal());

  // readonly tenantModules =
  //   computed(() =>
  //     this.tenantModulesSignal()
  //   );

  readonly loading = computed(() => this.loadingSignal());

  readonly authenticated = computed(() => this.authenticatedSignal());

  readonly error = computed(() => this.errorSignal());

  // ----------------------------------------------------------------------------------------------------
  // COMPUTED HELPERS
  // ----------------------------------------------------------------------------------------------------

  readonly userName = computed(() => {
    const user = this.user();

    if (!user) {
      return '';
    }

    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  });

  readonly email = computed(() => this.user()?.email ?? '');

  readonly tenantName = computed(() => this.tenant()?.name ?? '');

  readonly tenantSubdomain = computed(() => this.tenant()?.subdomain ?? '');

  readonly roleName = computed(() => this.user()?.roleName ?? '');

  readonly roles = computed(() => this.user()?.roleNames ?? []);

  // readonly tenantSubdomain =
  //   computed(() =>
  //     this.tenant()?.subdomain ?? 'knodtec'
  //   );

  readonly tenantModules = computed(() => this.menuItems() ?? {});

  constructor() {
    this.loadStoredSession();
  }

  // ----------------------------------------------------------------------------------------------------
  // LOGIN
  // ----------------------------------------------------------------------------------------------------

  login(dto: LoginDto, isPublic = false): Observable<any> {
    this.loadingSignal.set(true);

    this.errorSignal.set(null);

    return this.api.apiUserLoginPost(dto).pipe(
      tap((response: any) => {
        if (!response?.success || !response?.data) {
          throw new Error(response?.message || 'Login failed');
        }

        const apiData = response.data;

        console.log('loign resp', apiData);

        const sessionData: SessionModel = {
          token: apiData.token ?? '',

          refreshToken: apiData.refreshToken ?? '',

          message: apiData.message ?? '',

          tenant: apiData.tenantLoginResponse ?? null,

          user: apiData.userLoginData ?? null,

          permissions: apiData.userLoginData?.permissionList ?? [],

          // OUTSIDE MODULES
          globalModules: apiData.modules ?? [],

          // TENANT MODULES
          tenantModules: apiData.tenantLoginResponse?.modules ?? [],
        };

        const targetSubdomain = sessionData?.tenant?.subdomain?.toLowerCase();

        if (!targetSubdomain) {
          throw new Error('Tenant subdomain not found');
        }

        const currentSubdomain = this.getCurrentSubdomain()?.toLowerCase();
        // PUBLIC LOGIN FLOW
        if (isPublic) {
          this.setSession(sessionData);

          this.router.navigate(['/public/onboarding/personal-info']);

          return;
        }

        // REDIRECT TO TENANT
        if (currentSubdomain !== targetSubdomain) {
          this.redirectToTenantSubdomain(sessionData);

          return;
        }

        // ALREADY INSIDE SUBDOMAIN
        this.setSession(sessionData);

        this.router.navigate(['/dashboard']);
      }),

      catchError((error) => {
        const message = this.getErrorMessage(error);

        this.errorSignal.set(message);

        return throwError(() => new Error(message));
      }),

      finalize(() => {
        this.loadingSignal.set(false);
      }),
    );
  }

  // LOGOUT

  logout(): void {
    localStorage.removeItem(this.sessionKey);

    this.tokenSignal.set(null);

    this.refreshTokenSignal.set(null);

    this.messageSignal.set(null);

    this.userSignal.set(null);

    this.tenantSignal.set(null);

    this.permissionsSignal.set([]);

    this.globalModulesSignal.set([]);

    this.tenantModulesSignal.set([]);

    this.authenticatedSignal.set(false);

    window.location.replace('/auth/login');
  }

  // ----------------------------------------------------------------------------------------------------
  // REFRESH TOKEN
  // ----------------------------------------------------------------------------------------------------

  // refreshAccessToken(): Observable<any> {
  //   const refreshToken = this.refreshToken();

  //   if (!refreshToken) {
  //     this.logout();

  //     return throwError(() => new Error('No refresh token'));
  //   }

  //   return this.api
  //     .apiUserRefreshPost({
  //       refreshToken,
  //     })
  //     .pipe(
  //       tap((response: any) => {
  //         if (!response?.success) {
  //           this.logout();

  //           return;
  //         }

  //         const currentSession = this.getStoredSession();

  //         const updatedSession = {
  //           ...currentSession,

  //           token: response.data.token,

  //           refreshToken: response.data.refreshToken,
  //         };

  //         this.setSession(updatedSession);
  //       }),

  //       catchError((error) => {
  //         this.logout();

  //         return throwError(() => error);
  //       }),
  //     );
  // }
  refreshAccessToken(): Observable<any> {
    console.warn('Refresh token endpoint not available');

    this.logout();

    return throwError(() => new Error('Refresh token endpoint not available'));
  }
  signup(dto: SignUpDto): Observable<any> {
    this.loadingSignal.set(true);

    this.errorSignal.set(null);

    return this.api.apiUserSignupPost(dto).pipe(
      tap((response: any) => {
        console.log('Signup success', response);
      }),

      catchError((error) => {
        const message = this.getErrorMessage(error);

        this.errorSignal.set(message);

        return throwError(() => new Error(message));
      }),

      finalize(() => {
        this.loadingSignal.set(false);
      }),
    );
  }

  // ----------------------------------------------------------------------------------------------------
  // ACCESS HELPERS
  // ----------------------------------------------------------------------------------------------------

  getToken(): string | null {
    return this.token();
  }

  hasRole(role: string): boolean {
    const user = this.user();

    if (!user) {
      return false;
    }

    return user.roleName === role || user.roleNames?.includes(role);
  }

  hasPermission(permission: string): boolean {
    return this.permissions().includes(permission);
  }

  // ----------------------------------------------------------------------------------------------------
  // SESSION
  // ----------------------------------------------------------------------------------------------------

  private setSession(session: SessionModel): void {
    this.tokenSignal.set(session.token);

    this.refreshTokenSignal.set(session.refreshToken);

    this.messageSignal.set(session.message);

    this.userSignal.set(session.user);

    this.tenantSignal.set(session.tenant);

    this.permissionsSignal.set(session.permissions);

    this.globalModulesSignal.set(session.globalModules);

    this.tenantModulesSignal.set(session.tenantModules);

    this.authenticatedSignal.set(true);

    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  private loadStoredSession(): void {
    const storedSession = localStorage.getItem(this.sessionKey);

    if (!storedSession) {
      return;
    }

    try {
      const session = JSON.parse(storedSession);

      this.restoreSession(session);
    } catch {
      this.logout();
    }
  }

  private restoreSession(session: SessionModel): void {
    this.tokenSignal.set(session.token);

    this.refreshTokenSignal.set(session.refreshToken);

    this.messageSignal.set(session.message);

    this.userSignal.set(session.user);

    this.tenantSignal.set(session.tenant);

    this.permissionsSignal.set(session.permissions);

    this.globalModulesSignal.set(session.globalModules);

    this.tenantModulesSignal.set(session.tenantModules);

    this.authenticatedSignal.set(true);
  }

  private getStoredSession(): SessionModel {
    const stored = localStorage.getItem(this.sessionKey);

    return stored ? JSON.parse(stored) : ({} as SessionModel);
  }

  // ----------------------------------------------------------------------------------------------------
  // SUBDOMAIN
  // ----------------------------------------------------------------------------------------------------

  private getCurrentSubdomain(): string {
    const hostname = window.location.hostname;

    const parts = hostname.split('.');

    // tenant.localhost
    if (hostname.includes('.localhost')) {
      return parts[0];
    }

    // production
    if (parts.length > 2) {
      return parts[0];
    }

    return '';
  }

  private redirectToTenantSubdomain(session: SessionModel): void {
    const subdomain = session?.tenant?.subdomain;

    if (!subdomain) {
      throw new Error('Tenant subdomain missing');
    }

    const encodedSession = encodeURIComponent(btoa(JSON.stringify(session)));

    let redirectUrl = '';

    // LOCALHOST
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname.endsWith('.localhost')
    ) {
      redirectUrl = `http://${subdomain}.localhost:4200/auth/callback?session=${encodedSession}`;
    }

    // PRODUCTION
    else {
      const hostParts = window.location.hostname.split('.');

      const rootDomain = hostParts.slice(-2).join('.');

      redirectUrl = `https://${subdomain}.${rootDomain}/auth/callback?session=${encodedSession}`;
    }

    window.location.replace(redirectUrl);
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Unable to connect to server';
    }

    if (error.status === 400) {
      return 'Invalid request';
    }

    if (error.status === 401) {
      return 'Invalid credentials';
    }

    if (error.status === 403) {
      return 'Access denied';
    }

    if (error.status === 500) {
      return 'Internal server error';
    }

    return error?.error?.message || error?.message || 'Something went wrong';
  }

  // -------------------------------------------------------------------------------------------------------------------------
}
