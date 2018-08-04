import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const tokenEvents = {
  TOKEN_EXPIRES: 'token_expires',
  TOKEN_RECEIVED: 'token_received'
};

@Injectable()
export class TokenService {
  constructor(private oAuthService: OAuthService) {
    this.refreshToken();
  }

  getToken(): string {
    return this.oAuthService.getAccessToken();
  }

  private refreshToken(): void {
    this.oAuthService.events
      .filter(event => event.type === tokenEvents.TOKEN_EXPIRES)
      .subscribe(() => this.oAuthService.silentRefresh());
  }
}
