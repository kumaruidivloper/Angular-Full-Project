import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  GET_USER_ROLE_SUCCESS,
  GET_USER_SUCCESS,
  GetUserGroupsSuccess,
  GetUserRoleSuccess,
  GetUserSitesSuccess,
  GetUserSuccess,
  USER_GROUP_SUCCESS,
  USER_SITE_SUCCESS,
  UserActions
} from './user.actions';
import { User, UserState } from './user.model';

export const userFeatureName: string = 'User';

export const userDefaultState: UserState = {
  user: null,
  groups: [],
  sites: [],
  userRole: []
};

export function userReducer(
  state: UserState = userDefaultState,
  action: UserActions): UserState {

  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: (<GetUserSuccess>action).user
      };
    case USER_GROUP_SUCCESS:
      return <UserState>{
        ...state,
        groups: (<GetUserGroupsSuccess>action).groups
      };
    case USER_SITE_SUCCESS:
      return <UserState>{
        ...state,
        sites: (<GetUserSitesSuccess>action).sites
      };
    case GET_USER_ROLE_SUCCESS:
      return <UserState>{
        ...state,
        userRole: (<GetUserRoleSuccess>action).userRole
      };
    default:
      return state;
  }
}

export const getUser = state => state.user;
export const getUserGroups = (state: UserState) => state.groups;
export const getUserSites = (state: UserState) => state.sites;
export const getUserRole = (state: UserState) => state.userRole;

export const stateSelector = createFeatureSelector<UserState>(userFeatureName);
export const userSelector = createSelector(stateSelector, getUser);
export const groupsSelector = createSelector(stateSelector, getUserGroups);
export const sitesSelector = createSelector(stateSelector, getUserSites);
export const roleSelector = createSelector(stateSelector, getUserRole);
