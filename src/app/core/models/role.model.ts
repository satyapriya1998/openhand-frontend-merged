export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem?: boolean;
}

export interface Permission {
  module: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export interface PermissionMatrix {
  module: string;
  permissions: {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
}
