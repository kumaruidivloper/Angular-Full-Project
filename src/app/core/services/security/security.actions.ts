import { Action } from '@ngrx/store';
import { User } from './user.model';
import { securityFeatureName } from './security.reducer';

export const securityActions = {
  TRY_LOGIN: `[${securityFeatureName}] Try Login`,
  TRY_LOGIN_FAILED: `[${securityFeatureName}] Try login failed`,
  LOGIN: `[${securityFeatureName}] Login`,
  TOKEN_RECEIVED: `[${securityFeatureName}] Token Received`,
  LOGIN_SUCCESS: `[${securityFeatureName}] Login Success`,
  LOGOUT: `[${securityFeatureName}] Logout`
};

export class TryLogin implements Action {
  readonly type = securityActions.TRY_LOGIN;
}

export class TryLoginFailed implements Action {
  readonly type = securityActions.TRY_LOGIN_FAILED;
}

export class Login implements Action {
  readonly type = securityActions.LOGIN;
}

export class TokenReceived implements Action {
  readonly type = securityActions.TOKEN_RECEIVED;
}

export class LoginSuccess implements Action {
  readonly type = securityActions.LOGIN_SUCCESS;

  constructor(public currentUser: User, public token: string) {}
}

export class Logout implements Action {
  readonly type = securityActions.LOGOUT;
}


export type AnyAction = TryLogin |
  Login |
  TokenReceived |
  LoginSuccess |
  TryLoginFailed |
  Logout;
