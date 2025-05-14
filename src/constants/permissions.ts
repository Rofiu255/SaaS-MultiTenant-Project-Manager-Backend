// constants/permissions.ts

export const Permissions = {
    CREATE_USER: 'create:user',
    UPDATE_USER: 'update:user',
    DELETE_USER: 'delete:user',
    VIEW_USER: 'view:user',
  
    CREATE_PROJECT: 'create:project',
    UPDATE_PROJECT: 'update:project',
    DELETE_PROJECT: 'delete:project',
    VIEW_PROJECT: 'view:project',
  
    MANAGE_TENANT: 'manage:tenant',
    VIEW_AUDIT_LOG: 'view:audit-log',
  };
  
  export const rolePermissions: Record<string, string[]> = {
    super_admin: Object.values(Permissions),
    admin: [
      Permissions.CREATE_USER,
      Permissions.UPDATE_USER,
      Permissions.DELETE_USER,
      Permissions.VIEW_USER,
      Permissions.MANAGE_TENANT,
    ],
    manager: [
      Permissions.CREATE_PROJECT,
      Permissions.UPDATE_PROJECT,
      Permissions.VIEW_PROJECT,
    ],
    user: [Permissions.VIEW_PROJECT],
    guest: [],
  };
  