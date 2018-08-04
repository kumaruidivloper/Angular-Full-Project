import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep, omitBy, pick } from 'lodash';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';
import {
  CLEAR_TABLE_FILTERS,
  DELETE_SELECTED,
  DeleteSelected,
  EMPTY_FILTERS,
  FiltersOnPageLoad,
  INITIAL_FILTER_ON_PAGE_LOAD,
  INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS,
  LOAD_TESTS_FAILURE,
  LOAD_TESTS_SUCCESS,
  LoadTestsSuccess,
  PAGINATE,
  Paginate,
  SELECT_TEST,
  SelectTest,
  SORT,
  Sort,
  TestOverviewActions,
  UPDATE_FILTER,
  UPDATE_SELECTED_TEST_GROUP,
  UPDATE_SELECTED_TEST_SITE,
  UpdateFilters,
  UpdateSelectedTestGroup,
  UpdateSelectedTestSite
} from './test-overview.actions';
import { Test } from './test-overview.model';

export const testOverviewFeatureName = 'TestOverview';

export interface TestOverviewState {
  tests: Test[];
  filters: any;
  pagination: PaginationParameters;
  sort?: SortOptions;
  selectedTest: Test;
  selectedTestSite: UserSite;
  selectedTestGroup: UserGroup;
  initialFilter: any;
}

export const testOverviewDefaultState: TestOverviewState = {
  tests: [],
  filters: {},
  pagination: {
    page: 1,
    pageSize: 20
  },
  selectedTest: null,
  selectedTestSite: null,
  selectedTestGroup: null,
  initialFilter: {}
};

export function testOverviewReducer(
                  state: TestOverviewState = testOverviewDefaultState,
                  action: TestOverviewActions): TestOverviewState {

  switch (action.type) {
    case LOAD_TESTS_FAILURE:
      return <TestOverviewState>{
        ...state,
        tests: testOverviewDefaultState.tests,
        pagination: testOverviewDefaultState.pagination
      };
    case LOAD_TESTS_SUCCESS:
    case INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS:
      return <TestOverviewState>{
        ...state,
        tests: (<LoadTestsSuccess> action).payload.data,
        pagination: (<LoadTestsSuccess> action).payload.pagination,
        initialFilter: {}
      };
    case DELETE_SELECTED:
      return <TestOverviewState>{ ...state, tests: (<DeleteSelected> action).payload };
    case UPDATE_FILTER:
      const filterToUpdate = (<UpdateFilters>action).payload;
      return <TestOverviewState>{
        ...state,
        filters: omitBy(filterToUpdate, value => value === '')
      };
    case SORT:
      const sort = getNextSort((<Sort>action).payload, state.sort);

      return <TestOverviewState>{
        ...state,
        sort: sort
      };
    case PAGINATE:
      return <TestOverviewState>{
        ...state,
        pagination: (<Paginate>action).payload
      };
    case CLEAR_TABLE_FILTERS:
      const filtersToRetain = pick(state.filters, ['siteId', 'groupId']);
      return <TestOverviewState>{
        ...state,
        filters: filtersToRetain
      };
    case EMPTY_FILTERS:
      return <TestOverviewState>{
        ...state,
        filters: {},
        initialFilters: {},
        tests: []
      };
    case SELECT_TEST:
      return {
        ...state,
        selectedTest: cloneDeep((<SelectTest>action).test)
      };
    case UPDATE_SELECTED_TEST_SITE:
      return {
        ...state,
        selectedTestSite: (<UpdateSelectedTestSite>action).site
      };
    case UPDATE_SELECTED_TEST_GROUP:
      return {
        ...state,
        selectedTestGroup: (<UpdateSelectedTestGroup>action).group
      };
    case INITIAL_FILTER_ON_PAGE_LOAD:
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

export const getTests = (state: TestOverviewState) => state.tests;
export const getSort = (state: TestOverviewState) => state.sort;
export const getFilters = (state: TestOverviewState) => state.filters;
export const getPagination = (state: TestOverviewState) => state.pagination;
export const getSelectedTestSite = (state: TestOverviewState) => state.selectedTestSite;
export const getSelectedTestGroup = (state: TestOverviewState) => state.selectedTestGroup;
export const getInitialFilter = (state: TestOverviewState) => state.initialFilter;

export const stateSelector = createFeatureSelector<TestOverviewState>(testOverviewFeatureName);
export const testsSelector = createSelector(stateSelector, getTests);
export const sortSelector = createSelector(stateSelector, getSort);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const paginationSelector = createSelector(stateSelector, getPagination);
export const selectedTestSiteSelector = createSelector(stateSelector, getSelectedTestSite);
export const selectedTestGroupSelector = createSelector(stateSelector, getSelectedTestGroup);
export const initialFilterSelector = createSelector(stateSelector, getInitialFilter);



