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
  GetTestStepDetails,
  GetTestStepDetailsSuccess,
  GetTestStepDetailsFailure,
  CreateTestStep,
  CreateTestStepSuccess,
  CreateTestStepFailure,
  UpdateTestStep,
  UpdateTestStepSuccess,
  UpdateTestStepFailure,
  UpdateTestStepDetailsForm,
  DeleteTestStep,
  DeleteTestStepSuccess,
  DeleteTestStepFailure,
  GetResultTypeTestStep,
  GetResultTypeTestStepSuccess,
  GetResultTypTestStepFailure,
  UpdateUserGroup,
  UpdateUserGroupSuccess,
  UpdateUserSite,
  UpdateUserSiteSuccess,
  ClearTestStepDetails,
  CreateTestStepCopy,
  CreateTestStepCopySuccess
} from './test-step-detail-actions';
import { TestStepDetailsEffects } from './test-step-detail.effect';
import { TestCaseStepDetails, CurrentTestCaseStepVersion, ResultType } from '../test-case-detail/test-case-detail.model';
import { TestStepDetailsState } from './test-step-detail.reducer';
import { TestStepDetailService } from './test-step-detail.service';
import Spy = jasmine.Spy;

describe('Test Step Detail Effects', () => {
  let actions: ReplaySubject<any>;
  let effects: TestStepDetailsEffects;
  let testStepDetailService: TestStepDetailService;
  let store: Store<TestStepDetailsState>;
  let notifyService: NotificationService;
  let router: Router;
  const testId = 1;
  const testCaseStepDetails: TestCaseStepDetails = {
    'id': 1,
    'testCaseStepType': '',
    'level': '',
    'testCaseStepSite': {},
    'testCaseStepUserGroup': {},
    'testCaseStepVersion': '',
    'currentTestCaseStepVersion': {}
  };

  const resultType: ResultType  = {
    'name': ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestStepDetailsEffects,
        provideMockActions(() => actions),
        mockService(TestStepDetailService),
        MockStoreProvider,
        mockService(NotificationService),
      ],
      imports: [
        RouterTestingModule
      ],
    });

    effects = TestBed.get(TestStepDetailsEffects);
    store = TestBed.get(Store);
  });

  it('should exist', () => {
    expect(effects).toBeTruthy();
  });

  describe('Get Test Step Details', () => {
    beforeEach(() => {
      testStepDetailService = TestBed.get(TestStepDetailService);
      (<Spy>testStepDetailService.getTestStepDetails).and.returnValue(Observable.of(testCaseStepDetails));
      actions = new ReplaySubject(1);
      actions.next(new GetTestStepDetails(testId));
    });

    it('should catch GET_TEST_STEP and call getTestStepDetails service', async(() => {
      effects.getTestStepDetails$.subscribe(() => {
        expect(testStepDetailService.getTestStepDetails).toHaveBeenCalled();
      });
    }));

    it('should dispatch GET_TEST_STEP_FAILURE if getTestStepDetails service fails', async(() => {
      (<Spy>testStepDetailService.getTestStepDetails).and.returnValue(Observable.throw('error'));
      effects.getTestStepDetails$.subscribe(result => {
        expect(result).toEqual(new GetTestStepDetailsFailure());
      });
    }));
  });

  describe('Get Test Step Result Type', () => {
    beforeEach(() => {
      testStepDetailService = TestBed.get(TestStepDetailService);
      (<Spy>testStepDetailService.getResultType).and.returnValue(Observable.of(resultType));
      actions = new ReplaySubject(1);
      actions.next(new GetResultTypeTestStep());
    });

    it('should catch GET_RESULT_TYPE_TEST_STEP and call getTestResultType service', async(() => {
      effects.getTestStepResultType$.subscribe( () => {
        expect(testStepDetailService.getResultType).toHaveBeenCalled();
      });
    }));

    it('should dispatch GET_RESULT_TYPE_TEST_STEP_FAILURE if getTestResultType service fails', async(() => {
      (<Spy>testStepDetailService.getResultType).and.returnValue(Observable.throw('error'));
      effects.getTestStepResultType$.subscribe( result => {
        expect(result).toEqual(new GetResultTypTestStepFailure());
      });
    }));
  });

  describe('Create TestStep', () => {
    beforeEach(() => {
      testStepDetailService = TestBed.get(TestStepDetailService);
      (<Spy>testStepDetailService.createTestStep).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new CreateTestStep());
      notifyService = TestBed.get(NotificationService);
    });

    it('should catch CREATE_TEST_STEP and call createTestStepData service', async(() => {
      effects.deleteTestStep$.subscribe( () => {
        expect(testStepDetailService.createTestStep).toHaveBeenCalled();
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));

    it('should dispatch CREATE_TEST_STEP_FAILURE if createTestStepData service fails', async(() => {
      (<Spy>testStepDetailService.createTestStep).and.returnValue(Observable.throw('error'));
      effects.createTestStep$.subscribe(result => {
        expect(result).toEqual(new CreateTestStepFailure());
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));
  });

  describe('Update TestStep', () => {
    beforeEach(() => {
      testStepDetailService = TestBed.get(TestStepDetailService);
      (<Spy>testStepDetailService.updateTestStep).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new UpdateTestStep());
      notifyService = TestBed.get(NotificationService);
    });

    it('should catch UPDATE_TEST_STEP and call updateTestStepData service', async(() => {
      effects.updateTestStep$.subscribe( () => {
        expect(testStepDetailService.updateTestStep).toHaveBeenCalled();
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));

    it('should dispatch UPDATE_TEST_STEP_FAILURE if updateTestStepData service fails', async(() => {
      (<Spy>testStepDetailService.updateTestStep).and.returnValue(Observable.of('error'));
      effects.updateTestStep$.subscribe( result => {
        expect(result).toEqual(new UpdateTestStepFailure());
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));
  });

  describe('Delete TestStep', () => {
    beforeEach(() => {
      testStepDetailService = TestBed.get(TestStepDetailService);
      (<Spy>testStepDetailService.deleteTestStep).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new DeleteTestStep(testCaseStepDetails));
      notifyService = TestBed.get(NotificationService);
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
    });

    it('should catch DELETE_TEST_STEP and call deleteTestStepData service', async(() => {
      effects.deleteTestStep$.subscribe(() => {
        expect(testStepDetailService.deleteTestStep).toHaveBeenCalled();
      });
    }));

    it('should catch DELETE_TEST_STEP_SUCCESS and call Notification service', async(() => {
      effects.deleteTestStep$.subscribe(() => {
        expect(notifyService.show).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/testCaseStep']);
      });
    }));

    it('should dispatch DELETE_TEST_STEP_FAILURE if deleteTestStepData service fails', async(() => {
      (<Spy>testStepDetailService.deleteTestStep).and.returnValue(Observable.throw('error'));
      effects.deleteTestStep$.subscribe(result => {
        expect(result).toEqual(new DeleteTestStepFailure());
      });
    }));
  });

  describe('Copy TestStep', () => {
    beforeEach(() => {
      testStepDetailService = TestBed.get(TestStepDetailService);
      (<Spy>testStepDetailService.createTestStep).and.returnValue(Observable.of());
      actions = new ReplaySubject(1);
      actions.next(new CreateTestStep());
      notifyService = TestBed.get(NotificationService);
    });

    it('should catch CREATE_TEST_STEP_COPY and call createCopyTestStepData service', async(() => {
      effects.createTestStepCopy$.subscribe( () => {
        expect(testStepDetailService.createTestStep).toHaveBeenCalled();
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));

    it('should dispatch CREATE_TEST_STEP_FAILURE if createTestStepData service fails', async(() => {
      (<Spy>testStepDetailService.createTestStep).and.returnValue(Observable.throw('error'));
      effects.createTestStep$.subscribe(result => {
        expect(result).toEqual(new CreateTestStepFailure());
        expect(notifyService.show).toHaveBeenCalled();
      });
    }));
  });

});


