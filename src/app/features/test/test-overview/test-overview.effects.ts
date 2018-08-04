import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { TestOverviewService } from './test-overview.service';
import { Test } from './test-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import {
  CLEAR_FILTERS,
  CLEAR_TABLE_FILTERS,
  EmptyFilters,
  INITIAL_FILTER_ON_PAGE_LOAD,
  LOAD_TESTS,
  LoadTests,
  LoadTestsFailure,
  LoadTestsSuccess,
  PAGINATE,
  SORT,
  UPDATE_FILTER,
  UPDATE_SELECTED_TEST_GROUP,
  UPDATE_SELECTED_TEST_SITE
} from './test-overview.actions';

@Injectable()
export class TestOverviewEffects {
  constructor(
    private actions$: Actions,
    public testOverViewService: TestOverviewService) {
  }

  @Effect() getTestList$: Observable<Action> = this.actions$
    .ofType(LOAD_TESTS)
    .mergeMap(() => {
      return this.testOverViewService.getTestList()
        .map((result: PaginatedResponse<Test[]>) => new LoadTestsSuccess(result))
        .catch(() => Observable.of(new LoadTestsFailure()));
    });
  @Effect() getTestListOnLoad$: Observable<Action> = this.actions$
    .ofType(INITIAL_FILTER_ON_PAGE_LOAD)
    .mergeMap(() => {
      return this.testOverViewService.getTestList()
        .map((result: PaginatedResponse<Test[]>) => new LoadTestsSuccess(result))
        .catch(() => Observable.of(new LoadTestsFailure()));
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      PAGINATE,
      UPDATE_FILTER,
      SORT,
      UPDATE_SELECTED_TEST_GROUP,
      UPDATE_SELECTED_TEST_SITE,
      CLEAR_TABLE_FILTERS
    ]).map(() => new LoadTests());

  @Effect() clearFilters$: Observable<Action> = this.actions$
    .ofType(CLEAR_FILTERS)
    .map(() => new EmptyFilters());
}
