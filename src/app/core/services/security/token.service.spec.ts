import { async, inject, TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthEvent } from 'angular-oauth2-oidc/events';
import { Observable } from 'rxjs/Observable';
import { MockOAuthService } from '../../../../testing/mocks/mock-service';
import { tokenEvents, TokenService } from './token.service';

describe('TokenService', () => {

  let oAuthService: OAuthService;

  const testToken: string = 'Test Token';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        {provide: OAuthService, useClass: MockOAuthService}
      ]
    });

    oAuthService = TestBed.get(OAuthService);
  }));

  it('should be created', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));

  it('should return access token', inject([TokenService], (service: TokenService) => {
    (<jasmine.Spy>oAuthService.getAccessToken).and.returnValue(testToken);
    const token = service.getToken();
    expect(oAuthService.getAccessToken).toHaveBeenCalled();
    expect(token).toEqual(testToken);
  }));

  it('should filter, subscribe to oAuthService and call silentRefresh', inject([TokenService], (service: TokenService) => {
    oAuthService.events = Observable.of({type: tokenEvents.TOKEN_EXPIRES} as OAuthEvent);
    service['refreshToken']();
    expect(oAuthService.silentRefresh).toHaveBeenCalled();
  }));

  it('should filter other events', inject([TokenService], (service: TokenService) => {
    oAuthService.events = Observable.of({type: tokenEvents.TOKEN_RECEIVED} as OAuthEvent);
    service['refreshToken']();
    expect(oAuthService.silentRefresh).not.toHaveBeenCalled();
  }));

});
