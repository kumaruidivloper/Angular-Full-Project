import {
  AddProcedureLineSuccess,
  AnyAction,
  LoadProcedureSuccess,
  procedureDetailsActionTypes
} from './procedure-details.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProcedureDetails } from './procedure-details.model';
import { cloneDeep } from 'lodash';
import { EntityType } from '../../../shared/entity-type-badge/entity-type-badge.model';

export const procedureDetailsFeatureName: string = 'procedureDetail';

export interface ProcedureDetailsState {
  procedure: ProcedureDetails;
}

export const defaultProcedureDetailsState: ProcedureDetailsState = {
  procedure: null
};

export function procedureDetailsReducer(
  state: ProcedureDetailsState = defaultProcedureDetailsState,
  action: AnyAction): ProcedureDetailsState {

  switch (action.type) {
    case procedureDetailsActionTypes.LoadProcedureSuccess:
      return {
        ...state,
        procedure: (<LoadProcedureSuccess>action).procedure
      };
    case procedureDetailsActionTypes.AddProcedureLineSuccess:
      const procedureLines = cloneDeep(state.procedure.lines);
      procedureLines.push((<AddProcedureLineSuccess>action).procedureLine);

      return {
        ...state,
        procedure: {
          ...state.procedure,
          lines: procedureLines
        }
      };
    default:
      return state;
  }
}

export const getProcedure = (state: ProcedureDetailsState) => state.procedure;

export const stateSelector = createFeatureSelector<ProcedureDetailsState>(procedureDetailsFeatureName);
export const procedureSelector = createSelector(stateSelector, getProcedure);
