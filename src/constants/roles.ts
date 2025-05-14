// constants/roles.ts

export enum Roles {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user',
    GUEST = 'guest',
  }
  
  export const roleHierarchy: Record<Roles, number> = {
    [Roles.SUPER_ADMIN]: 5,
    [Roles.ADMIN]: 4,
    [Roles.MANAGER]: 3,
    [Roles.USER]: 2,
    [Roles.GUEST]: 1,
  };
  