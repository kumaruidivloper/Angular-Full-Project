import { Action } from '@ngrx/store';
import { TestProcedure } from '../test-details.model';
import { PaginatedResponse } from '../../../../core/interfaces/paginated-response.i';

// @todo, we should apply the same refactoring here as was done in test-details.actions.ts
export const SELECT_PROCEDURE = '[TestDetailsProcedures] Select Procedure';
export const DESELECT_PROCEDURE = '[TestDetailsProcedures] Deselect Procedure';
export const UPDATE_SELECTED_TEST_PROCEDURES = '[TestDetailsProcedures] Update Selected Test Procedures';
export const GET_PROCEDURE = '[TestDetailsProcedures] Get Procedure';
export const GET_PROCEDURE_SUCCESS = '[TestDetailsProcedures] Get Procedure Success';
export const GET_PROCEDURE_FAILURE = '[TestDetailsProcedures] Get Procedure Failure';
export const REORDER_PROCEDURES = '[TestDetailsProcedures] Reorder Procedures';
export const DELETE_PROCEDURE = '[TestDetailsProcedures] Delete Procedure';

export class SelectProcedure implements Action {
  readonly type: string = SELECT_PROCEDURE;
  constructor(public procedure: TestProcedure) {}
}

export class DeselectProcedure implements Action {
  readonly type: string = DESELECT_PROCEDURE;
  constructor(public procedureId: number) {}
}

export class UpdateSelectedTestProcedures implements Action {
  readonly type: string = UPDATE_SELECTED_TEST_PROCEDURES;
  constructor(public procedures: TestProcedure[]) {}
}

export class LoadProcedure implements Action {
  readonly type: string = GET_PROCEDURE;
}

export class LoadProcedureSuccess implements Action {
  readonly type: string = GET_PROCEDURE_SUCCESS;
  constructor(public payload: PaginatedResponse<TestProcedure[]>) {}
}

export class LoadProcedureFailure implements Action {
  readonly type: string = GET_PROCEDURE_FAILURE;
}

export class ReorderProcedures implements Action {
  readonly type: string = REORDER_PROCEDURES;

  constructor(public from: number, public to: number) {}
}

export class DeleteProcedure implements Action {
  readonly type: string = DELETE_PROCEDURE;

  constructor(public procedure: number) {}
}

export type TestDetailsProceduresAction = SelectProcedure | DeselectProcedure | UpdateSelectedTestProcedures
  | LoadProcedure | LoadProcedureSuccess | LoadProcedureFailure;
