import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/withLatestFrom';

import { RoutineOverviewService } from './routine-overview.service';
import { Routine } from './routine-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import {
  EmptyFilters,
  LoadRoutines,
  LoadRoutinesFailure,
  LoadRoutinesSuccess,
  routineOverviewActionTypes,
} from './routine-overview.action';

@Injectable()

export class RoutineOverviewEffects {
  constructor (private actions$: Actions, public routineOverviewService: RoutineOverviewService ) {}

  @Effect() getRoutineList$: Observable<Action> = this.actions$
    .ofType(...[
      routineOverviewActionTypes.LOAD_ROUTINES,
      routineOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD
    ]).mergeMap(() => {
      return this.routineOverviewService.getRoutineList()
        .map((result: PaginatedResponse<Routine[]>) => new LoadRoutinesSuccess(result))
        .catch(() => Observable.of(new LoadRoutinesFailure()) );
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      routineOverviewActionTypes.PAGINATE,
      routineOverviewActionTypes.UPDATE_ROUTINE_FILTER,
      routineOverviewActionTypes.SORT,
      routineOverviewActionTypes.LOAD_ALL_ROUTINE,
      routineOverviewActionTypes.LOAD_TYPE_OF_ROUTINE,
      routineOverviewActionTypes.CLEAR_ROUTINE_TABLE_FILTERS
    ]).map(() => new LoadRoutines());
  @Effect() clearFilters$: Observable<Action> = this.actions$
    .ofType(routineOverviewActionTypes.CLEAR_ROUTINE_FILTERS)
    .map(() => new EmptyFilters());
}
