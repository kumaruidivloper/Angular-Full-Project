import { Action } from '@ngrx/store';
import {TestCaseStep} from './test-case-step.model';
import {PaginatedResponse} from '../../../../../core/interfaces/paginated-response.i';
import {PaginationParameters} from '../../../../../core/interfaces/pagination-params.i';
import {Tag} from '../../../../../shared/tag/tag.model';
import {TruckFunctionArea} from '../../../../test-case-step/test-case-detail/test-case-detail.model';


export const testCaseStepListActionTypes = {
  CLEAR_TEST_CASE_STEP_FILTERS : '[TestCaseStepList] Clear Filters',
  EMPTY_TEST_CASE_STEP_FILTERS : '[TestCaseStepList] Empty Filters',
  CLEAR_TEST_CASE_STEP_TABLE_FILTERS: '[TestCaseStepList] Clear Filters of Test Case Step Table',
  PAGINATE_TEST_CASE: '[TestCaseStepList] Pages of Test Case',
  PAGINATE_TEST_STEP: '[TestCaseStepList] Pages of Test Step',
  LOAD_TEST_CASE : '[TestCaseStepList] Load Test Case',
  LOAD_ALL_TEST_CASE : '[TestCaseStepList] Load All Test Case',
  LOAD_TEST_CASE_SUCCESS : '[TestCaseStepList] Load Test Case Successfully',
  LOAD_TEST_CASE_FAILURE : '[TestCaseStepList] Load Test Case Failure',
  LOAD_TEST_STEP : '[TestCaseStepList] Load Test Step',
  LOAD_ALL_TEST_STEP : '[TestCaseStepList] Load All Test Step',
  LOAD_TEST_STEP_SUCCESS : '[TestCaseStepList] Load Test Step Successfully',
  LOAD_TEST_STEP_FAILURE : '[TestCaseStepList] Load Test Step Failure',
  SELECT_TEST_CASE: '[TestCaseList] Select Test Case',
  DESELECT_TEST_CASE: '[TestCaseList] DeSelect Test Case',
  UPDATE_TEST_CASE: '[TestCaseList] Update Selected Test Case',
  SELECT_TEST_STEP: '[TestCaseList] Select Test Step',
  DESELECT_TEST_STEP: '[TestCaseList] DeSelect Test Step',
  UPDATE_TEST_STEP: '[TestCaseList] Update Selected Test Step',
  UPDATE_TEST_CASE_FILTER : '[TestCaseStepList] Update Filters',
  UPDATE_TEST_STEP_FILTER : '[TestCaseStepList] Update Test Step Filters',
  LOAD_TAGS: '[TagList] Load Tags',
  LOAD_TAGS_SUCCESS: '[TagList] Load Tags Successfully',
  LOAD_TAGS_FAILURE: '[TagList] Load Tags Failure',
  GET_TRUCK_FUNCTION_AREA: '[TestCaseStepDetails] Get Truck Function Area',
  GET_TRUCK_FUNCTION_AREA_SUCCESS: '[TestCaseStepDetails] Get Truck Function Area Success',
  GET_TRUCK_FUNCTION_AREA_FAILURE: '[TestCaseStepDetails] Get Truck Function Area Failure',
};

export class UpdateTestCaseListFilters implements Action {
  readonly type: string = testCaseStepListActionTypes.UPDATE_TEST_CASE_FILTER;
  constructor(public filterData: object) {}
}

export class UpdateTestStepListFilters implements Action {
  readonly type: string = testCaseStepListActionTypes.UPDATE_TEST_STEP_FILTER;
  constructor(public filterData: object) {}
}

export class ClearTestCaseStepListFilters implements Action {
  readonly type: string = testCaseStepListActionTypes.CLEAR_TEST_CASE_STEP_FILTERS;
}

export class ClearTestCaseStepListTableFilters implements Action {
  readonly type: string = testCaseStepListActionTypes.CLEAR_TEST_CASE_STEP_TABLE_FILTERS;
}

export class EmptyTestCaseStepListFilters implements Action {
  readonly type: string = testCaseStepListActionTypes.EMPTY_TEST_CASE_STEP_FILTERS;
}

