import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep, omitBy, pick } from 'lodash';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import { UserGroup, UserRole, UserSite } from '../../../core/services/user/user.model';

import {
  DeleteSelected,
  FiltersOnPageLoad,
  LoadTestProgressSuccess,
  Paginate,
  SelectTest,
  Sort,
  TestProgressActions,
  testProgressOverviewActionTypes,
  UpdateFilters,
  UpdateSelectedTestGroup,
  UpdateSelectedTestRole,
  UpdateSelectedTestSite
} from './test-progress-overview.action';

import { TestProgress } from './test-progress-overview.model';

export const testProgressOverviewFeatureName = 'TestProgressOverview';

export interface TestProgressOverviewState {
  testProgress: TestProgress[];
  filters: any;
  pagination: PaginationParameters;
  sort?: SortOptions;
  selectedTest: TestProgress;
  selectedTestSite: UserSite;
  selectedTestGroup: UserGroup;
  selectedTestRole: UserRole;
  initialFilter: any;
}

export const testProgressOverviewDefaultState: TestProgressOverviewState = {
  testProgress: [],
  filters: {},
  pagination: {
    page: 1,
    pageSize: 20
  },
  selectedTest: null,
  selectedTestSite: null,
  selectedTestGroup: null,
  selectedTestRole: null,
  initialFilter: {}
};


export function testProgressOverviewReducer(
  state: TestProgressOverviewState = testProgressOverviewDefaultState,
  action: TestProgressActions): TestProgressOverviewState {

  switch (action.type) {
    case testProgressOverviewActionTypes.LOAD_TEST_PROGRESS_FAILURE:
      return <TestProgressOverviewState>{
        ...state,
        testProgress: testProgressOverviewDefaultState.testProgress,
        pagination: testProgressOverviewDefaultState.pagination
      };
    case testProgressOverviewActionTypes.LOAD_TEST_PROGRESS_SUCCESS:
    case testProgressOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS:
      return <TestProgressOverviewState>{
        ...state,
        testProgress: (<LoadTestProgressSuccess> action).payload.data,
        pagination: (<LoadTestProgressSuccess> action).payload.pagination,
        initialFilter: {}
      };
    case testProgressOverviewActionTypes.DELETE_SELECTED:
      return <TestProgressOverviewState>{ ...state, tests: (<DeleteSelected> action).payload };
    case testProgressOverviewActionTypes.UPDATE_FILTER:
      const filterToUpdate = (<UpdateFilters>action).payload;
      return <TestProgressOverviewState>{
        ...state,
        filters: omitBy(filterToUpdate, value => value === '')
      };
    case testProgressOverviewActionTypes.SORT:
      const sort = getNextSort((<Sort>action).payload, state.sort);

      return <TestProgressOverviewState>{
        ...state,
        sort: sort
      };
    case testProgressOverviewActionTypes.PAGINATE:
      return <TestProgressOverviewState>{
        ...state,
        pagination: (<Paginate>action).payload
      };
    case testProgressOverviewActionTypes.CLEAR_TABLE_FILTERS:
      const filtersToRetain = pick(state.filters, ['siteId', 'groupId']);
      return <TestProgressOverviewState>{
        ...state,
        filters: filtersToRetain
      };
    case testProgressOverviewActionTypes.EMPTY_FILTERS:
      return <TestProgressOverviewState>{
        ...state,
        filters: {},
        initialFilters: {},
        testProgress: []
      };
    case testProgressOverviewActionTypes.SELECT_TEST:
      return {
        ...state,
        selectedTest: cloneDeep((<SelectTest>action).testProgress)
      };
    case testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_SITE:
      return {
        ...state,
        selectedTestSite: (<UpdateSelectedTestSite>action).site
      };
    case testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_ROLE:
      return {
        ...state,
        selectedTestRole: (<UpdateSelectedTestRole>action).role
      };
    case testProgressOverviewActionTypes.UPDATE_SELECTED_TEST_GROUP:
      return {
        ...state,
        selectedTestGroup: (<UpdateSelectedTestGroup>action).group
      };
    case testProgressOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD:
      return {
        ...state,
        initialFilter: (<FiltersOnPageLoad>action).filterData
      };
    default:
      return state;
  }
}

export function getNextSort(field: string, sort: SortOptions): SortOptions | undefined {
  if (sort && sort.field === field) {
    const nextSort: SortDirection = (sort.direction + 1) % 3;
    return SortDirection[nextSort] && {
      field: field,
      direction: nextSort
    };
  }

  return {
    field: field,
    direction: SortDirection.ASC
  };
}


export const getTests = (state: TestProgressOverviewState) => state.testProgress;
export const getSort = (state: TestProgressOverviewState) => state.sort;
export const getFilters = (state: TestProgressOverviewState) => state.filters;
export const getPagination = (state: TestProgressOverviewState) => state.pagination;
export const getSelectedTestSite = (state: TestProgressOverviewState) => state.selectedTestSite;
export const getSelectedTestGroup = (state: TestProgressOverviewState) => state.selectedTestGroup;
export const getSelectedTestRole = (state: TestProgressOverviewState) => state.selectedTestRole;
export const getInitialFilter = (state: TestProgressOverviewState) => state.initialFilter;

export const stateSelector = createFeatureSelector<TestProgressOverviewState>(testProgressOverviewFeatureName);
export const testsSelector = createSelector(stateSelector, getTests);
export const sortSelector = createSelector(stateSelector, getSort);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const paginationSelector = createSelector(stateSelector, getPagination);
export const selectedTestSiteSelector = createSelector(stateSelector, getSelectedTestSite);
export const selectedTestGroupSelector = createSelector(stateSelector, getSelectedTestGroup);
export const selectedTestRoleSelector = createSelector(stateSelector, getSelectedTestRole);
export const initialFilterSelector = createSelector(stateSelector, getInitialFilter);





