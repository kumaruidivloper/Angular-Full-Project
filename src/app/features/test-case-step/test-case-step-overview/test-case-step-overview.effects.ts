import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import {
  EmptyTestCaseStepFilters,
  GetTestCaseStepFailure,
  GetTestCaseSteps,
  GetTestCaseStepSuccess,
  testCaseStepActionTypes
} from './test-case-step-overview.actions';

import { TestCaseStep } from './test-case-step-overview.model';

import { TestCaseStepOverviewService } from './test-case-step-overview.service';

@Injectable()
export class TestCaseStepOverviewEffects {
  constructor(
    private actions$: Actions,
    public testCaseStepOverviewService: TestCaseStepOverviewService) {
  }

  @Effect() getTestCaseStepList$: Observable<Action> = this.actions$
    .ofType(...[
      testCaseStepActionTypes.LOAD_TEST_CASE_STEP,
      testCaseStepActionTypes.INITIAL_FILTER_ON_PAGE_LOAD
    ]).mergeMap(() => {
      return this.testCaseStepOverviewService.getTestCaseStepList()
        .map((result: PaginatedResponse<TestCaseStep[]>) => new GetTestCaseStepSuccess(result))
        .catch(() => Observable.of(new GetTestCaseStepFailure()));
        });
  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      testCaseStepActionTypes.PAGINATE_TEST_CASE_STEP,
      testCaseStepActionTypes.UPDATE_TEST_CASE_STEP_FILTER,
      testCaseStepActionTypes.CLEAR_TEST_CASE_STEP_TABLE_FILTERS,
      testCaseStepActionTypes.SORT_TEST_CASE_STEP
    ])
    .map(() => {
      return new GetTestCaseSteps();
    });

  @Effect() clearFilter$: Observable<Action> = this.actions$
    .ofType(testCaseStepActionTypes.CLEAR_TEST_CASE_STEP_FILTERS)
    .map(() => new EmptyTestCaseStepFilters());
}
