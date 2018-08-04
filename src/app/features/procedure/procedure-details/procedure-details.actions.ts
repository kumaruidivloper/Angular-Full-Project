import { Action } from '@ngrx/store';
import { Procedure } from '../procedure-overview/procedure-overview.model';
import { ProcedureDetails, ProcedureLine } from './procedure-details.model';

export const procedureDetailsActionTypes = {
  LoadProcedure: '[Procedure Details] Load Procedure',
  LoadProcedureSuccess: '[Procedure Details] Load Procedure Success',
  LoadProcedureFailure: '[Procedure Details] Load Procedure Failure',
  AddSequence: '[Procedure Details] Add Sequence',
  AddRoutine: '[Procedure Details] Add Routine',
  AddProcedureLineSuccess: '[Procedure Details] Add Procedure Line Success',
  SaveProcedure: '[Procedure Details] Save Procedure'
};

export class LoadProcedure implements Action {
  public type: string = procedureDetailsActionTypes.LoadProcedure;
  constructor(public id: string) {}
}

export class LoadProcedureSuccess implements Action {
  public type: string = procedureDetailsActionTypes.LoadProcedureSuccess;
  constructor(public procedure: ProcedureDetails) {}
}

export class LoadProcedureFailure implements Action {
  public type: string = procedureDetailsActionTypes.LoadProcedureFailure;
}

export class AddSequence implements Action {
  public readonly type: string = procedureDetailsActionTypes.AddSequence;
  constructor(public sequenceId: number) {}
}

export class AddRoutine implements Action {
  public readonly type: string = procedureDetailsActionTypes.AddRoutine;
  constructor(public routineId: number) {}
}

export class AddProcedureLineSuccess implements Action {
  public readonly type: string = procedureDetailsActionTypes.AddProcedureLineSuccess;
  constructor(public procedureLine: ProcedureLine) {}
}

export class SaveProcedure implements Action {
  type: string = procedureDetailsActionTypes.SaveProcedure;
}

export type AnyAction = LoadProcedure | LoadProcedureSuccess | LoadProcedureFailure | AddSequence
  | AddProcedureLineSuccess | AddRoutine | SaveProcedure;