export class GetTestCaseList implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TEST_CASE;
}

export class GetTestStepList implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TEST_STEP;
}

export class GetTestCaseListSuccess implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TEST_CASE_SUCCESS;
  constructor(public testCases: PaginatedResponse<TestCaseStep[]>) {}
}

export class GetTestCaseListFailure implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TEST_CASE_FAILURE;
}

export class GetTestStepListSuccess implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TEST_STEP_SUCCESS;
  constructor(public testSteps: PaginatedResponse<TestCaseStep[]>) {}
}

export class GetTestStepListFailure implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TEST_STEP_FAILURE;
}

export class PaginateTestCaseList implements Action {
  readonly type: string = testCaseStepListActionTypes.PAGINATE_TEST_CASE;
  constructor(public payload: PaginationParameters) {}
}

export class PaginateTestStepList implements Action {
  readonly type: string = testCaseStepListActionTypes.PAGINATE_TEST_STEP;
  constructor(public payload: PaginationParameters) {}
}

export class SelectTestCaseList implements Action {
  readonly type: string = testCaseStepListActionTypes.SELECT_TEST_CASE;
  constructor(public testCaseList: TestCaseStep) {}
}

export class DeSelectTestCaseList implements Action {
  readonly type: string = testCaseStepListActionTypes.DESELECT_TEST_CASE;
  constructor(public testCaseID: number) {}
}

export class UpdateTestCaseList implements Action {
  readonly type: string = testCaseStepListActionTypes.UPDATE_TEST_CASE;
  constructor(public testCaseList: TestCaseStep[]) {}
}

export class SelectTestStepList implements Action {
  readonly type: string = testCaseStepListActionTypes.SELECT_TEST_STEP;
  constructor(public testStepList: TestCaseStep) {}
}

export class DeSelectTestStepList implements Action {
  readonly type: string = testCaseStepListActionTypes.DESELECT_TEST_STEP;
  constructor(public testStepID: number) {}
}

export class UpdateTestStepList implements Action {
  readonly type: string = testCaseStepListActionTypes.UPDATE_TEST_STEP;
  constructor(public testStepList: TestCaseStep[]) {}
}

export class LoadTags implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TAGS;
}

export class LoadTagsSuccess implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TAGS_SUCCESS;
  constructor(public payload: PaginatedResponse<Tag[]>) {}
}

export class LoadTagsFailure implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_TAGS_FAILURE;
}

export class GetTruckFunctionArea implements Action {
  readonly type: string = testCaseStepListActionTypes.GET_TRUCK_FUNCTION_AREA;
}

export class GetTruckFunctionAreaSuccess implements Action {
  readonly type: string = testCaseStepListActionTypes.GET_TRUCK_FUNCTION_AREA_SUCCESS;
  constructor (public truckFunctionArea: TruckFunctionArea) {}
}

export class GetTruckFunctionAreaFailure implements Action {
  readonly type: string = testCaseStepListActionTypes.GET_TRUCK_FUNCTION_AREA_FAILURE;
}

export class LoadAllTestCases implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_ALL_TEST_CASE;
}

export class LoadAllTestSteps implements Action {
  readonly type: string = testCaseStepListActionTypes.LOAD_ALL_TEST_STEP;
}

export type TestCaseStepListActions = ClearTestCaseStepListFilters |
                                      ClearTestCaseStepListTableFilters |
                                      GetTestCaseList | GetTestStepList |
                                      PaginateTestCaseList | PaginateTestStepList |
                                      GetTestCaseListSuccess | GetTestStepListSuccess |
                                      GetTestStepListFailure | GetTestCaseListFailure |
                                      SelectTestCaseList | EmptyTestCaseStepListFilters |
                                      UpdateTestCaseListFilters | UpdateTestStepListFilters |
                                      DeSelectTestCaseList | UpdateTestCaseList |
                                      SelectTestStepList | DeSelectTestStepList | UpdateTestStepList |
                                      LoadTags | LoadTagsSuccess | LoadTagsFailure |
                                      GetTruckFunctionArea | GetTruckFunctionAreaSuccess | GetTruckFunctionAreaFailure |
                                      LoadAllTestCases | LoadAllTestSteps;

