export interface UserState {
  user: User;
  groups: UserGroup[];
  sites: UserSite[];
  userRole: UserRole[];
}

export interface User {
  userId?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserGroup {
  id?: string;
  groupId?: string;
  groupName?: string;
}

export interface UserSite {
  id?: string;
  siteId?: string;
  siteName?: string;
}

export interface UserRole {
  id?: string;
  groupId?: string;
  groupName?: string;
  roleId?: string;
}
