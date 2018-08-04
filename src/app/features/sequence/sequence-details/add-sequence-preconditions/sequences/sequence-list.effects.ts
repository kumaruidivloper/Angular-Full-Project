import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Action, Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import {
  DeSelectSequenceList,
  EmptySequenceListFilters,
  LoadAntiClockwiseSequenceList,
  LoadAntiClockwiseSequenceListFailure,
  LoadAntiClockwiseSequenceListSuccess,
  LoadClockwiseSequenceList,
  LoadClockwiseSequenceListFailure,
  LoadClockwiseSequenceListSuccess,
  LoadSequenceList,
  LoadSequenceListFailure,
  LoadSequenceListSuccess,
  SelectSequenceList,
  sequenceListingActionsTypes,
  UpdateSelectedSequence,
  UpdateSequenceListFilters
} from './sequence-list.actions';
import { PaginatedResponse } from '../../../../../core/interfaces/paginated-response.i';
import { Sequence } from '../../../sequence-overview/sequence-overview.model';
import { SequenceListService } from './sequence-list.service';
import { selectedSequenceListSelector, SequenceListingState } from './sequence-list.reducer';

@Injectable()
export class SequenceListingEffects {
  constructor(
    private actions$: Actions,
    public sequenceListingService: SequenceListService,
    private store: Store<SequenceListingState>) {
  }

  @Effect() getSequenceList$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.LOAD_SEQUENCES)
    .mergeMap(() => {
      return this.sequenceListingService.getSequencesList()
        .map((result: PaginatedResponse<Sequence[]>) => new LoadSequenceListSuccess(result))
        .catch(() => Observable.of(new LoadSequenceListFailure()));
    });

  @Effect() getClcokwiseSequenceList$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.LOAD_SEQUENCES_CLOCKWISE)
    .mergeMap(() => {
      return this.sequenceListingService.getClockwiseSequencesList()
        .map((result: PaginatedResponse<Sequence[]>) => new LoadClockwiseSequenceListSuccess(result))
        .catch(() => Observable.of(new LoadClockwiseSequenceListFailure()));
    });

  @Effect() getAntiClockwiseSequenceList$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.LOAD_SEQUENCES_ANTI_CLOCKWISE)
    .mergeMap(() => {
      return this.sequenceListingService.getAntiClockwiseSequencesList()
        .map((result: PaginatedResponse<Sequence[]>) => new LoadAntiClockwiseSequenceListSuccess(result))
        .catch(() => Observable.of(new LoadAntiClockwiseSequenceListFailure()));
    });

  @Effect() paginationFilter$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.PAGINATE)
    .map(() => new LoadSequenceList());

 @Effect() clockwisePaginationFilter$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.PAGINATE_CLOCKWISE)
   .map(() => new LoadClockwiseSequenceList());

 @Effect() antiClockwisePaginationFilter$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.PAGINATE_ANTI_CLOCKWISE)
   .map(() => new LoadAntiClockwiseSequenceList());

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.UPDATE_SEQUENCE_FILTER)
    .map((action) => {
      const fromPage = (<UpdateSequenceListFilters>action).fromPage;
      if ( fromPage === 'clockwise') {
        return new LoadClockwiseSequenceList();
      } else if ( fromPage === 'anti-clockwise') {
        return new LoadAntiClockwiseSequenceList();
      } else {
        return new LoadSequenceList();
      }

    });


  @Effect() clearFilters$: Observable<Action> = this.actions$
    .ofType(sequenceListingActionsTypes.CLEAR_SEQUENCE_FILTERS)
    .map(() => new EmptySequenceListFilters());

  @Effect() selectSequence$: Observable<Action> = this.actions$
    .ofType( sequenceListingActionsTypes.SELECT_SEQUENCE)
    .withLatestFrom(this.store.select(selectedSequenceListSelector))
    .map(([action, selectedSequence]) => {
      const item = cloneDeep(selectedSequence);
      item.push((<SelectSequenceList>action).sequence);
      return new UpdateSelectedSequence(item);
    });

  @Effect() deselectSequence$: Observable<Action> = this.actions$
    .ofType( sequenceListingActionsTypes.DESELECT_SEQUENCE)
    .withLatestFrom(this.store.select(selectedSequenceListSelector))
    .map(([action, selectedSequence]) => {
      const sequenceID = (<DeSelectSequenceList>action).sequenceID;
      const sequence = selectedSequence.filter(item => item.id !== sequenceID);
      return new UpdateSelectedSequence(sequence);
    });
}
