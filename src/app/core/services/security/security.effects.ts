import { Actions, Effect } from '@ngrx/effects';
import { SecurityService } from './security.service';
import { Injectable } from '@angular/core';
import { UserLoginService } from './user.service';
import { LoginSuccess, securityActions, TryLoginFailed } from './security.actions';
// import { SendNotification } from '../notification/notification.actions';
// import { NotificationType } from '../notification/notification.reducer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './token.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/if';
import {Router} from '@angular/router';

@Injectable()
export class SecurityEffects {
  @Effect()
  tryLogin$ = this.actions$
    .ofType(securityActions.TRY_LOGIN)
    .do(() => this.securityService.tryLogin())
    .map(() => ({
        currentUser: this.userService.getCurrentUser(),
        token: this.tokenService.getToken()
    }))
    .mergeMap(({currentUser, token}) => Observable.if(
      () => !!currentUser,
      Observable.of(new LoginSuccess(currentUser, token)),
      Observable.of(new TryLoginFailed())
      )
    );

  @Effect({ dispatch: false })
  login$ = this.actions$
    .ofType(securityActions.LOGIN)
    .switchMap(() => Observable.of(this.securityService.login()));

  @Effect()
  tokenReceived$ = this.actions$
    .ofType(securityActions.TOKEN_RECEIVED)
    .map(() => ({
        currentUser: this.userService.getCurrentUser(),
        token: this.tokenService.getToken()
    }))
    .do(() => this.router.navigate(['/']))
    .mergeMap(({currentUser, token}) => [ new LoginSuccess(currentUser, token)] );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType(securityActions.LOGOUT)
    .do(() => this.securityService.logout());

  constructor(private actions$: Actions,
              private securityService: SecurityService,
              private userService: UserLoginService,
              private translate: TranslateService,
              private tokenService: TokenService,
              private router: Router) {
  }
}
