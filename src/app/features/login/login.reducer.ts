import {
  UserLoginActions,
  UserLoginSuccess,
  loginActionTypes
} from './login.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const loginFeatureName: string = 'Login';

export interface LoginState {
  accessToken: string;
}

export const loginDefaultState: LoginState = {
  accessToken: null
};

export function loginReducer(
  state: LoginState = loginDefaultState,
  action: UserLoginActions): LoginState {

  switch (action.type) {
    case loginActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        accessToken: null
      };
    case loginActionTypes.LOGIN_SUCCESS:
    case loginActionTypes.TRY_LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: (<UserLoginSuccess>action).token
      };
    default:
      return state;
  }
}

export const getToken = state => state.accessToken;

export const stateSelector = createFeatureSelector<LoginState>(loginFeatureName);
export const accessTokenSelector = createSelector(stateSelector, getToken);
