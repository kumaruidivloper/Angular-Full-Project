import { createFeatureSelector, createSelector } from '@ngrx/store';
import { omitBy } from 'lodash';
import { TestCaseStep } from './test-case-step.model';
import { PaginationParameters } from '../../../../../core/interfaces/pagination-params.i';
import {
  GetTestCaseListSuccess,
  GetTestStepListSuccess, GetTruckFunctionAreaSuccess,
  LoadTagsSuccess,
  PaginateTestCaseList,
  PaginateTestStepList,
  TestCaseStepListActions,
  testCaseStepListActionTypes,
  UpdateTestCaseList,
  UpdateTestCaseListFilters,
  UpdateTestStepList,
  UpdateTestStepListFilters
} from './test-case-step.actions';
import { Tag } from '../../../../../shared/tag/tag.model';
import { TruckFunctionArea } from '../../../../test-case-step/test-case-detail/test-case-detail.model';

export const TestCaseStepListFeatureName = 'TestCaseStepList';

export interface TestCaseStepListState {
  testCases: TestCaseStep[];
  testSteps: TestCaseStep[];
  selectedTestCases: TestCaseStep[];
  selectedTestSteps: TestCaseStep[];
  paginationTestCase: PaginationParameters;
  paginationTestStep: PaginationParameters;
  testCaseFilters: any;
  testStepFilters: any;
  tags: Tag[];
  tcTruckFunctionArea: TruckFunctionArea[];
}

export const TestCaseStepListDefaultState: TestCaseStepListState = {
  testCases: [],
  testSteps: [],
  selectedTestCases: [],
  selectedTestSteps: [],
  paginationTestCase: {
    page: 1,
    pageSize: 5
  },
  paginationTestStep: {
    page: 1,
    pageSize: 5
  },
  testCaseFilters: {},
  testStepFilters: {},
  tags: [],
  tcTruckFunctionArea: [],
};

export function TestCaseStepListReducer (
  state: TestCaseStepListState = TestCaseStepListDefaultState,
  action: TestCaseStepListActions): TestCaseStepListState {

  switch (action.type) {
    case testCaseStepListActionTypes.LOAD_TEST_CASE_SUCCESS:
      return <TestCaseStepListState>{
        ...state,
        testCases: (<GetTestCaseListSuccess> action).testCases.data,
        paginationTestCase: (<GetTestCaseListSuccess> action).testCases.pagination
      };
    case testCaseStepListActionTypes.LOAD_TEST_STEP_SUCCESS:
      return <TestCaseStepListState>{
        ...state,
        testSteps: (<GetTestStepListSuccess> action).testSteps.data,
        paginationTestStep: (<GetTestStepListSuccess> action).testSteps.pagination
      };
    case testCaseStepListActionTypes.UPDATE_TEST_CASE_FILTER:
      const filterToUpdate: object = (<UpdateTestCaseListFilters> action).filterData;
      return <TestCaseStepListState>{
        ...state,
        testCaseFilters: omitBy(filterToUpdate, value => value === '')
      };
    case testCaseStepListActionTypes.UPDATE_TEST_STEP_FILTER:
      const testStepFilter: object = (<UpdateTestStepListFilters> action).filterData;
      return <TestCaseStepListState>{
        ...state,
        testStepFilters: omitBy(testStepFilter, value => value === '')
      };
    case testCaseStepListActionTypes.PAGINATE_TEST_CASE:
      return <TestCaseStepListState>{
        ...state,
        paginationTestCase: (<PaginateTestCaseList>action).payload
      };
    case testCaseStepListActionTypes.PAGINATE_TEST_STEP:
      return <TestCaseStepListState>{
        ...state,
        paginationTestStep: (<PaginateTestStepList>action).payload
      };
    case testCaseStepListActionTypes.EMPTY_TEST_CASE_STEP_FILTERS:
      return <TestCaseStepListState>{
        ...state,
        testCaseFilters: {},
        testStepFilters: {}
      };
    case testCaseStepListActionTypes.LOAD_TAGS_SUCCESS:
      return <TestCaseStepListState>{
        ...state,
        tags: (<LoadTagsSuccess> action).payload.data,
      };
    case testCaseStepListActionTypes.UPDATE_TEST_STEP:
      return <TestCaseStepListState>{
        ...state,
        selectedTestSteps: (<UpdateTestStepList>action).testStepList
      };
    case testCaseStepListActionTypes.UPDATE_TEST_CASE:
      return <TestCaseStepListState>{
        ...state,
        selectedTestCases: (<UpdateTestCaseList>action).testCaseList
      };
    case testCaseStepListActionTypes.GET_TRUCK_FUNCTION_AREA_SUCCESS:
      const truckFunctionAreaData = (<GetTruckFunctionAreaSuccess>action).truckFunctionArea;
      return <TestCaseStepListState>{
        ...state,
        tcTruckFunctionArea: truckFunctionAreaData['data'] || []
      };
    default:
      return state;
  }
}


export const getTags = (state: TestCaseStepListState) => state.tags;
export const getTestCaseList = (state: TestCaseStepListState) => state.testCases;
export const getTestStepList = (state: TestCaseStepListState) => state.testSteps;
export const getTestCaseListPagination = (state: TestCaseStepListState) => state.paginationTestCase;
export const getTestStepListPagination = (state: TestCaseStepListState) => state.paginationTestStep;
export const getTestCaseListFilters = (state: TestCaseStepListState) => state.testCaseFilters;
export const getTestStepListFilters = (state: TestCaseStepListState) => state.testStepFilters;
export const getSelectedTestCase = (state: TestCaseStepListState) => state.selectedTestCases;
export const getSelectedTestStep = (state: TestCaseStepListState) => state.selectedTestSteps;
export const getTcTruckFunctionArea = (state: TestCaseStepListState) => state.tcTruckFunctionArea;

export const stateSelector = createFeatureSelector<TestCaseStepListState>(TestCaseStepListFeatureName);
export const testCaseListSelector = createSelector(stateSelector, getTestCaseList);
export const testStepListSelector = createSelector(stateSelector, getTestStepList);
export const paginationTestCaseListSelector = createSelector(stateSelector, getTestCaseListPagination);
export const paginationTestStepListSelector = createSelector(stateSelector, getTestStepListPagination);
export const testCaseFiltersSelector = createSelector(stateSelector, getTestCaseListFilters);
export const testStepFiltersSelector = createSelector(stateSelector, getTestStepListFilters);
export const selectedTestCaseSelector = createSelector(stateSelector, getSelectedTestCase);
export const selectedTestStepSelector = createSelector(stateSelector, getSelectedTestStep);
export const tagsForSequenceSelector = createSelector(stateSelector, getTags);
export const tcTruckFunctionAreaSelector = createSelector(stateSelector, getTcTruckFunctionArea);
