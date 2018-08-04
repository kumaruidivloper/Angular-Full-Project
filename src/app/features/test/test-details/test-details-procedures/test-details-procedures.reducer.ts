import { TestProcedure } from '../test-details.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GET_PROCEDURE_SUCCESS, LoadProcedureSuccess,
  TestDetailsProceduresAction, UPDATE_SELECTED_TEST_PROCEDURES, UpdateSelectedTestProcedures
} from './test-details-procedures.actions';
import { PaginationParameters } from '../../../../core/interfaces/pagination-params.i';

export const testDetailsProceduresFeatureName: string = 'TestDetailsProcedures';

export interface TestDetailsProceduresState {
  testProcedures: TestProcedure[];
  selectedTestProcedures: TestProcedure[];
  pagination: PaginationParameters;
}

export const defaultTestDetailsProceduresState: TestDetailsProceduresState = {
  testProcedures: [],
  selectedTestProcedures: [],
  pagination: {
    page: 1,
    pageSize: 5
  },
};

export function testDetailsProceduresReducer(state: TestDetailsProceduresState = defaultTestDetailsProceduresState,
                                             action: TestDetailsProceduresAction): TestDetailsProceduresState {
  switch (action.type) {
    case UPDATE_SELECTED_TEST_PROCEDURES:
      return {
        ...state,
        selectedTestProcedures: (<UpdateSelectedTestProcedures>action).procedures
      };
    case GET_PROCEDURE_SUCCESS:
      return <TestDetailsProceduresState>{
        ...state,
        testProcedures: (<LoadProcedureSuccess> action).payload.data,
        pagination: (<LoadProcedureSuccess> action).payload.pagination
      };
    default:
      return state;
  }
}

export const getTestProcedures = (state: TestDetailsProceduresState) => state.testProcedures;
export const getSelectedTestProcedures = (state: TestDetailsProceduresState) => state.selectedTestProcedures;
export const getTestProceduresPagination = (state: TestDetailsProceduresState) => state.pagination;

export const stateSelector = createFeatureSelector<TestDetailsProceduresState>(testDetailsProceduresFeatureName);
export const testProceduresSelector = createSelector(stateSelector, getTestProcedures);
export const selectedTestProceduresSelector = createSelector(stateSelector, getSelectedTestProcedures);
export const testProceduresPaginationSelector = createSelector(stateSelector, getTestProceduresPagination);


//  @TODO missing test coverage
