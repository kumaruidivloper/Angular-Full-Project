import { Action } from '@ngrx/store';
import { Credentials } from './login.model';

export const loginActionTypes = {
  LOGIN: '[Auth] User Login',
  LOGOUT: '[Auth] User Logout',
  LOGIN_SUCCESS: '[Auth] User Login Success',
  LOGOUT_SUCCESS: '[Auth] User Logout Success',
  LOGIN_FAILURE: '[Auth] User Login Failure',
  TRY_LOGIN: '[Auth] Try User Login ',
  TRY_LOGIN_SUCCESS: '[Auth] Try User LoginSuccess'
};

export class UserLogin implements Action {
  readonly type: string = loginActionTypes.LOGIN;
  constructor(public credentials: Credentials) {}
}

export class UserLogOut implements Action {
  readonly type: string = loginActionTypes.LOGOUT;
}

export class UserLoginSuccess implements Action {
  readonly type: string = loginActionTypes.LOGIN_SUCCESS;
  constructor(public token: string) {}
}

export class UserLogOutSuccess implements Action {
  readonly type: string = loginActionTypes.LOGOUT_SUCCESS;
}

export class UserLoginFailure implements Action {
  readonly type: string = loginActionTypes.LOGIN_FAILURE;
}

export class TryUserLogin implements Action {
  readonly type: string = loginActionTypes.TRY_LOGIN;
}

export class TryUserLoginSuccess implements Action {
  readonly type: string = loginActionTypes.TRY_LOGIN_SUCCESS;
  constructor(public token: string) {}
}

export type UserLoginActions = UserLogin | UserLoginSuccess | UserLogOut | UserLogOutSuccess |
  UserLoginFailure | TryUserLogin | TryUserLoginSuccess;

