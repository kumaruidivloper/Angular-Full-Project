import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { mockService } from '../../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { LoadSequences, LoadSequencesFailure } from './sequence-overview.action';
import { SequenceOverviewEffects } from './sequence-overview.effects';
import { Sequence } from './sequence-overview.model';
import { SequenceOverviewState } from './sequence-overview.reducer';
import { SequenceOverviewService } from './sequence-overview.service';

describe('Sequence Overview Effects', () => {
  let actions: ReplaySubject<any>;
  let effects: SequenceOverviewEffects;
  let sequenceOverviewService: SequenceOverviewService;
  let store: Store<SequenceOverviewState>;

  const sequence: PaginatedResponse<Sequence[]> = {
    data: [
      {
        id: 1,
        name: 'PVTCHECK1',
        category: 'STANDARD',
        privateSequence: true,
        noOfTestCases: 12,
        description: 'This is Dummy Seqence',
        sequenceSite: 'GOT',
        sequenceUserGroup: 'PVT'
      }
    ],
    links: {
      next: {
        page: 2,
        pageSize: 20
      },
      self: {
        page: 1,
        pageSize: 20
      }
    },
    pagination: {
      page: 1,
      pageSize: 20,
      numberOfPages: 1
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SequenceOverviewEffects,
        provideMockActions(() => actions),
        mockService(SequenceOverviewService),
        mockService(SessionStorageService),
        MockStoreProvider,
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(SequenceOverviewEffects);
    store = TestBed.get(Store);
  });

  it('should exist', () => {
    expect(effects).toBeTruthy();
  });

  describe('Get Procedures', () => {
    beforeEach(() => {
      sequenceOverviewService = TestBed.get(SequenceOverviewService);
      (<jasmine.Spy>sequenceOverviewService.getSequencesList).and.returnValue(Observable.of(sequence));
      actions = new ReplaySubject(1);
      actions.next(new LoadSequences());
    });

    it('should catch LOAD_SEQUENCES and call getProcedureList service', async(() => {
      effects.loadSequences$.subscribe(() => {
        expect(sequenceOverviewService.getSequencesList).toHaveBeenCalled();
      });
    }));

    it('should catch LOAD_SEQUENCES and call getProcedureList service', async(() => {
        effects.changeParameters$.subscribe(() => {
          expect(sequenceOverviewService.getSequencesList).toHaveBeenCalled();
        });
      }));

    it('should dispatch LOAD_SEQUENCES_FAILURE if getSequencesList service fails', async(() => {
      (<jasmine.Spy>sequenceOverviewService.getSequencesList).and.returnValue(Observable.throw('error'));
      effects.loadSequences$.subscribe(result => {
        expect(result).toEqual(new LoadSequencesFailure());
      });
    }));

  });
});
