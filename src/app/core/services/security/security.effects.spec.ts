import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../../testing/mocks/mock-service';
import { AnyAction, Login, LoginSuccess, Logout, TryLogin, TryLoginFailed } from './security.actions';
import { SecurityEffects } from './security.effects';
import { SecurityService } from './security.service';
import { TokenService } from './token.service';
import { User } from './user.model';
import { UserLoginService } from './user.service';

describe('SecurityEffects', () => {

  let effects: SecurityEffects,
      actions: ReplaySubject<AnyAction>,
      userService: jasmine.SpyObj<UserLoginService>,
      tokenService: jasmine.SpyObj<TokenService>,
      securityService: jasmine.SpyObj<SecurityService>,
      translateService: TranslateService;

  const testUser: User = {
    city: '',
    client_id: 'a123',
    email: '',
    exp: 0,
    firstName: '',
    lastName: '',
    memberOf: '',
    scope: [],
    userName: '',
    username: '',
    country: ''
  },
  testToken = 'test';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurityEffects,
        provideMockActions(() => actions),
        mockService(SecurityService),
        mockService(UserLoginService),
        mockService(TokenService),
        mockService(TranslateService)
      ]
    });

    effects = TestBed.get(SecurityEffects);
    userService = TestBed.get(UserLoginService);
    tokenService = TestBed.get(TokenService);
    securityService = TestBed.get(SecurityService);
    translateService = TestBed.get(TranslateService);
  }));

  it('should catch tryLogin and dispatch TryLoginFailed if user is not logged in', async(() => {
    actions = new ReplaySubject(1);
    actions.next(new TryLogin());
    effects.tryLogin$.subscribe(result => {
      expect(securityService.tryLogin).toHaveBeenCalled();
      expect(result).toEqual(new TryLoginFailed());
    });
  }));

  it('should catch tryLogin and dispatch LoginSuccess if user is logged in', async(() => {
    userService.getCurrentUser.and.returnValue(testUser);
    tokenService.getToken.and.returnValue(testToken);
    actions = new ReplaySubject(1);
    actions.next(new TryLogin());
    effects.tryLogin$.subscribe(result => {
      expect(securityService.tryLogin).toHaveBeenCalled();
      expect(result).toEqual(new LoginSuccess(testUser, testToken));
    });
  }));

  it('should catch login and dispatch LoginSuccess', async(() => {
    userService.getCurrentUser.and.returnValue(testUser);
    actions = new ReplaySubject(1);
    actions.next(new Login());
    effects.login$.subscribe(() => {
      expect(securityService.login).toHaveBeenCalled();
    });
  }));

  // @todo fix this test
  // it('should catch tokenReceived and dispatch LoginSuccess', async(() => {
  //   const testNotification: Notification = {
  //     message: 'a123 successfully logged in',
  //     title: 'Ping Auth',
  //     notificationType: 'sendInfo'
  //   };
  //   (<Spy>translateService.instant).and.callFake((key, params?) => {
  //     if (params) {
  //       return testNotification.message;
  //     }
  //     return testNotification.title;
  //   });
  //   userService.getCurrentUser.and.returnValue(testUser);
  //   tokenService.getToken.and.returnValue(testToken);
  //   actions = new ReplaySubject(1);
  //   actions.next(new TokenReceived());
  //   effects.tokenReceived$.subscribe(result => {
  //     let currentMockAction = null;
  //     if ((<SendNotification>result).notification) {
  //       currentMockAction = new SendNotification(testNotification);
  //     } else {
  //       currentMockAction = new LoginSuccess(testUser, testToken);
  //     }
  //     expect(result).toEqual(currentMockAction);
  //   });
  // }));

  it('should catch logout', async(() => {
    actions = new ReplaySubject(1);
    actions.next(new Logout());
    effects.logout$.subscribe(result => {
      expect(securityService.logout).toHaveBeenCalled();
    });
  }));

});
