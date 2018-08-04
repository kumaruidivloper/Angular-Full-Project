import { async, TestBed } from '@angular/core/testing';
import { TestOverviewEffects } from './test-overview.effects';
import { TestOverviewService } from './test-overview.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { Links } from '../../../core/interfaces/link.i';
import { Store } from '@ngrx/store';
import { TestOverviewState } from './test-overview.reducer';
import 'rxjs/add/observable/throw';
import { LoadTests, LoadTestsFailure } from './test-overview.actions';
import Spy = jasmine.Spy;

describe('TestOverview Effects', () => {
  let actions: ReplaySubject<any>;
  let effects: TestOverviewEffects;
  let testOverviewService: TestOverviewService;
  let store: Store<TestOverviewState>;

  const test: any = {
    'data': [
      {
        'testId': '123',
        'name': '1:PVT BASE - P2952',
        'testObjectField': '2017-11-01 :PVT BASE - P2952',
        'status': 'INITIATED',
        'testLeader': 'test',
        'wbs': 'wbs1',
        'project': 'P2952',
        'site': 'GOT',
        'userGroup': 'PVT',
      }
    ],
    'links': {} as Links,
    'pagination': {} as PaginationParameters
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestOverviewEffects,
        provideMockActions(() => actions),
        mockService(TestOverviewService),
        mockService(SessionStorageService),
        MockStoreProvider,
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(TestOverviewEffects);
    store = TestBed.get(Store);
  });

  it('should exist', () => {
    expect(effects).toBeTruthy();
  });
  describe('Get Tests', () => {
    beforeEach(() => {
      testOverviewService = TestBed.get(TestOverviewService);
      (<Spy>testOverviewService.getTestList).and.returnValue(Observable.of(test));
      actions = new ReplaySubject(1);
      actions.next(new LoadTests());
    });

    it('should catch LOAD_TEST and call getTestList service', async(() => {
      effects.getTestList$.subscribe(() => {
        expect(testOverviewService.getTestList).toHaveBeenCalled();
      });
    }));
    it('should dispatch LOAD_TESTS_FAILURE if getTestList service fails', async(() => {
      (<Spy>testOverviewService.getTestList).and.returnValue(Observable.throw('error'));
      effects.getTestList$.subscribe(result => {
        expect(result).toEqual(new LoadTestsFailure());
      });
    }));

  });
});
