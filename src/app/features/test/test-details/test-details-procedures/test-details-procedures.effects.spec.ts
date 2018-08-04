import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { Links } from '../../../../core/interfaces/link.i';
import { PaginatedResponse } from '../../../../core/interfaces/paginated-response.i';
import { PaginationParameters } from '../../../../core/interfaces/pagination-params.i';
import { ProceduresService } from '../../../procedure/procedures.service';
import { TestProcedure } from '../test-details.model';
import { LoadProcedure, LoadProcedureFailure } from './test-details-procedures.actions';
import { TestDetailsProceduresEffects } from './test-details-procedures.effects';
import { TestDetailsProceduresState } from './test-details-procedures.reducer';

describe('Test Details Procedures Effects', () => {
  let actions: ReplaySubject<any>;
  let effects: TestDetailsProceduresEffects;
  let store: Store<TestDetailsProceduresState>;
  let proceduresService: ProceduresService;

  const testProcedure: PaginatedResponse<TestProcedure[]> = {
    'data': [
      {
        'id': 12,
        'type': 'STANDARD',
        'name': 'String',
        'description': 'String',
        'basedOn': 'string',
        'changeInfo': {
          'created': 1008581447000,
          'lastChanged': 1008581447000,
          'changedByUserId': 'A266188',
          'changedByFirstName': 'John',
          'changedByLastName': 'Doe'
        },
        'changed': 'string',
        'category': 'STANDARD',
        'site': 'AGO',
        'userGroup': 'RT',
        'testOverView': 'string'
      }
    ],
    'links': {} as Links,
    'pagination': {} as PaginationParameters
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestDetailsProceduresEffects,
        provideMockActions(() => actions),
        mockService(ProceduresService),
        MockStoreProvider
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(TestDetailsProceduresEffects);
    store = TestBed.get(Store);
  });

  beforeEach(() => {
    proceduresService = TestBed.get(ProceduresService);
    (<jasmine.Spy>proceduresService.loadProcedures).and.returnValue(Observable.of(testProcedure));
    actions = new ReplaySubject(1);
    actions.next(new LoadProcedure());
  });

  it('should catch GET_PROCEDURE and call getProcedure service', async(() => {
    effects.getProcedure$.subscribe(() => {
      expect(proceduresService.loadProcedures).toHaveBeenCalled();
    });
  }));
  it('should dispatch GET_PROCEDURE_FAILURE if getProcedure service fails', async(() => {
    (<jasmine.Spy>proceduresService.loadProcedures).and.returnValue(Observable.throw('error'));
    effects.getProcedure$.subscribe(result => {
      expect(result).toEqual(new LoadProcedureFailure());
    });
  }));


//  @TODO missing test coverage
});
