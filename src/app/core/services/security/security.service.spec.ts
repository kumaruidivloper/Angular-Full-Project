import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OAuthEvent } from 'angular-oauth2-oidc/events';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MockOAuthService, mockService } from '../../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { SecurityService } from './security.service';
import { tokenEvents } from './token.service';
import { SecurityState } from './security.reducer';
import { TokenReceived } from './security.actions';

describe('SecurityService', () => {

  let oAuthService: OAuthService,
      router: Router,
      store: Store<SecurityState>;

  const config = {
    issuer: 'https://federate-qa.volvo.com',
    loginUrl: 'https://federate-qa.volvo.com/as/authorization.oauth2',
    logoutUrl: 'https://federate-qa.volvo.com/idp/startSLO.ping',
    redirectUri: window.location.origin + '/finish.html',
    clientId: 'tm-uiservice',
    customQueryParams: {
      display: 'page'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurityService,
        mockService(Router),
        MockStoreProvider,
        {provide: OAuthService, useClass: MockOAuthService}
      ]
    });

    oAuthService = TestBed.get(OAuthService);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
  }));

  it('should be created', inject([SecurityService], (service: SecurityService) => {
    expect(service).toBeTruthy();
  }));

  it('should init implicit flow on login', inject([SecurityService], (service: SecurityService) => {
    service.login();
    expect(oAuthService.initImplicitFlow).toHaveBeenCalled();
  }));

  it('should call tryLogin', inject([SecurityService], (service: SecurityService) => {
    service.tryLogin();
    expect(oAuthService.tryLogin).toHaveBeenCalled();
  }));

  it('should call logOut', inject([SecurityService], (service: SecurityService) => {
    spyOn(location, 'assign');
    service.logout();
    expect(oAuthService.logOut).toHaveBeenCalled();
    expect(location.assign).toHaveBeenCalled();
  }));

  it('should register event dispatching when token is received', inject([SecurityService], (service: SecurityService) => {
    service['tokenReceived']();
    expect(oAuthService.events.subscribe).toHaveBeenCalled();
  }));


  it('should navigate to home page when redirectToHomePage', inject([SecurityService], (service: SecurityService) => {
    service.redirectToHomePage();
    expect(<jasmine.Spy>router.navigate).toHaveBeenCalled();
  }));

  it('should configure oAuthService', inject([SecurityService], (service: SecurityService) => {
    service['configureOAuthService']();
    expect(oAuthService.clientId).toEqual(config.clientId);
    expect(oAuthService.setStorage).toHaveBeenCalledWith(localStorage);
    expect(oAuthService.tokenValidationHandler).toEqual(new NullValidationHandler());
  }));

  it('should filter, subscribe to oAuthService and send action', inject([SecurityService], (service: SecurityService) => {
    oAuthService.events = Observable.of({type: tokenEvents.TOKEN_RECEIVED} as OAuthEvent);
    service['tokenReceived']();
    expect(store.dispatch).toHaveBeenCalledWith(new TokenReceived());
  }));

  it('should filter other events', inject([SecurityService], (service: SecurityService) => {
    oAuthService.events = Observable.of({type: tokenEvents.TOKEN_EXPIRES} as OAuthEvent);
    service['tokenReceived']();
    expect(store.dispatch).not.toHaveBeenCalled();
  }));

});
