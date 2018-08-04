import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { cloneDeep, uniqBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { PaginatedResponse } from '../../../../core/interfaces/paginated-response.i';
import { ProceduresService } from '../../../procedure/procedures.service';
import { testDetailsActionTypes, UpdateDetailsForm } from '../test-details.actions';
import { TestProcedure } from '../test-details.model';
import { testDetailsSelector } from '../test-details.reducer';
import {
  DELETE_PROCEDURE,
  DeleteProcedure,
  DESELECT_PROCEDURE,
  DeselectProcedure,
  GET_PROCEDURE,
  LoadProcedureFailure,
  LoadProcedureSuccess,
  REORDER_PROCEDURES,
  ReorderProcedures,
  SELECT_PROCEDURE,
  SelectProcedure,
  UpdateSelectedTestProcedures
} from './test-details-procedures.actions';
import { selectedTestProceduresSelector, TestDetailsProceduresState } from './test-details-procedures.reducer';

@Injectable()
export class TestDetailsProceduresEffects {
  constructor(private actions$: Actions,
              private store: Store<TestDetailsProceduresState>,
              private proceduresService: ProceduresService) {
  }

  @Effect() selectProcedure$: Observable<Action> = this.actions$
    .ofType(SELECT_PROCEDURE)
    .withLatestFrom(this.store.select(selectedTestProceduresSelector))
    .map(([action, selectedTestProcedures]) => {
      let testProcedures = cloneDeep(selectedTestProcedures);
      testProcedures.push((<SelectProcedure>action).procedure);
      testProcedures = uniqBy(testProcedures, 'name');
      return new UpdateSelectedTestProcedures(testProcedures);
    });

  @Effect() deselectProcedure$: Observable<Action> = this.actions$
    .ofType(DESELECT_PROCEDURE)
    .withLatestFrom(this.store.select(selectedTestProceduresSelector))
    .map(([action, selectedTestProcedures]) => {
      const procedureId = (<DeselectProcedure>action).procedureId;
      const testProcedures = selectedTestProcedures.filter(procedure => procedure.id === procedureId);

      return new UpdateSelectedTestProcedures(testProcedures);
    });

  @Effect() getProcedure$: Observable<Action> = this.actions$
    .ofType(GET_PROCEDURE)
    .mergeMap(() => {
      return this.proceduresService.loadProcedures()
        .map((result: PaginatedResponse<TestProcedure[]>) => {
          return new LoadProcedureSuccess(result);
        })
        .catch(() => {
          return Observable.of(new LoadProcedureFailure());
        });
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      testDetailsActionTypes.UPDATE_PROCEDURE_FILTERS,
      testDetailsActionTypes.CLEAR_PROCEDURE_FILTERS,
      testDetailsActionTypes.PROCEDURE_PAGINATE
    ])
    .map(() => {
      // @todo creating actions using new ActionName()
      return {
        type: GET_PROCEDURE
      };
    });

  @Effect() reorderProcedures$: Observable<Action> = this.actions$
    .ofType(REORDER_PROCEDURES)
    .withLatestFrom(this.store.select(testDetailsSelector))
    .map(([action, testDetails]) => {
      const { from, to } = <ReorderProcedures>action;
      const procedures: TestProcedure[] = cloneDeep(testDetails.testProcedure);
      procedures.splice(to, 0, procedures.splice(from, 1)[0]);

      return new UpdateDetailsForm({
        ...testDetails,
        testProcedure: procedures
      });
    });

  @Effect() deleteProcedure$: Observable<Action> = this.actions$
    .ofType(DELETE_PROCEDURE)
    .withLatestFrom(this.store.select(testDetailsSelector))
    .map(([action, testDetails]) => {
      const procedures = cloneDeep(testDetails.testProcedure);
      procedures.splice((<DeleteProcedure>action).procedure, 1);

      return new UpdateDetailsForm({
        ...testDetails,
        testProcedure: procedures
      });
    });
}
