import { async, TestBed } from '@angular/core/testing';
import { UserEffects } from './user.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../../testing/mocks/mock-service';
import { UserService } from './user.service';
import { SessionStorageService } from '../../storage/session-storage.service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { User, UserState } from './user.model';
import { Observable } from 'rxjs/Observable';
import {
  GetUser,
  GetUserGroups,
  GetUserGroupsFailure,
  GetUserGroupsSuccess,
  GetUserSites,
  GetUserSitesFailure,
  GetUserSitesSuccess,
  GetUserSuccess
} from './user.actions';

describe('UserEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: UserEffects;
  let store: Store<UserState>;
  let userService: UserService;

  const user: User = {firstName: 'first', lastName: 'last'};

  const userGroups =   [{
    id: 'PVT_GOT',
    groupId: 'PVT',
    groupName: 'PVT',
  }];

  const userSites =   [{
    id: 'PVT_GOT',
    groupId: 'LYS',
    groupName: 'LYS',
  }];

  const userId = 'PVT_GOT';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        mockService(UserService),
        mockService(SessionStorageService),
        MockStoreProvider,
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(UserEffects);
    store = TestBed.get(Store);
    userService = TestBed.get(UserService);
  });

  describe('getUser effect', () => {
    let sessionStorageService: SessionStorageService;

    beforeEach(() => {
      actions = new ReplaySubject(1);
      actions.next(new GetUser());
      sessionStorageService = TestBed.get(SessionStorageService);
      (<jasmine.Spy>userService.getUser).and.returnValue(Observable.of(user));
    });

    it('should catch GET_USER and return GET_USER_SUCCESS', async(() => {
      effects.getUser.subscribe(result => {
        expect(result).toEqual(new GetUserSuccess(user));
      });
    }));
  });

  describe('Get UserGroup', () => {
    beforeEach(() => {
      actions = new ReplaySubject(1);
      actions.next(new GetUserGroups());
    });

    it('should catch GET_USER_GROUPS and call getUserGroup service', async(() => {
      (<jasmine.Spy>userService.getUserGroups).and.returnValue(Observable.of(userGroups));
      effects.getUserGroups$.subscribe(() => {
        expect(userService.getUserGroups).toHaveBeenCalled();
      });
    }));

    it('should catch GET_USER_GROUPS and call GET_USER_GROUPS_SUCCESS', async(() => {
      (<jasmine.Spy>userService.getUserGroups).and.returnValue(Observable.of(userGroups));
      effects.getUserGroups$.subscribe(result => {
        expect(result).toEqual(new GetUserGroupsSuccess(userGroups));
      });
    }));

    it('should throw GET_USER_GROUPS_FAILURE', async(() => {
      (<jasmine.Spy>userService.getUserGroups).and.returnValue(Observable.throw('error'));
      effects.getUserGroups$.subscribe(result => {
        expect(result).toEqual(new GetUserGroupsFailure());
      });
    }));
  });

  describe('Get UserSite', () => {
    beforeEach(() => {
      actions = new ReplaySubject(1);
      actions.next(new GetUserSites());
    });

    it('should catch GET_USER_SITES and call getUserSite service', async(() => {
      (<jasmine.Spy>userService.getUserSites).and.returnValue(Observable.of(userSites));
      effects.getUserSites$.subscribe(() => {
        expect(userService.getUserSites).toHaveBeenCalled();
      });
    }));

    it('should catch GET_USER_SITES and call GET_USER_SITES_SUCCESS', async(() => {
      (<jasmine.Spy>userService.getUserSites).and.returnValue(Observable.of(userSites));
      effects.getUserSites$.subscribe(result => {
        expect(result).toEqual(new GetUserSitesSuccess(userSites));
      });
    }));

    it('should throw GET_USER_SITES_FAILURE', async(() => {
      (<jasmine.Spy>userService.getUserSites).and.returnValue(Observable.throw('error'));
      effects.getUserSites$.subscribe(result => {
        expect(result).toEqual(new GetUserSitesFailure());
      });
    }));
  });
});
