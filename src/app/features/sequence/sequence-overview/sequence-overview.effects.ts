import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';

import { SequenceOverviewService } from './sequence-overview.service';
import { Sequence } from './sequence-overview.model';
import {
  LoadSequences,
  LoadSequencesFailure,
  LoadSequencesSuccess,
  SequenceOverviewActions,
} from './sequence-overview.action';

@Injectable()
export class SequenceOverviewEffects {
  constructor(
    private actions$: Actions,
    public sequenceOverviewService: SequenceOverviewService) {
  }

  @Effect() loadSequences$: Observable<Action> = this.actions$
    .ofType(SequenceOverviewActions.LOAD_SEQUENCES)
    .mergeMap(() => {
      return this.sequenceOverviewService.getSequencesList()
        .map((result: PaginatedResponse<Sequence[]>) => new LoadSequencesSuccess(result))
        .catch(() => Observable.of(new LoadSequencesFailure()));
    });

  @Effect() getSequenceListOnLoad$: Observable<Action> = this.actions$
    .ofType(SequenceOverviewActions.INITIAL_FILTER_ON_PAGE_LOAD)
    .mergeMap(() => {
      return this.sequenceOverviewService.getSequencesList()
        .map((result: PaginatedResponse<Sequence[]>) => new LoadSequencesSuccess(result))
        .catch(() => Observable.of(new LoadSequencesFailure()));
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      SequenceOverviewActions.PAGINATE,
      SequenceOverviewActions.UPDATE_SEQUENCE_FILTER,
      SequenceOverviewActions.SORT,
      SequenceOverviewActions.LOAD_ALL_SEQUENCE,
      SequenceOverviewActions.LOAD_TYPE_OF_SEQUENCE,
      SequenceOverviewActions.CLEAR_SEQUENCE_TABLE_FILTERS,
    ]).map(() => new LoadSequences());
}
