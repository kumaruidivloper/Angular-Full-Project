import { async, TestBed } from '@angular/core/testing';
import { ProcedureOverviewEffects } from './procedure-overview.effects';
import { ProcedureOverviewService } from './procedure-overview.service';
import { ProcedureOverviewState } from './procedure-overview.reducer';
import { Procedure } from './procedure-overview.model';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { Links } from '../../../core/interfaces/link.i';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/throw';
import { LoadProcedures, LoadProceduresFailure } from './procedure-overview.actions';

describe('Procedure Overview Effects', () => {
  let actions: ReplaySubject<any>;
  let effects: ProcedureOverviewEffects;
  let procedureOverviewService: ProcedureOverviewService;
  let store: Store<ProcedureOverviewState>;

  const procedure: PaginatedResponse<Procedure[]> = {
    'data': [
      {
        'id': 17,
        'type': 'STANDARD',
        'name': 'String',
        'noOfCycles': 0,
        'description': 'String',
        'basedOn': null,
        'changeInfo': {
          'created': 1008581447000,
          'lastChanged': 1008581447000,
          'changedByUserId': 'A266188',
          'changedByFirstName': 'John',
          'changedByLastName': 'Doe'
        },
        'changed': null,
        'category': 'STANDARD',
        'testOverView': null
      }
    ],
    'links': {} as Links,
    'pagination': {} as PaginationParameters
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProcedureOverviewEffects,
        provideMockActions(() => actions),
        mockService(ProcedureOverviewService),
        mockService(SessionStorageService),
        MockStoreProvider,
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(ProcedureOverviewEffects);
    store = TestBed.get(Store);
  });

  it('should exist', () => {
    expect(effects).toBeTruthy();
  });
  describe('Get Procedures', () => {
    beforeEach(() => {
      procedureOverviewService = TestBed.get(ProcedureOverviewService);
      (<jasmine.Spy>procedureOverviewService.getProcedureList).and.returnValue(Observable.of(procedure));
      actions = new ReplaySubject(1);
      actions.next(new LoadProcedures());
    });

    it('should catch LOAD_PROCEDURES and call getProcedureList service', async(() => {
      effects.getProcedureList$.subscribe(() => {
        expect(procedureOverviewService.getProcedureList).toHaveBeenCalled();
      });
    }));
    it('should dispatch LOAD_PROCEDURES_FAILURE if getProcedureList service fails', async(() => {
      (<jasmine.Spy>procedureOverviewService.getProcedureList).and.returnValue(Observable.throw('error'));
      effects.getProcedureList$.subscribe(result => {
        expect(result).toEqual(new LoadProceduresFailure());
      });
    }));

  });

});
