import { Action } from '@ngrx/store';
import { ResultType, TestCaseStepDetails, TruckFunctionArea } from './test-case-detail.model';

export const testCaseDetailsActionTypes = {
  GET_TEST_CASE: '[TestCaseStepDetails] Get Test Case by id ',
  GET_TEST_CASE_SUCCESS: '[TestCaseStepDetails] Get Test Case by id  Success',
  GET_TEST_CASE_FAILURE: '[TestCaseStepDetails] Get Test Case by id  Failure',
  CREATE_TEST_CASE: '[TestCaseStepDetails] Create new Test Case',
  CREATE_TEST_CASE_SUCCESS: '[TestCaseStepDetails] Create new Test Case Success',
  CREATE_TEST_CASE_FAILURE: '[TestCaseStepDetails] Create new Test Case Failure',
  UPDATE_TEST_CASE: '[TestCaseStepDetails] Update Test Case',
  UPDATE_TEST_CASE_SUCCESS: '[TestCaseStepDetails] Update Test Case Success',
  UPDATE_TEST_CASE_FAILURE: '[TestCaseStepDetails] Update Test Case Failure',
  DELETE_TEST_CASE: '[TestCaseStepDetails] Delete Test Case',
  DELETE_TEST_CASE_SUCCESS: '[TestCaseStepDetails] Delete Test Case Success',
  DELETE_TEST_CASE_FAILURE: '[TestCaseStepDetails] Delete Test Case Failure',
  GET_RESULT_TYPE_TEST_CASE: '[TestCaseStepDetails] Get Result Type',
  GET_RESULT_TYPE_TEST_CASE_SUCCESS: '[TestCaseStepDetails] Get Result Type Success',
  GET_RESULT_TYPE_TEST_CASE_FAILURE: '[TestCaseStepDetails] Get Result Type Failure',
  GET_TRUCK_FUNCTION_AREA: '[TestCaseStepDetails] Get Truck Function Area',
  GET_TRUCK_FUNCTION_AREA_SUCCESS: '[TestCaseStepDetails] Get Truck Function Area Success',
  GET_TRUCK_FUNCTION_AREA_FAILURE: '[TestCaseStepDetails] Get Truck Function Area Failure',
  UPDATE_TEST_CASE_DETAILS_FORM: '[TestCaseStepDetails] Update Test Case Form',
  UPDATE_USER_GROUP: '[TestCaseStepDetails] Update User Group',
  UPDATE_USER_GROUP_SUCCESS: '[TestCaseStepDetails] Update User Group Success' ,
  UPDATE_USER_SITE: '[TestCaseStepDetails] Update User Site',
  UPDATE_USER_SITE_SUCCESS: '[TestCaseStepDetails] Update User Site Success',
  CLEAR_TEST_CASE: '[TestCaseStepDetails] Clear Test Case',
  CREATE_TEST_CASE_COPY: '[TestCaseStepDetails] Create Test Case Copy',
  CREATE_TEST_CASE_COPY_SUCCESS: '[TestCaseStepDetails] Create Test Case Copy Success'
};

export class GetTestCaseDetails implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_TEST_CASE;
  constructor(public id: number) {}
}
export class GetTestCaseDetailsSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_TEST_CASE_SUCCESS;
  constructor(public testCaseDetails: TestCaseStepDetails) {}
}
export class GetTestCaseDetailsFailure implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_TEST_CASE_FAILURE;
}
export class CreateTestCase implements Action {
  readonly type: string = testCaseDetailsActionTypes.CREATE_TEST_CASE;
}
export class CreateTestCaseSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.CREATE_TEST_CASE_SUCCESS;
}
export class CreateTestCaseFailure implements Action {
  readonly type: string = testCaseDetailsActionTypes.CREATE_TEST_CASE_FAILURE;
}
export class UpdateTestCase implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_TEST_CASE;
}
export class UpdateTestCaseSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_TEST_CASE_SUCCESS;
  constructor(public testCaseDetails: TestCaseStepDetails) {}
}
export class UpdateTestCaseFailure implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_TEST_CASE_FAILURE;
}
export class UpdateTestCaseDetailsForm implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_TEST_CASE_DETAILS_FORM;
  constructor(public testCaseDetails: TestCaseStepDetails) {}
}
export class DeleteTestCase implements Action {
  readonly type: string = testCaseDetailsActionTypes.DELETE_TEST_CASE;
  constructor(public testCaseStepDetails: TestCaseStepDetails) {}
}
export class DeleteTestCaseSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.DELETE_TEST_CASE_SUCCESS;
}
export class DeleteTestCaseFailure implements Action {
  readonly type: string = testCaseDetailsActionTypes.DELETE_TEST_CASE_FAILURE;
}
export class GetResultTypeTestCase implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_RESULT_TYPE_TEST_CASE;
}
export class GetResultTypeTestCaseSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_RESULT_TYPE_TEST_CASE_SUCCESS;
  constructor(public resultType: ResultType) {}
}
export class GetResultTypTestCaseFailure implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_RESULT_TYPE_TEST_CASE_FAILURE;
}
export class GetTruckFunctionArea implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_TRUCK_FUNCTION_AREA;
}
export class GetTruckFunctionAreaSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_TRUCK_FUNCTION_AREA_SUCCESS;
  constructor (public truckFunctionArea: TruckFunctionArea) {}
}
export class GetTruckFunctionAreaFailure implements Action {
  readonly type: string = testCaseDetailsActionTypes.GET_TRUCK_FUNCTION_AREA_FAILURE;
}
export class UpdateUserGroup implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_USER_GROUP;
  constructor(public payload: string) {}
}
export class UpdateUserGroupSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS;
  constructor(public payload: string) {}
}

export class UpdateUserSite implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_USER_SITE;
  constructor(public payload: any) {}
}

export class UpdateUserSiteSuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.UPDATE_USER_SITE_SUCCESS;
  constructor(public payload: any) {}
}
export class ClearTestCaseDetails implements Action {
  readonly type: string = testCaseDetailsActionTypes.CLEAR_TEST_CASE;
}

export class CreateTestCaseCopy implements Action {
  readonly type: string = testCaseDetailsActionTypes.CREATE_TEST_CASE_COPY;
}
export class CreateTestCaseCopySuccess implements Action {
  readonly type: string = testCaseDetailsActionTypes.CREATE_TEST_CASE_COPY_SUCCESS;
  constructor(public testCaseCopy: TestCaseStepDetails) {}
}

export type TestCaseDetailsActions = GetTestCaseDetails | GetTestCaseDetailsSuccess | GetTestCaseDetailsFailure
                                | CreateTestCase | CreateTestCaseSuccess | CreateTestCaseFailure
                                | UpdateTestCase | UpdateTestCaseSuccess | UpdateTestCaseFailure
                                | DeleteTestCase | DeleteTestCaseSuccess | DeleteTestCaseFailure
                                | GetResultTypeTestCase | GetResultTypeTestCaseSuccess | GetResultTypTestCaseFailure
                                | GetTruckFunctionArea | GetTruckFunctionAreaSuccess | GetTruckFunctionAreaFailure
                                | UpdateTestCaseDetailsForm | ClearTestCaseDetails
                                | UpdateUserGroup | UpdateUserGroupSuccess | UpdateUserSite | UpdateUserSiteSuccess
                                | CreateTestCaseCopy | CreateTestCaseCopySuccess;
