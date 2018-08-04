import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { NotificationService } from 'ng2-notify-popup';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { GetUser, GetUserGroups, GetUserRole, GetUserSites } from '../../core/services/user/user.actions';
import { SessionStorageService } from '../../core/storage/session-storage.service';
import {
  UserLogin,
  UserLoginFailure,
  UserLoginSuccess,
  UserLogOutSuccess,
  TryUserLoginSuccess,
  loginActionTypes,
} from './login.actions';

import { LoginService } from './login.service';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions,
              private loginService: LoginService,
              private sessionStorageService: SessionStorageService,
              private router: Router,
              private notifyService: NotificationService) {
  }

  @Effect() login: Observable<Action> = this.actions$
    .ofType(loginActionTypes.LOGIN)
    .switchMap((action: UserLogin) => { // @todo defining type :Login here should prevent you from having to do (<Login>action) later
    const userid = (<UserLogin>action).credentials.username;
      return this.loginService.login((<UserLogin>action).credentials)
        .map((response: HttpResponse<any>) => {
          const token: string = response.headers.get('jwt');
          this.sessionStorageService.setItem(LoginService.tokenStorageKey, token);
          this.sessionStorageService.setItem(LoginService.userIdStorageKey, userid);
          return new UserLoginSuccess(token);
        })
        .catch(() => {
          this.notifyService.show('Login Failed!, Try again with valid user id', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UserLoginFailure());
        });
    });

  @Effect() logout: Observable<Action> = this.actions$
    .ofType(loginActionTypes.LOGOUT)
    .map(() => {
      this.loginService.logout();
      return new UserLogOutSuccess();
    });

  @Effect() tryLogin$: Observable<Action> = this.actions$
    .ofType(loginActionTypes.TRY_LOGIN)
    .mergeMap(() => {
      return this.sessionStorageService.getItem<string>(LoginService.tokenStorageKey)
        .map((token: string) => {
          if (token) {
            return new TryUserLoginSuccess(token);
          } else {
            return new UserLoginFailure();
          }
        });
    });

  @Effect() tryLoginSuccess$: Observable<Action> = this.actions$
    .ofType(loginActionTypes.TRY_LOGIN_SUCCESS)
    .mergeMap(() => [
      new GetUser(),
      new GetUserSites(),
      new GetUserGroups(),
      new GetUserRole()
    ]);

  @Effect() loginSuccess: Observable<Action> = this.actions$
    .ofType(loginActionTypes.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']))
    .mergeMap(() => [
      new GetUser(),
      new GetUserSites(),
      new GetUserGroups(),
      new GetUserRole()
    ]);
}
