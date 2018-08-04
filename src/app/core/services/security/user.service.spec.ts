import { async, inject, TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { MockOAuthService } from '../../../../testing/mocks/mock-service';
import { UserLoginService } from './user.service';
import { User } from './user.model';

describe('UserLoginService', () => {

  let oAuthService: OAuthService;
  const testToken: string = 'Test Token',
        testUser: User = {
          city: '',
          client_id: '',
          email: '',
          exp: 0,
          firstName: '',
          lastName: '',
          memberOf: '',
          scope: [],
          userName: '',
          username: '',
          country: ''
        };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserLoginService,
        {provide: OAuthService, useClass: MockOAuthService}
      ]
    });

    oAuthService = TestBed.get(OAuthService);

    (<jasmine.Spy>oAuthService.getAccessToken).and.returnValue(testToken);
    (<jasmine.Spy>oAuthService.hasValidAccessToken).and.returnValue(true);
    (<jasmine.Spy>oAuthService.getIdentityClaims).and.returnValue(testUser);
  }));

  it('should be created', inject([UserLoginService], (service: UserLoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should return access token', inject([UserLoginService], (service: UserLoginService) => {
    const isAuthenticated = service.isAuthenticated();
    expect(oAuthService.hasValidAccessToken).toHaveBeenCalled();
    expect(isAuthenticated).toEqual(true);
  }));

  it('should return User identity', inject([UserLoginService], (service: UserLoginService) => {
    const user = service.getCurrentUser();
    expect(oAuthService.getIdentityClaims).toHaveBeenCalled();
    expect(user).toEqual(testUser);
  }));

});
