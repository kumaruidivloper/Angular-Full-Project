import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { NotificationService } from 'ng2-notify-popup';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import {
  CreateTest,
  CreateTestFailure,
  DeleteTest,
  DeleteTestFailure,
  GetSoftwareVersions,
  GetTestDetailsFailure,
  GetTestLeaders,
  GetTestObjects,
  GetTestSoftwareVersionFailure,
  GetTestDetails,
  GetTestObjectFailure,
  UpdateTest,
  UpdateTestFailure
} from './test-details.actions';
import { TestDetailsEffects } from './test-details.effects';
import { TestDetails } from './test-details.model';
import { TestDetailsState } from './test-details.reducer';
import { TestDetailsService } from './test-details.service';
import Spy = jasmine.Spy;

describe('Test Details Effects', () => {
  let actions: ReplaySubject<any>;
  let effects: TestDetailsEffects;
  let testDetailsService: TestDetailsService;
  let store: Store<TestDetailsState>;
  let notifyService: NotificationService;
  let router: Router;
  const testId = 1;
  const testDetails: TestDetails = {
    'testId': '1',
    'name': 'PVT BASE-P2952',
    'description': 'PVT BASE-P2951',
    'testStatus': 'INITIATED',
    'plannedStartDate': 1509474600000,
    'actualStartDate': 1535740200000,
    'productClass': '04',
    'wbs': 'A2211-GM-00000001-01',
    'project': 'P2951',
    'privateTest': true,
    'testObjectField': 'FH-1683 11659',
    'testRequestId': '',
    'testSite': 'GOT',
    'testUserGroup': '',
    'testUser': { 'userId': 'GOT'},
    'testSwVersion': {name: 'test'},
    'testProcedure': []
  };
  const testObject = {'testObjectFieldData': 'FH-1683 1', 'productClass': '04'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestDetailsEffects,
        provideMockActions(() => actions),
        mockService(TestDetailsService),
        MockStoreProvider,
        mockService(NotificationService),

      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(TestDetailsEffects);
    store = TestBed.get(Store);
  });

  it('should exist', () => {
    expect(effects).toBeTruthy();
  });
  describe('Get Test Details', () => {
    beforeEach(() => {
      testDetailsService = TestBed.get(TestDetailsService);
      (<Spy>testDetailsService.getTestDetails).and.returnValue(Observable.of(testDetails));
      actions = new ReplaySubject(1);
      actions.next(new GetTestDetails(testId));
    });

    it('should catch GET_TEST_DETAILS and call getTestDetails service', async(() => {
      effects.getTestDetails$.subscribe(() => {
        expect(testDetailsService.getTestDetails).toHaveBeenCalled();
      });
    }));
    it('should dispatch TEST_DETAILS_FAILURE if getTestDetails service fails', async(() => {
      (<Spy>testDetailsService.getTestDetails).and.returnValue(Observable.throw('error'));
      effects.getTestDetails$.subscribe(result => {
        expect(result).toEqual(new GetTestDetailsFailure());
      });
    }));

  });
  describe('Get Test Objects', () => {
    beforeEach(() => {
      testDetailsService = TestBed.get(TestDetailsService);
      (<Spy>testDetailsService.getTestObjects).and.returnValue(Observable.of(testObject));
      actions = new ReplaySubject(1);
      actions.next(new GetTestObjects());
    });

    it('should catch GET_TEST_OBJECTS and call getTestObjects service', async(() => {
      effects.getTestObject$.subscribe(() => {
        expect(testDetailsService.getTestObjects).toHaveBeenCalled();
      });
    }));
    it('should dispatch GET_TEST_OBJECTS_FAILURE if getTestObjects service fails', async(() => {
      (<Spy>testDetailsService.getTestObjects).and.returnValue(Observable.throw('error'));
      effects.getTestObject$.subscribe(result => {
        expect(result).toEqual(new GetTestObjectFailure());
      });
    }));

  });
  describe('Get Test Software Version', () => {
    beforeEach(() => {
      testDetailsService = TestBed.get(TestDetailsService);
      (<Spy>testDetailsService.getTestSWVersion).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new GetSoftwareVersions());
    });

    it('should catch GET_TEST_SOFTWARE_VERSION and call getTestSWVersion service', async(() => {
      effects.getTestSWVersion$.subscribe(() => {
        expect(testDetailsService.getTestSWVersion).toHaveBeenCalled();
      });
    }));
    it('should dispatch GET_TEST_OBJECTS_FAILURE if getTestSWVersion service fails', async(() => {
      (<Spy>testDetailsService.getTestSWVersion).and.returnValue(Observable.throw('error'));
      effects.getTestSWVersion$.subscribe(result => {
        expect(result).toEqual(new GetTestSoftwareVersionFailure());
      });
    }));
  });
  describe('Get Test Leader', () => {
    beforeEach(() => {
      const testleader = {firstName: 'PVT', lastName: 'GOT'};
      const param = {siteId: 'GOT', groupId: 'PVT'};
      testDetailsService = TestBed.get(TestDetailsService);
      (<Spy>testDetailsService.getTestLeader).and.returnValue(Observable.of(testleader));
      actions = new ReplaySubject(1);
      actions.next(new GetTestLeaders(param));
    });

    it('should catch GET_TEST_LEADER and call getTestLeader service', async(() => {
      effects.getTestLeader$.subscribe(() => {
        expect(testDetailsService.getTestLeader).toHaveBeenCalled();
      });
    }));
  });
  describe('Delete Test', () => {
    beforeEach(() => {
      testDetailsService = TestBed.get(TestDetailsService);
      (<Spy>testDetailsService.deleteTestData).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new DeleteTest(testId));
      notifyService = TestBed.get(NotificationService);
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
    });

    it('should catch TEST_DELETE and call deleteTestData service', async(() => {
      effects.deleteTest$.subscribe(() => {
        expect(testDetailsService.deleteTestData).toHaveBeenCalled();
      });
    }));
    it('should catch GET_TEST_LEADER_SUCCESS and call Notification service', async(() => {
      effects.deleteTest$.subscribe(() => {
        expect(notifyService.show).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/test']);
      });
    }));
    it('should dispatch TEST_DELETE_FAILURE if deleteTestData service fails', async(() => {
      (<Spy>testDetailsService.getTestSWVersion).and.returnValue(Observable.throw('error'));
      effects.getTestSWVersion$.subscribe(result => {
        expect(result).toEqual(new DeleteTestFailure());
      });
    }));
  });
  describe('Update Test', () => {
    beforeEach(() => {
      testDetailsService = TestBed.get(TestDetailsService);
      (<Spy>testDetailsService.updateTestData).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new UpdateTest());
      notifyService = TestBed.get(NotificationService);
    });

    it('should catch UPDATE_TEST and call updateTestData service', async(() => {
      effects.deleteTest$.subscribe(() => {
        expect(testDetailsService.updateTestData).toHaveBeenCalled();
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));
    it('should dispatch UPDATE_TEST_FAILURE if updateTestData service fails', async(() => {
      (<Spy>testDetailsService.updateTestData).and.returnValue(Observable.throw('error'));
      effects.updateTest$.subscribe(result => {
        expect(result).toEqual(new UpdateTestFailure());
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));
  });
  describe('Create Test', () => {
    beforeEach(() => {
      testDetailsService = TestBed.get(TestDetailsService);
      (<Spy>testDetailsService.createTestData).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new CreateTest());
      notifyService = TestBed.get(NotificationService);
    });

    it('should catch CREATE_TEST and call createTestData service', async(() => {
      effects.deleteTest$.subscribe(() => {
        expect(testDetailsService.createTestData).toHaveBeenCalled();
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));
    it('should dispatch CREATE_TEST_FAILURE if createTestData service fails', async(() => {
      (<Spy>testDetailsService.createTestData).and.returnValue(Observable.throw('error'));
      effects.createTest$.subscribe(result => {
        expect(result).toEqual(new CreateTestFailure());
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));
  });


//  @TODO missing test coverage
});
