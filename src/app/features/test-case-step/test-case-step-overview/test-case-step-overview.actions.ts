import { Action } from '@ngrx/store';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { TestCaseStep } from './test-case-step-overview.model';


export const testCaseStepActionTypes = {
  UPDATE_TEST_CASE_STEP_FILTER : '[TestCaseStepOverview] Update Filters',
  CLEAR_TEST_CASE_STEP_FILTERS : '[TestCaseStepOverview] Clear Filters',
  EMPTY_TEST_CASE_STEP_FILTERS : '[TestCaseStepOverview] Empty Filters',
  CLEAR_TEST_CASE_STEP_TABLE_FILTERS: '[TestCaseStepOverview] Clear Filters of Test Case Step Table',
  PAGINATE_TEST_CASE_STEP: '[TestCaseStepOverview] Pages of Test Case Step',
  LOAD_TEST_CASE_STEP : '[TestCaseStepOverview] Load Test Case Step',
  LOAD_TEST_CASE_STEP_SUCCESS : '[TestCaseStepOverview] Load Test Case Step Successfully',
  LOAD_TEST_CASE_STEP_FAILURE : '[TestCaseStepOverview] Load Test Case Step Failure',
  SORT_TEST_CASE_STEP: '[TestCaseStepOverview] Sort Test Case Step',
  SELECT_TEST_CASE_STEP: '[TestCaseStepOverview] Select Test Case Step',
  INITIAL_FILTER_ON_PAGE_LOAD: '[TestCaseStepOverview] Filter On Page Load',
  INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS: '[TestCaseStepOverview] Filter On Page Load Success'
};

export class UpdateTestCaseStepFilters implements Action {
  readonly type: string = testCaseStepActionTypes.UPDATE_TEST_CASE_STEP_FILTER;
  constructor(public filterData: object) {}
}

export class ClearTestCaseStepFilters implements Action {
  readonly type: string = testCaseStepActionTypes.CLEAR_TEST_CASE_STEP_FILTERS;
}

export class ClearTestCaseStepTableFilters implements Action {
  readonly type: string = testCaseStepActionTypes.CLEAR_TEST_CASE_STEP_TABLE_FILTERS;
}

export class EmptyTestCaseStepFilters implements Action {
  readonly type: string = testCaseStepActionTypes.EMPTY_TEST_CASE_STEP_FILTERS;
}

export class GetTestCaseSteps implements Action {
  readonly type: string = testCaseStepActionTypes.LOAD_TEST_CASE_STEP;
}

export class PaginateTestCaseStep implements Action {
  readonly type: string = testCaseStepActionTypes.PAGINATE_TEST_CASE_STEP;
  constructor(public payload: PaginationParameters) {}
}

export class GetTestCaseStepSuccess implements Action {
  readonly type: string = testCaseStepActionTypes.LOAD_TEST_CASE_STEP_SUCCESS;
  constructor(public payload: PaginatedResponse<TestCaseStep[]>) {}
}

export class GetTestCaseStepFailure implements Action {
  readonly type: string = testCaseStepActionTypes.LOAD_TEST_CASE_STEP_FAILURE;
}

export class SortTestCaseStep implements Action {
  readonly type: string = testCaseStepActionTypes.SORT_TEST_CASE_STEP;
  constructor(public payload: string) {}
}

export class SelectTestCaseStep implements Action {
  readonly type: string = testCaseStepActionTypes.SELECT_TEST_CASE_STEP;
  constructor(public testCaseStep: TestCaseStep) {}
}

export class FiltersOnPageLoad implements Action {
  readonly type: string = testCaseStepActionTypes.INITIAL_FILTER_ON_PAGE_LOAD;
  constructor(public filterData: object) {}
}

export class FiltersOnPageLoadSuccess implements Action {
  readonly type: string = testCaseStepActionTypes.INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS;
  constructor(public payload: PaginatedResponse<TestCaseStep[]>) {}
}

export type TestCaseStepOverviewActions = UpdateTestCaseStepFilters | ClearTestCaseStepFilters |
                                          ClearTestCaseStepTableFilters | GetTestCaseSteps |
                                          PaginateTestCaseStep | GetTestCaseStepSuccess |
                                          GetTestCaseStepFailure | SortTestCaseStep |
                                          SelectTestCaseStep | EmptyTestCaseStepFilters | FiltersOnPageLoad | FiltersOnPageLoadSuccess;

