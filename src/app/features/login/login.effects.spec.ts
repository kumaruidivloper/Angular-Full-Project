import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { NotificationService } from 'ng2-notify-popup';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../testing/mocks/mock-store';
import { GetUser, GetUserGroups, GetUserRole, GetUserSites } from '../../core/services/user/user.actions';
import { SessionStorageService } from '../../core/storage/session-storage.service';
import { LoginEffects } from './login.effects';
import { Credentials } from './login.model';
import { LoginState } from './login.reducer';
import { LoginService } from './login.service';
import {
  UserLogin,
  UserLoginFailure,
  UserLoginSuccess,
  UserLogOut,
  UserLogOutSuccess
} from './login.actions';

describe('LoginEffects', () => {
  const token: string = 'test token';
  let actions: ReplaySubject<any>;
  let effects: LoginEffects;
  let loginService: LoginService;
  let store: Store<LoginState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions),
        mockService(LoginService),
        mockService(SessionStorageService),
        mockService(NotificationService),
        MockStoreProvider
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(LoginEffects);
    store = TestBed.get(Store);
  });

  it('should exist', () => {
    expect(effects).toBeTruthy();
  });

  describe('login effect', () => {
    const credentials: Credentials = {username: 'test', password: 'test'};

    beforeEach(() => {
      loginService = TestBed.get(LoginService);
      (<jasmine.Spy>loginService.login).and.returnValue(Observable.of({
        headers: {
          get: () => token
        }
      }));

      actions = new ReplaySubject(1);
      actions.next(new UserLogin(credentials));
    });

    it('should catch LOGIN and call login service', async(() => {
      effects.login.subscribe(() => {
        expect(loginService.login).toHaveBeenCalledWith(credentials);
      });
    }));

    it('should store token in session storage', async(() => {
      const sessionStorageService = TestBed.get(SessionStorageService);

      effects.login.subscribe(() => {
        expect(<jasmine.Spy>sessionStorageService.setItem)
          .toHaveBeenCalledWith(LoginService.tokenStorageKey, token);
      });
    }));

    it('should dispatch LoginFailure if login service fails', async(() => {
      (<jasmine.Spy>loginService.login).and.returnValue(Observable.throw('error'));

      effects.login.subscribe(result => {
        expect(result).toEqual(new UserLoginFailure());
      });
    }));

  });

  describe('logout effect', () => {
    beforeEach(() => {
      loginService = TestBed.get(LoginService);
      actions = new ReplaySubject(1);
      actions.next(new UserLogOut());
    });

    it('should catch LOGOUT and return LOGOUT_SUCCESS', async(() => {
      effects.logout.subscribe(result => {
        expect(result).toEqual(new UserLogOutSuccess());
      });
    }));

    it('should catch LOGOUT and call logout function on loginService', async(() => {
      effects.logout.subscribe(result => {
        expect(loginService.logout).toHaveBeenCalled();
      });
    }));
  });

  describe('loginSuccess effect', () => {
    let router: Router;

    beforeEach(() => {
      actions = new ReplaySubject(1);
      actions.next(new UserLoginSuccess(token));
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
    });

    it('should catch LOGIN_SUCCESS and return GET_USER', async(() => {
      const next = jasmine.createSpy('next');
      effects.loginSuccess.subscribe(next);

      expect(next).toHaveBeenCalledTimes(4);
      expect(next).toHaveBeenCalledWith(new GetUser());
      expect(next).toHaveBeenCalledWith(new GetUserSites());
      expect(next).toHaveBeenCalledWith(new GetUserGroups());
      expect(next).toHaveBeenCalledWith(new GetUserRole());
    }));

    it('should catch LOGIN_SUCCESS and call router navigate', async(() => {
      effects.loginSuccess.subscribe(result => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    }));
  });
});
