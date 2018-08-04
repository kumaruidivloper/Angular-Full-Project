import { Action } from '@ngrx/store';
import { TestDetails } from './test-details.model';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { Filter } from '../../../core/interfaces/filter.model';

export const testDetailsActionTypes = {
  GET_TEST_OBJECTS: '[TestDetails] Get Test Object',
  GET_TEST_DETAILS: '[TestDetails] Get Test Details',
  GET_TEST_SOFTWARE_VERSION: '[TestDetails] Get Test Details SW Version',
  GET_TEST_DETAILS_SUCCESS: '[TestDetails] Got Test Details Successfully',
  GET_TEST_DETAILS_FAILURE: '[TestDetails] Got Test Details Failure',
  GET_TEST_OBJECTS_SUCCESS: '[TestDetails] Got Test Object Success',
  GET_TEST_OBJECTS_FAILURE: '[TestDetails] Got Test Object Failure',
  GET_TEST_SOFTWARE_VERSION_SUCCESS: '[TestDetails] Got Test Details SW Version Success',
  GET_TEST_SOFTWARE_VERSION_FAILURE: '[TestDetails] Got Test Details SW Version Failure',
  DELETE_TEST: '[TestDetails] Delete Test',
  DELETE_TEST_SUCCESS: '[TestDetails] Delete Test Success',
  DELETE_TEST_FAILURE: '[TestDetails] Delete Test Failure',
  UPDATE_TEST: '[TestDetails] Update Test',
  UPDATE_TEST_FAILURE: '[TestDetails] Update Test Failure',
  UPDATE_TEST_SUCCESS: '[TestDetails] Update Test Failure',
  CREATE_TEST: '[TestDetails] Create Test',
  CREATE_TEST_FAILURE: '[TestDetails] Create Test Failure',
  CREATE_TEST_SUCCESS: '[TestDetails] Create Test Success',
  UPDATE_PROCEDURE_FILTERS: '[TestDetails] Update Filters',
  CLEAR_PROCEDURE_FILTERS: '[TestDetails] Clear Filters',
  PROCEDURE_PAGINATE: '[TestDetails] Procedure Pagination',
  GET_TEST_LEADERS: '[TestDetails] Get Test Leader',
  GET_TEST_LEADERS_SUCCESS: '[TestDetails] Test Leader Success',
  CLEAR_TEST_DETAILS: '[TestDetails] Clear Test Details',
  UPDATE_DETAILS_FORM: '[TestDetails] Update Form',
  UPDATE_USER_GROUP: '[TestDetails] Update User Group',
  UPDATE_USER_GROUP_SUCCESS: '[TestDetails] Update User Group Success' ,
  UPDATE_USER_SITE: '[TestDetails] Update User Site',
  UPDATE_USER_SITE_SUCCESS: '[TestDetails] Update User Site Success'
};


export class GetTestObjects implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_OBJECTS;
}

export class GetSoftwareVersions implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_SOFTWARE_VERSION;
}

export class GetTestObjectSuccess implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_OBJECTS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetTestObjectFailure implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_OBJECTS_FAILURE;
}

export class GetTestDetails implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_DETAILS;
  constructor(public id: number) {}
}

export class GetTestDetailsSuccess implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_DETAILS_SUCCESS;
  constructor(public payload: TestDetails) {}
}

export class GetTestDetailsFailure implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_DETAILS_FAILURE;
}

export class GetTestSoftwareVersionSuccess implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_SOFTWARE_VERSION_SUCCESS;
  constructor(public payload: any) {}
}

export class GetTestSoftwareVersionFailure implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_SOFTWARE_VERSION_FAILURE;
}

export class DeleteTest implements Action {
  readonly type: string = testDetailsActionTypes.DELETE_TEST;
  constructor(public id: number) {}
}

export class DeleteTestSuccess implements Action {
  readonly type: string = testDetailsActionTypes.DELETE_TEST_SUCCESS;
}

export class DeleteTestFailure implements Action {
  readonly type: string = testDetailsActionTypes.DELETE_TEST_FAILURE;
}

export class UpdateTest implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_TEST;
}

export class UpdateTestFailure implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_TEST_FAILURE;
}

export class UpdateTestSuccess implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_TEST_SUCCESS;
}

export class CreateTest implements Action {
  readonly type: string = testDetailsActionTypes.CREATE_TEST;
}

export class CreateTestFailure implements Action {
  readonly type: string = testDetailsActionTypes.CREATE_TEST_FAILURE;
}

export class CreateTestSuccess implements Action {
  readonly type: string = testDetailsActionTypes.CREATE_TEST_SUCCESS;
}

export class UpdateProcedureFilters implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_PROCEDURE_FILTERS;
  constructor(public payload: Filter) {}
}

export class ClearProcedureFilters implements Action {
  readonly type: string = testDetailsActionTypes.CLEAR_PROCEDURE_FILTERS;
}

export class ProcedurePaginate implements Action {
  readonly type: string = testDetailsActionTypes.PROCEDURE_PAGINATE;
  constructor(public payload: PaginationParameters) {}
}

export class GetTestLeaders implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_LEADERS;
  constructor(public payload: any) {}
}

export class GetTestLeadersSuccess implements Action {
  readonly type: string = testDetailsActionTypes.GET_TEST_LEADERS_SUCCESS;
  constructor(public payload: any) {}
}

export class ClearTestDetails implements Action {
  readonly type: string = testDetailsActionTypes.CLEAR_TEST_DETAILS;
}

export class UpdateDetailsForm implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_DETAILS_FORM;
  constructor(public testDetails: TestDetails) {}
}

export class UpdateUserGroup implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_USER_GROUP;
  constructor(public payload: string) {}
}
export class UpdateUserGroupSuccess implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS;
  constructor(public payload: string) {}
}

export class UpdateUserSite implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_USER_SITE;
  constructor(public payload: any) {}
}

export class UpdateUserSiteSuccess implements Action {
  readonly type: string = testDetailsActionTypes.UPDATE_USER_SITE_SUCCESS;
  constructor(public payload: any) {}
}


export type TestDetailsActions = GetTestObjects | GetTestDetails | GetTestDetailsSuccess | GetTestDetailsFailure | GetTestObjectSuccess
  | GetTestObjectFailure | GetSoftwareVersions | GetTestSoftwareVersionSuccess | GetTestSoftwareVersionFailure | DeleteTest
  | DeleteTestSuccess | DeleteTestFailure | UpdateTest | UpdateTestFailure | UpdateTestSuccess | ProcedurePaginate | CreateTest
  | CreateTestFailure | CreateTestSuccess | UpdateProcedureFilters | ClearProcedureFilters | GetTestLeaders | GetTestLeadersSuccess
  | ClearTestDetails | UpdateDetailsForm | UpdateUserGroup | UpdateUserSite | UpdateUserGroupSuccess | UpdateUserSiteSuccess;


