
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {ResultType, TestCaseStepDetails, TruckFunctionArea} from './test-case-detail.model';
import {
  CreateTestCaseCopySuccess,
  GetResultTypeTestCaseSuccess,
  GetTestCaseDetailsSuccess, GetTruckFunctionAreaSuccess, TestCaseDetailsActions,
  testCaseDetailsActionTypes, UpdateTestCaseDetailsForm, UpdateTestCaseSuccess, UpdateUserGroupSuccess,
  UpdateUserSiteSuccess
} from './test-case-detail.actions';

export const testCaseDetailsFeatureName = 'TestCaseStepDetails';

export interface TestCaseDetailsState {
  testCaseDetails: TestCaseStepDetails;
  testCaseFilters: any;
  testCaseResultType: ResultType[];
  tcTruckFunctionArea: TruckFunctionArea[];
  testCaseUserGroup: string;
  testCaseUserSite: string;
  loader: boolean;
}

export const testCaseDetailsDefaultState: TestCaseDetailsState = {
  testCaseDetails: {},
  testCaseFilters: {},
  testCaseResultType: [],
  tcTruckFunctionArea: [],
  testCaseUserGroup: '',
  testCaseUserSite: '',
  loader: false
};

export function testCaseDetailsReducer(state: TestCaseDetailsState = testCaseDetailsDefaultState,
    action: TestCaseDetailsActions): TestCaseDetailsState {
    switch (action.type) {
      case testCaseDetailsActionTypes.GET_TEST_CASE_SUCCESS:
        return <TestCaseDetailsState>{
          ...state,
          testCaseDetails: (<GetTestCaseDetailsSuccess>action).testCaseDetails,
          loader: false
        };
        case testCaseDetailsActionTypes.GET_RESULT_TYPE_TEST_CASE_SUCCESS:
        return <TestCaseDetailsState>{
          ...state,
          testCaseResultType: (<GetResultTypeTestCaseSuccess>action).resultType
        };
        case testCaseDetailsActionTypes.GET_TRUCK_FUNCTION_AREA_SUCCESS:
         const truckFunctionAreaData = (<GetTruckFunctionAreaSuccess>action).truckFunctionArea;
        return <TestCaseDetailsState>{
          ...state,
          tcTruckFunctionArea: truckFunctionAreaData['data'] || []
        };
      case testCaseDetailsActionTypes.UPDATE_TEST_CASE_DETAILS_FORM:
        return {
          ...state,
          testCaseDetails: {
            ...state.testCaseDetails,
            ...(<UpdateTestCaseDetailsForm>action).testCaseDetails
          }
        };
      case testCaseDetailsActionTypes.CREATE_TEST_CASE_COPY_SUCCESS:
        return <TestCaseDetailsState>{
          ...state,
          testCaseDetails: (<CreateTestCaseCopySuccess>action).testCaseCopy
        };
      case testCaseDetailsActionTypes.UPDATE_TEST_CASE_SUCCESS:
        return {
          ...state,
          testCaseDetails: {
            ...state.testCaseDetails,
            ...(<UpdateTestCaseSuccess>action).testCaseDetails
          },
          loader: false
        };
      case testCaseDetailsActionTypes.UPDATE_USER_SITE_SUCCESS:
        return {
          ...state,
          testCaseUserSite: (<UpdateUserSiteSuccess> action).payload
        };
      case testCaseDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS:
        return {
          ...state,
          testCaseUserGroup: (<UpdateUserGroupSuccess> action).payload
        };
      case testCaseDetailsActionTypes.CLEAR_TEST_CASE:
        return {
          ...state,
          testCaseDetails: {}
        };
      case testCaseDetailsActionTypes.GET_TEST_CASE:
      case testCaseDetailsActionTypes.CREATE_TEST_CASE:
      case testCaseDetailsActionTypes.UPDATE_TEST_CASE:
        return {
          ...state,
          loader: true
        };
      case testCaseDetailsActionTypes.CREATE_TEST_CASE_SUCCESS:
      case testCaseDetailsActionTypes.CREATE_TEST_CASE_FAILURE:
      case testCaseDetailsActionTypes.UPDATE_TEST_CASE_FAILURE:
        return {
          ...state,
          loader: false
        };
      default:
        return state;
    }
}


export const getTestCaseDetails = (state: TestCaseDetailsState) => state.testCaseDetails;
export const getCaseFilters = (state: TestCaseDetailsState) => state.testCaseFilters;
export const getTestCaseResultType = (state: TestCaseDetailsState) => state.testCaseResultType;
export const getTcTruckFunctionArea = (state: TestCaseDetailsState) => state.tcTruckFunctionArea;
export const updateUserSite = (state: TestCaseDetailsState) => state.testCaseUserSite;
export const updateUserGroup = (state: TestCaseDetailsState) => state.testCaseUserGroup;
export const loader = (state: TestCaseDetailsState) => state.loader;

export const stateSelector = createFeatureSelector<TestCaseDetailsState>(testCaseDetailsFeatureName);
export const testCaseDetailsSelector = createSelector(stateSelector, getTestCaseDetails);
export const testCaseFiltersSelector = createSelector(stateSelector, getCaseFilters);
export const testCaseResultTypeSelector = createSelector(stateSelector, getTestCaseResultType);
export const tcTruckFunctionAreaSelector = createSelector(stateSelector, getTcTruckFunctionArea);
export const updateUserSiteSelector = createSelector(stateSelector, updateUserSite);
export const updateUserGroupSelector = createSelector(stateSelector, updateUserGroup);
export const loaderSelector = createSelector(stateSelector, loader);
