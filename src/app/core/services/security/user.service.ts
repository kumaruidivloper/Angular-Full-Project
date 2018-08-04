import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { User } from './user.model';

@Injectable()
export class UserLoginService {
  constructor(private oAuthService: OAuthService) {
  }

  isAuthenticated(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  getCurrentUser(): User {
    return this.oAuthService.getIdentityClaims() as User;
  }
}
