export interface SessionModel {

  token: string;

  refreshToken: string;

  message: string;

  tenant: TenantModel | null;

  user: UserModel | null;

  permissions: string[];

  globalModules: any[];

  tenantModules: any[];
}

export interface TenantModel {

  id: string;

  name: string;

  subdomain: string;

  modules: any[];
}

export interface UserModel {

  id: string;

  firstName: string;

  lastName: string;

  email: string;

  username: string | null;

  roleId: string;

  roleName: string;

  roleNames: string[];

  permissionList: string[];
}