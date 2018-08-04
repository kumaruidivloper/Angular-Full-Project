import { createFeatureSelector, createSelector } from '@ngrx/store';
import { omitBy, pick } from 'lodash';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import {
  FiltersOnPageLoad,
  GetTestCaseStepSuccess,
  PaginateTestCaseStep,
  testCaseStepActionTypes,
  TestCaseStepOverviewActions,
  UpdateTestCaseStepFilters
} from './test-case-step-overview.actions';
import { TestCaseStep } from './test-case-step-overview.model';

export const testCaseStepOverviewFeatureName = 'TestCaseStepOverview';

export interface TestCaseStepOverviewState {
  testCaseSteps: TestCaseStep[];
  pagination: PaginationParameters;
  filters: any;
  sort?: SortOptions;
  initialFilter: object;
}

export const testCaseStepOverviewDefaultState: TestCaseStepOverviewState = {
  testCaseSteps: [],
  pagination: {
    page: 1,
    pageSize: 20
  },
  filters: {},
  initialFilter: {}
};

export function testCaseStepOverviewReducer (
  state: TestCaseStepOverviewState = testCaseStepOverviewDefaultState,
  action: TestCaseStepOverviewActions): TestCaseStepOverviewState {

  switch (action.type) {

    case testCaseStepActionTypes.LOAD_TEST_CASE_STEP_SUCCESS:
      return <TestCaseStepOverviewState>{
        ...state,
        testCaseSteps: (<GetTestCaseStepSuccess> action).payload.data,
        pagination: (<GetTestCaseStepSuccess> action).payload.pagination,
        initialFilter: {}
      };
    // case testCaseStepActionTypes.SORT_TEST_CASE_STEP:
    //   const sort = getNextSort((<SortTestCaseStep>action).payload, state.sort);
    //   return <TestCaseStepOverviewState>{
    //     ...state,
    //     sort: sort
    //   };
    case testCaseStepActionTypes.UPDATE_TEST_CASE_STEP_FILTER:
      const filterToUpdate: object = (<UpdateTestCaseStepFilters> action).filterData;
      return <TestCaseStepOverviewState>{
        ...state,
        filters: omitBy(filterToUpdate, value => value === '')
      };
    case testCaseStepActionTypes.PAGINATE_TEST_CASE_STEP:
      return <TestCaseStepOverviewState>{
        ...state,
        pagination: (<PaginateTestCaseStep>action).payload
      };
    case testCaseStepActionTypes.EMPTY_TEST_CASE_STEP_FILTERS:
      return <TestCaseStepOverviewState>{
        ...state,
        filters: {},
        initialFilters: {},
        testCaseSteps: []
      };
    case testCaseStepActionTypes.CLEAR_TEST_CASE_STEP_TABLE_FILTERS:
      const filtersToRetain = pick(state.filters, ['siteId', 'groupId']);
      return <TestCaseStepOverviewState>{
        ...state,
        filters: filtersToRetain
      };
    case testCaseStepActionTypes.INITIAL_FILTER_ON_PAGE_LOAD:
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


export const getTestCaseStep = (state: TestCaseStepOverviewState) => state.testCaseSteps;
export const getTestCaseStepPagination = (state: TestCaseStepOverviewState) => state.pagination;
export const getTestCaseStepFilters = (state: TestCaseStepOverviewState) => state.filters;
export const getTestCaseStepSort = (state: TestCaseStepOverviewState) => state.sort;
export const getInitialFilter = (state: TestCaseStepOverviewState) => state.initialFilter;

export const stateSelector = createFeatureSelector<TestCaseStepOverviewState>(testCaseStepOverviewFeatureName);
export const testCaseStepSelector = createSelector(stateSelector, getTestCaseStep);
export const paginationTsTcSelector = createSelector(stateSelector, getTestCaseStepPagination);
export const filtersTsTcSelector = createSelector(stateSelector, getTestCaseStepFilters);
export const sortTsTcSelector = createSelector(stateSelector, getTestCaseStepSort);
export const initialFilterSelector = createSelector(stateSelector, getInitialFilter);
