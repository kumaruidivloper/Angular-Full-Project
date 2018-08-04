import { SecurityState } from './security.reducer';
import { Injectable } from '@angular/core';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { tokenEvents } from './token.service';
import { TokenReceived } from './security.actions';
import { oauthConfig } from './oauth.config';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SecurityService {
  constructor( private oAuthService: OAuthService,
               private store: Store<SecurityState>,
               private router: Router ) {
    this.tokenReceived();
    this.configureOAuthService();
  }

  login(): void {
    this.oAuthService.initImplicitFlow();
  }

  tryLogin(): void {
    this.oAuthService.tryLogin();
  }

  logout(): void {
    this.oAuthService.logOut(true);
    location.assign(this.oAuthService.logoutUrl);
  }

  redirectToHomePage(): void {
    this.router.navigate(['/']);
  }

  private configureOAuthService(): void {
    Object.assign(this.oAuthService, oauthConfig);
    this.oAuthService.setStorage(localStorage);
    this.oAuthService.tokenValidationHandler = new NullValidationHandler();
  }

  private tokenReceived(): void {
    this.oAuthService.events
      .filter(event => event.type === tokenEvents.TOKEN_RECEIVED)
      .subscribe(() => this.store.dispatch(new TokenReceived()));
  }
}
