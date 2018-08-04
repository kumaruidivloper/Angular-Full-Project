import { Action } from '@ngrx/store';
import { TestCaseStepDetails, ResultType } from '../test-case-detail/test-case-detail.model';

export const testStepDetailsActionTypes = {
  GET_TEST_STEP: '[TestStepDetails] Get Test Step by id ',
  GET_TEST_STEP_SUCCESS: '[TestStepDetails] Get Test Step by id  Success',
  GET_TEST_STEP_FAILURE: '[TestStepDetails] Get Test Step by id  Failure',
  CREATE_TEST_STEP: '[TestStepDetails] Create new Test Step',
  CREATE_TEST_STEP_SUCCESS: '[TestStepDetails] Create new Test Step Success',
  CREATE_TEST_STEP_FAILURE: '[TestStepDetails] Create new Test Step Failure',
  UPDATE_TEST_STEP: '[TestStepDetails] Update Test Step',
  UPDATE_TEST_STEP_SUCCESS: '[TestStepDetails] Update Test Step Success',
  UPDATE_TEST_STEP_FAILURE: '[TestStepDetails] Update Test Step Failure',
  DELETE_TEST_STEP: '[TestStepDetails] Delete Test Step',
  DELETE_TEST_STEP_SUCCESS: '[TestStepDetails] Delete Test Step Success',
  DELETE_TEST_STEP_FAILURE: '[TestStepDetails] Delete Test Step Failure',
  GET_RESULT_TYPE_TEST_STEP: '[TestStepDetails] Get Result Type',
  GET_RESULT_TYPE_TEST_STEP_SUCCESS: '[TestStepDetails] Get Result Type Success',
  GET_RESULT_TYPE_TEST_STEP_FAILURE: '[TestStepDetails] Get Result Type Failure',
  UPDATE_TEST_STEP_DETAILS_FORM: '[TestStepDetails] Update Test Step Form',
  UPDATE_USER_GROUP: '[TestStepDetails] Update User Group',
  UPDATE_USER_GROUP_SUCCESS: '[TestStepDetails] Update User Group Success' ,
  UPDATE_USER_SITE: '[TestStepDetails] Update User Site',
  UPDATE_USER_SITE_SUCCESS: '[TestStepDetails] Update User Site Success',
  CLEAR_TEST_STEP: '[TestStepDetails] Clear Test Case',
  CREATE_TEST_STEP_COPY: '[TestStepDetails] Create Test Step Copy',
  CREATE_TEST_STEP_COPY_SUCCESS: '[TestStepDetails] Create Test Step Copy Success'
};

export class GetTestStepDetails implements Action {
  readonly type: string = testStepDetailsActionTypes.GET_TEST_STEP;
  constructor(public id: number) {}
}
export class GetTestStepDetailsSuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.GET_TEST_STEP_SUCCESS;
  constructor(public testStepDetails: TestCaseStepDetails) {}
}
export class GetTestStepDetailsFailure implements Action {
  readonly type: string = testStepDetailsActionTypes.GET_TEST_STEP_FAILURE;
}
export class CreateTestStep implements Action {
  readonly type: string = testStepDetailsActionTypes.CREATE_TEST_STEP;
}
export class CreateTestStepSuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.CREATE_TEST_STEP_SUCCESS;
}
export class CreateTestStepFailure implements Action {
  readonly type: string = testStepDetailsActionTypes.CREATE_TEST_STEP_FAILURE;
}
export class UpdateTestStep implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_TEST_STEP;
}
export class UpdateTestStepSuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_TEST_STEP_SUCCESS;
  constructor(public testStepDetails: TestCaseStepDetails) {}
}
export class UpdateTestStepFailure implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_TEST_STEP_FAILURE;
}
export class UpdateTestStepDetailsForm implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_TEST_STEP_DETAILS_FORM;
  constructor(public testStepDetails: TestCaseStepDetails) {}
}
export class DeleteTestStep implements Action {
  readonly type: string = testStepDetailsActionTypes.DELETE_TEST_STEP;
  constructor(public testCaseStepDetails: TestCaseStepDetails) {}
}
export class DeleteTestStepSuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.DELETE_TEST_STEP_SUCCESS;
}
export class DeleteTestStepFailure implements Action {
  readonly type: string = testStepDetailsActionTypes.DELETE_TEST_STEP_FAILURE;
}
export class GetResultTypeTestStep implements Action {
  readonly type: string = testStepDetailsActionTypes.GET_RESULT_TYPE_TEST_STEP;
}
export class GetResultTypeTestStepSuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.GET_RESULT_TYPE_TEST_STEP_SUCCESS;
  constructor(public resultType: ResultType) {}
}
export class GetResultTypTestStepFailure implements Action {
  readonly type: string = testStepDetailsActionTypes.GET_RESULT_TYPE_TEST_STEP_FAILURE;
}
export class UpdateUserGroup implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_USER_GROUP;
  constructor(public payload: string) {}
}
export class UpdateUserGroupSuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS;
  constructor(public payload: string) {}
}

export class UpdateUserSite implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_USER_SITE;
  constructor(public payload: any) {}
}

export class UpdateUserSiteSuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.UPDATE_USER_SITE_SUCCESS;
  constructor(public payload: any) {}
}
export class ClearTestStepDetails implements Action {
  readonly type: string = testStepDetailsActionTypes.CLEAR_TEST_STEP;
}

export class CreateTestStepCopy implements Action {
  readonly type: string = testStepDetailsActionTypes.CREATE_TEST_STEP_COPY;
}
export class CreateTestStepCopySuccess implements Action {
  readonly type: string = testStepDetailsActionTypes.CREATE_TEST_STEP_COPY_SUCCESS;
  constructor(public testStepCopy: TestCaseStepDetails) {}
}

export type TestStepDetailsActions =  GetTestStepDetails | GetTestStepDetailsSuccess | GetTestStepDetailsFailure
  | CreateTestStep | CreateTestStepSuccess | CreateTestStepFailure
  | UpdateTestStep | UpdateTestStepSuccess | UpdateTestStepFailure
  | DeleteTestStep | DeleteTestStepSuccess | DeleteTestStepFailure
  | GetResultTypeTestStep | GetResultTypeTestStepSuccess | GetResultTypTestStepFailure
  | UpdateTestStepDetailsForm | ClearTestStepDetails
  | UpdateUserGroup | UpdateUserGroupSuccess | UpdateUserSite | UpdateUserSiteSuccess | CreateTestStepCopy | CreateTestStepCopySuccess;


