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
import { TestProgress } from './test-progress-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import {
  EmptyFilters,
  LoadTestProgress,
  LoadTestProgressFailure,
  LoadTestProgressSuccess,
  testProgressOverviewActionTypes
} from './test-progress-overview.action';
import { TestProgressOverviewService } from './test-progress-overview.service';

@Injectable()
export class TestProgressOverviewEffects {
  constructor(
    private actions$: Actions,
    public testProgressOverviewService: TestProgressOverviewService) {

  }

  @Effect() getTestProgressList$: Observable<Action> = this.actions$
    .ofType(testProgressOverviewActionTypes.LOAD_TEST_PROGRESS)
    .mergeMap(() => {
      return this.testProgressOverviewService.getTestProgressList()
        .map((result: PaginatedResponse<TestProgress[]>) => new LoadTestProgressSuccess(result))
        .catch(() => Observable.of(new LoadTestProgressFailure()));
    });

  @Effect() getTestProgressListOnLoad$: Observable<Action> = this.actions$
    .ofType(testProgressOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD)
    .mergeMap(() => {
      return this.testProgressOverviewService.getTestProgressList()
        .map((result: PaginatedResponse<TestProgress[]>) => new LoadTestProgressSuccess(result))
        .catch(() => Observable.of(new LoadTestProgressFailure()));
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      testProgressOverviewActionTypes.PAGINATE,
      testProgressOverviewActionTypes.UPDATE_FILTER,
      testProgressOverviewActionTypes.SORT,
      testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_GROUP,
      testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_SITE,
      testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_ROLE,
      testProgressOverviewActionTypes.CLEAR_TABLE_FILTERS
    ]).map(() => new LoadTestProgress());

  @Effect() clearFilters$: Observable<Action> = this.actions$
    .ofType(testProgressOverviewActionTypes.CLEAR_FILTERS)
    .map(() => new EmptyFilters());
}
