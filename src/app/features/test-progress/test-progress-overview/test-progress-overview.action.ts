import { Action } from '@ngrx/store';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { UserGroup, UserRole, UserSite } from '../../../core/services/user/user.model';
import { TestProgress } from './test-progress-overview.model';

export const testProgressOverviewActionTypes = {
  UPDATE_FILTER: '[TestProgressOverview] Update Filters',
  CLEAR_FILTERS: '[TestProgressOverview] Clear Filters',
  CLEAR_TABLE_FILTERS: '[TestProgressOverview] Clear Filters of Table',
  EMPTY_FILTERS: '[TestProgressOverview] Empty Filters',
  DELETE_SELECTED: '[TestProgressOverview] Delete Selected',
  LOAD_TEST_PROGRESS: '[TestProgressOverview] Load Test Progress',
  LOAD_TEST_PROGRESS_SUCCESS: '[TestProgressOverview] Load Test Progress Successfully',
  LOAD_TEST_PROGRESS_FAILURE: '[TestProgressOverview] Load Test Progress Failure',
  DELETE_TESTS_SUCCESS: '[TestProgressOverview] Delete Test Success',
  SORT: '[TestProgressOverview] Sort Tests',
  PAGINATE: '[TestProgressOverview] Pages of Tests',
  SELECT_TEST: '[TestProgressOverview] Select Test',
  UPDATE_SELECTED_TEST_SITE: '[TestProgressOverview] Update Selected Test Site',
  UPDATE_SELECTED_TEST_GROUP: '[TestProgressOverview] Update Selected Test Group',
  UPDATE_SELECTED_TEST_ROLE: '[TestProgressOverview] Update Selected Test Role',
  INITIAL_FILTER_ON_PAGE_LOAD: '[TestProgressOverview] Filter On Page Load',
  INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS: '[TestProgressOverview] Filter On Page Load Success'
};

export class UpdateFilters implements Action {
  readonly type: string = testProgressOverviewActionTypes.UPDATE_FILTER;
  constructor(public payload: any) {}
}

export class ClearFilters implements Action {
  readonly type: string = testProgressOverviewActionTypes.CLEAR_FILTERS;
}
export class ClearTableFilters implements Action {
  readonly type: string = testProgressOverviewActionTypes.CLEAR_TABLE_FILTERS;
}

export class DeleteSelected implements Action {
  readonly type: string = testProgressOverviewActionTypes.DELETE_SELECTED;
  constructor(public payload: TestProgress[]) {}
}

export class LoadTestProgress implements Action {
  readonly type: string = testProgressOverviewActionTypes.LOAD_TEST_PROGRESS;
}

export class LoadTestProgressSuccess implements Action {
  readonly type: string = testProgressOverviewActionTypes.LOAD_TEST_PROGRESS_SUCCESS;
  constructor(public payload: PaginatedResponse<TestProgress[]>) {}
}

export class LoadTestProgressFailure implements Action {
  readonly type: string = testProgressOverviewActionTypes.LOAD_TEST_PROGRESS_FAILURE;
}

export class Sort implements Action {
  readonly type: string = testProgressOverviewActionTypes.SORT;
  constructor(public payload: string) {}
}

export class Paginate implements Action {
  readonly type: string = testProgressOverviewActionTypes.PAGINATE;
  constructor(public payload: PaginationParameters) {}
}

export class SelectTest implements Action {
  readonly type: string = testProgressOverviewActionTypes.SELECT_TEST;
  constructor(public testProgress: TestProgress) {}
}

export class UpdateSelectedTestSite implements Action {
  readonly type: string = testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_SITE;
  constructor(public site: UserSite) {}
}

export class UpdateSelectedTestGroup implements Action {
  readonly type: string = testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_GROUP;
  constructor(public group: UserGroup) {}
}
export class UpdateSelectedTestRole implements Action {
  readonly type: string = testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_GROUP;
  constructor(public role: UserRole) {}
}

export class EmptyFilters implements Action {
  readonly type: string = testProgressOverviewActionTypes.EMPTY_FILTERS;
}
export class FiltersOnPageLoad implements Action {
  readonly type: string = testProgressOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD;
  constructor(public filterData: any) {}
}
export class FiltersOnPageLoadSuccess implements Action {
  readonly type: string = testProgressOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS;
  constructor(public payload: PaginatedResponse<TestProgress[]>) {}
}
export type TestProgressActions = UpdateFilters | ClearFilters | DeleteSelected | LoadTestProgress
  | LoadTestProgressSuccess | LoadTestProgressFailure | Sort | Paginate | SelectTest
  | UpdateSelectedTestSite | UpdateSelectedTestGroup | ClearTableFilters | EmptyFilters
  | FiltersOnPageLoad | FiltersOnPageLoadSuccess;




