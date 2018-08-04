import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResultType, TestCaseStepDetails} from '../test-case-detail/test-case-detail.model';
import {
  CreateTestStepCopySuccess,
  GetResultTypeTestStepSuccess,
  GetTestStepDetailsSuccess, TestStepDetailsActions,
  testStepDetailsActionTypes, UpdateTestStepDetailsForm, UpdateTestStepSuccess, UpdateUserGroupSuccess, UpdateUserSiteSuccess
} from './test-step-detail-actions';

export const testStepDetailsFeatureName = 'TestStepDetails';

export interface TestStepDetailsState {
  testStepDetails: TestCaseStepDetails;
  testStepFilters: any;
  testCaseStepResultType: ResultType[];
  testStepUserGroup: string;
  testStepUserSite: string;
  loader: boolean;
}

export const testStepDetailsDefaultState: TestStepDetailsState = {
  testStepDetails: {},
  testStepFilters: {},
  testCaseStepResultType: [],
  testStepUserGroup: '',
  testStepUserSite: '',
  loader: false
};

export function testStepDetailsReducer(state: TestStepDetailsState = testStepDetailsDefaultState,
                                       action: TestStepDetailsActions): TestStepDetailsState {
  switch (action.type) {
    case testStepDetailsActionTypes.GET_TEST_STEP_SUCCESS:
      return <TestStepDetailsState>{
        ...state,
        testStepDetails: (<GetTestStepDetailsSuccess>action).testStepDetails
      };
    case testStepDetailsActionTypes.GET_RESULT_TYPE_TEST_STEP_SUCCESS:
      return <TestStepDetailsState>{
        ...state,
        testCaseStepResultType: (<GetResultTypeTestStepSuccess>action).resultType
      };
    case testStepDetailsActionTypes.UPDATE_TEST_STEP_DETAILS_FORM:
      return {
        ...state,
        testStepDetails: {
          ...state.testStepDetails,
          ...(<UpdateTestStepDetailsForm>action).testStepDetails
        }
      };
    case testStepDetailsActionTypes.CREATE_TEST_STEP_COPY_SUCCESS:
      return <TestStepDetailsState>{
        ...state,
        testStepDetails: (<CreateTestStepCopySuccess>action).testStepCopy
      };
    case testStepDetailsActionTypes.UPDATE_TEST_STEP_SUCCESS:
      return {
        ...state,
        testStepDetails: {
          ...state.testStepDetails,
          ...(<UpdateTestStepSuccess>action).testStepDetails
        },
        loader: false
      };
    case testStepDetailsActionTypes.UPDATE_USER_SITE_SUCCESS:
      return {
        ...state,
        testStepUserSite: (<UpdateUserSiteSuccess> action).payload
      };
    case testStepDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS:
      return {
        ...state,
        testStepUserGroup: (<UpdateUserGroupSuccess> action).payload
      };
    case testStepDetailsActionTypes.CLEAR_TEST_STEP:
      return {
        ...state,
        testStepDetails: {}
      };
    case testStepDetailsActionTypes.CREATE_TEST_STEP:
    case testStepDetailsActionTypes.UPDATE_TEST_STEP:
      return {
        ...state,
        loader: true
      };
    case testStepDetailsActionTypes.CREATE_TEST_STEP_SUCCESS:
    case testStepDetailsActionTypes.CREATE_TEST_STEP_FAILURE:
    case testStepDetailsActionTypes.UPDATE_TEST_STEP_SUCCESS:
    case testStepDetailsActionTypes.UPDATE_TEST_STEP_FAILURE:
      return {
        ...state,
        loader: false
      };
    default:
      return state;
  }
}


export const getTestStepDetails = (state: TestStepDetailsState) => state.testStepDetails;
export const getStepFilters = (state: TestStepDetailsState) => state.testStepFilters;
export const getTestStepResultType = (state: TestStepDetailsState) => state.testCaseStepResultType;
export const updateUserSite = (state: TestStepDetailsState) => state.testStepUserGroup;
export const updateUserGroup = (state: TestStepDetailsState) => state.testStepUserSite;
export const loader = (state: TestStepDetailsState) => state.loader;

export const stateSelector = createFeatureSelector<TestStepDetailsState>(testStepDetailsFeatureName);
export const testStepDetailsSelector = createSelector(stateSelector, getTestStepDetails);
export const testStepFiltersSelector = createSelector(stateSelector, getStepFilters);
export const testStepResultTypeSelector = createSelector(stateSelector, getTestStepResultType);
export const updateUserSiteSelector = createSelector(stateSelector, updateUserSite);
export const updateUserGroupSelector = createSelector(stateSelector, updateUserGroup);
export const loaderSelector = createSelector(stateSelector, loader);
