import { Action } from '@ngrx/store';

import { User, UserGroup, UserSite, UserRole } from './user.model';

// @todo, we should apply the same refactoring here as was done in test-details.actions.ts
export const GET_USER = '[User] Get User Details';
export const GET_USER_SUCCESS = '[User] Get User Details Success';
export const USER_GROUP = '[User] Get User Groups';
export const USER_GROUP_SUCCESS = '[User] Get User Groups Success';
export const USER_GROUP_FAILURE = '[User] Get User Groups Failure';
export const USER_SITE = '[User] Get User Sites';
export const USER_SITE_SUCCESS = '[User] Get User Sites Success';
export const USER_SITE_FAILURE = '[User] Get User Sites Failure';
export const GET_USER_ROLE = '[User] Get User Role';
export const GET_USER_ROLE_SUCCESS = '[User] Get User Role Success';
export const GET_USER_ROLE_FAILURE = '[User] Get User Role Failure';


export class GetUser implements Action {
  readonly type: string = GET_USER;
}

export class GetUserSites implements Action {
  readonly type: string = USER_SITE;
}

export class GetUserGroups implements Action {
  readonly type: string = USER_GROUP;
}

export class GetUserSuccess implements Action {
  readonly type: string = GET_USER_SUCCESS;
  constructor(public user: User) {}
}

export class GetUserSitesSuccess implements Action {
  readonly type: string = USER_SITE_SUCCESS;
  constructor(public sites: UserSite[]) {}
}

export class GetUserGroupsSuccess implements Action {
  readonly type: string = USER_GROUP_SUCCESS;
  constructor(public groups: UserGroup[]) {}
}

export class GetUserSitesFailure implements Action {
  readonly type: string = USER_SITE_FAILURE;
}

export class GetUserGroupsFailure implements Action {
  readonly type: string = USER_GROUP_FAILURE;
}

export class GetUserRole implements Action {
  readonly type: string = GET_USER_ROLE;
}

export class GetUserRoleSuccess implements Action {
  readonly type: string = GET_USER_ROLE_SUCCESS;
  constructor(public userRole: UserRole[]) {}
}

export class GetUserRoleFailure implements Action {
  readonly type: string = GET_USER_ROLE_FAILURE;
}

export type UserActions = GetUser | GetUserSuccess | GetUserGroups | GetUserGroupsSuccess | GetUserGroupsFailure |
                          GetUserSites | GetUserSitesSuccess | GetUserSitesFailure | GetUserRole;
