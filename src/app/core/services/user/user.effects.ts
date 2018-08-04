import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/mergeMap';

import {
  GET_USER, GetUserSuccess, USER_GROUP, USER_SITE, GetUserGroupsFailure, GetUserSitesFailure, GetUserSitesSuccess,
  GetUserGroupsSuccess, GET_USER_ROLE, GetUserRoleFailure, GetUserRoleSuccess
} from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private userService: UserService) {}

  @Effect() getUser: Observable<Action> = this.actions$
    .ofType(GET_USER)
    .mergeMap(() => {
      return this.userService.getUser()
        .map(user => {
          return new GetUserSuccess(user);
        });
    });

  @Effect() getUserGroups$: Observable<Action> = this.actions$
    .ofType(USER_GROUP)
    .mergeMap(() => {
      return this.userService.getUserGroups()
        .map((result) => {
          return new GetUserGroupsSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetUserGroupsFailure());
        });
    });

  @Effect() getUserSites$: Observable<Action> = this.actions$
    .ofType(USER_SITE)
    .mergeMap(() => {
      return this.userService.getUserSites()
        .map((result) => {
          return new GetUserSitesSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetUserSitesFailure());
        });
    });

  @Effect() getUserRole$: Observable<Action> = this.actions$
    .ofType(GET_USER_ROLE)
    .mergeMap(() => {
      return this.userService.getUserRole()
        .map((result) => {
          return new GetUserRoleSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetUserRoleFailure());
        });
    });
}
