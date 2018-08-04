import { User } from '../../../core/services/user/user.model';
import { TestDetails, TestDetailsFilters, TestObject } from './test-details.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GetTestDetailsSuccess,
  GetTestLeadersSuccess,
  GetTestObjectSuccess,
  GetTestSoftwareVersionSuccess,
  ProcedurePaginate,
  TestDetailsActions,
  testDetailsActionTypes,
  UpdateDetailsForm,
  UpdateProcedureFilters,
  UpdateUserGroupSuccess,
  UpdateUserSiteSuccess
} from './test-details.actions';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { cloneDeep, omitBy } from 'lodash';
import { Filter } from '../../../core/interfaces/filter.model';

export const testDetailsFeatureName = 'TestDetails';

export interface TestDetailsState {
  testObjects: TestObject[];
  testDetails: TestDetails;
  testSoftwareVersions: any;
  pagination: PaginationParameters;
  filters: TestDetailsFilters;
  testLeaders: User[];
  testUserGroup: string;
  testUserSite: string;

}

export const testDetailsDefaultState: TestDetailsState = {
  testObjects: [],
  testDetails: {},
  testSoftwareVersions: [],
  filters: {},
  pagination: {
    page: 1,
    pageSize: 5
  },
  testLeaders: [],
  testUserGroup: '',
  testUserSite: ''
};

export function testDetailsReducer(state: TestDetailsState = testDetailsDefaultState,
                                   action: TestDetailsActions): TestDetailsState {

  switch (action.type) {
    case testDetailsActionTypes.GET_TEST_DETAILS_SUCCESS:
      return <TestDetailsState>{
        ...state,
        testDetails: (<GetTestDetailsSuccess>action).payload
      };
    case testDetailsActionTypes.GET_TEST_OBJECTS_SUCCESS:
      return <TestDetailsState>{
        ...state,
        testObjects: (<GetTestObjectSuccess>action).payload
      };
    case testDetailsActionTypes.GET_TEST_SOFTWARE_VERSION_SUCCESS:
      return <TestDetailsState>{
        ...state,
        testSoftwareVersions: (<GetTestSoftwareVersionSuccess> action).payload
      };
    case testDetailsActionTypes.UPDATE_PROCEDURE_FILTERS:
      const filterToUpdate: Filter = (<UpdateProcedureFilters>action).payload;

      const updatedFilters: TestDetailsFilters = cloneDeep(state.filters);

      updatedFilters[filterToUpdate.field] = filterToUpdate.value;

      return <TestDetailsState>{
        ...state,
        filters: omitBy(updatedFilters, value => value === '')
      };
    case testDetailsActionTypes.CLEAR_PROCEDURE_FILTERS:
      return <TestDetailsState>{
        ...state,
        filters: {}
      };
    case testDetailsActionTypes.PROCEDURE_PAGINATE:
      return <TestDetailsState>{
        ...state,
        pagination: (<ProcedurePaginate>action).payload
      };
    case testDetailsActionTypes.GET_TEST_LEADERS_SUCCESS:
      return <TestDetailsState>{
        ...state,
        testLeaders: (<GetTestLeadersSuccess> action).payload
      };
    case testDetailsActionTypes.CLEAR_TEST_DETAILS:
      return {
        ...state,
        testDetails: {}
      };
    case testDetailsActionTypes.UPDATE_DETAILS_FORM:
      return {
        ...state,
        testDetails: {
          ...state.testDetails,
          ...(<UpdateDetailsForm>action).testDetails
        }
      };
    case testDetailsActionTypes.UPDATE_USER_SITE_SUCCESS:
      return {
        ...state,
        testUserSite: (<UpdateUserSiteSuccess> action).payload
      };
    case testDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS:
      return {
        ...state,
        testUserGroup: (<UpdateUserGroupSuccess> action).payload
      };
    default:
      return state;
  }
}


export const getTestObjects = (state: TestDetailsState) => state.testObjects;
export const getTestDetails = (state: TestDetailsState) => state.testDetails;
export const getTestSoftwareVersions = (state: TestDetailsState) => state.testSoftwareVersions;
export const getFilters = (state: TestDetailsState) => state.filters;
export const getTestLeaders = (state: TestDetailsState) => state.testLeaders;
export const updateUserSite = (state: TestDetailsState) => state.testUserSite;
export const updateUserGroup = (state: TestDetailsState) => state.testUserGroup;

export const stateSelector = createFeatureSelector<TestDetailsState>(testDetailsFeatureName);
export const testObjectsSelector = createSelector(stateSelector, getTestObjects);
export const testDetailsSelector = createSelector(stateSelector, getTestDetails);
export const testSoftwareVersionsSelector = createSelector(stateSelector, getTestSoftwareVersions);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const testLeaderSelector = createSelector(stateSelector, getTestLeaders);
export const updateUserSiteSelector = createSelector(stateSelector, updateUserSite);
export const updateUserGroupSelector = createSelector(stateSelector, updateUserGroup);


