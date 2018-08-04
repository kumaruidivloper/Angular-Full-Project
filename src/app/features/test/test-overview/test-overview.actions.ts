import { Action } from '@ngrx/store';
import { Test } from './test-overview.model';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';

export const UPDATE_FILTER = '[TestOverview] Update Filters';
export const CLEAR_FILTERS = '[TestOverview] Clear Filters';
export const CLEAR_TABLE_FILTERS = '[TestOverview] Clear Filters of Table';
export const EMPTY_FILTERS = '[TestOverview] Empty Filters';
export const DELETE_SELECTED = '[TestOverview] Delete Selected';
export const LOAD_TESTS = '[TestOverview] Load Tests';
export const LOAD_TESTS_SUCCESS = '[TestOverview] Load Tests Successfully';
export const LOAD_TESTS_FAILURE = '[TestOverview] Load Tests Failure';
export const DELETE_TESTS_SUCCESS = '[TestOverview] Delete Test Success';
export const SORT = '[TestOverview] Sort Tests';
export const PAGINATE = '[TestOverview] Pages of Tests';
export const SELECT_TEST = '[TestOverview] Select Test';
export const UPDATE_SELECTED_TEST_SITE = '[TestOverview] Update Selected Test Site';
export const UPDATE_SELECTED_TEST_GROUP = '[TestOverview] Update Selected Test Group';
export const INITIAL_FILTER_ON_PAGE_LOAD = '[TestOverview] Filter On Page Load';
export const INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS = '[TestOverview] Filter On Page Load Success';

export class UpdateFilters implements Action {
  readonly type: string = UPDATE_FILTER;
  constructor(public payload: any) {}
}

export class ClearFilters implements Action {
  readonly type: string = CLEAR_FILTERS;
}
export class ClearTableFilters implements Action {
  readonly type: string = CLEAR_TABLE_FILTERS;
}

export class DeleteSelected implements Action {
  readonly type: string = DELETE_SELECTED;
  constructor(public payload: Test[]) {}
}

export class LoadTests implements Action {
  readonly type: string = LOAD_TESTS;
}

export class LoadTestsSuccess implements Action {
  readonly type: string = LOAD_TESTS_SUCCESS;
  constructor(public payload: PaginatedResponse<Test[]>) {}
}

export class LoadTestsFailure implements Action {
  readonly type: string = LOAD_TESTS_FAILURE;
}

export class Sort implements Action {
  readonly type: string = SORT;
  constructor(public payload: string) {}
}

export class Paginate implements Action {
  readonly type: string = PAGINATE;
  constructor(public payload: PaginationParameters) {}
}

export class SelectTest implements Action {
  readonly type: string = SELECT_TEST;
  constructor(public test: Test) {}
}

export class UpdateSelectedTestSite implements Action {
  readonly type: string = UPDATE_SELECTED_TEST_SITE;
  constructor(public site: UserSite) {}
}

export class UpdateSelectedTestGroup implements Action {
  readonly type: string = UPDATE_SELECTED_TEST_GROUP;
  constructor(public group: UserGroup) {}
}
export class EmptyFilters implements Action {
  readonly type: string = EMPTY_FILTERS;
}
export class FiltersOnPageLoad implements Action {
  readonly type: string = INITIAL_FILTER_ON_PAGE_LOAD;
  constructor(public filterData: any) {}
}
export class FiltersOnPageLoadSuccess implements Action {
  readonly type: string = INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS;
  constructor(public payload: PaginatedResponse<Test[]>) {}
}
export type TestOverviewActions = UpdateFilters | ClearFilters | DeleteSelected | LoadTests | LoadTestsSuccess | LoadTestsFailure | Sort
  | Paginate | SelectTest | UpdateSelectedTestSite | UpdateSelectedTestGroup | ClearTableFilters | EmptyFilters | FiltersOnPageLoad
  | FiltersOnPageLoadSuccess;


