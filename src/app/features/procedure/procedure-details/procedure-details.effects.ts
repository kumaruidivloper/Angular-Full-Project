import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import {
  AddProcedureLineSuccess,
  AddRoutine,
  AddSequence,
  LoadProcedure,
  LoadProcedureFailure,
  LoadProcedureSuccess,
  procedureDetailsActionTypes
} from './procedure-details.actions';
import { ProceduresService } from '../procedures.service';
import { Router } from '@angular/router';
import { SequenceDetailsService } from '../../sequence/sequence-details/sequence-details.service';
import { SequenceDetails } from '../../sequence/sequence-details/sequence-details.model';
import { EntityType } from '../../../shared/entity-type-badge/entity-type-badge.model';
import { RoutineDetailsService } from '../../routine/routine-details/routine-details.service';
import { RoutineDetails } from '../../routine/routine-details/routine-details.model';
import { cloneDeep } from 'lodash';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { ProcedureDetailsState, procedureSelector } from './procedure-details.reducer';
import { ProcedureDetails } from './procedure-details.model';
import { NotificationService } from 'ng2-notify-popup';
import { errorNotificationConfig, successNotificationConfig } from '../../../shared/notification/notification.config';

@Injectable()
export class ProcedureDetailsEffects {
  constructor(private actions$: Actions,
              private proceduresService: ProceduresService,
              private sequenceDetailsService: SequenceDetailsService,
              private routineDetailsService: RoutineDetailsService,
              private router: Router,
              private store: Store<ProcedureDetailsState>,
              private notificationService: NotificationService) {}

  @Effect() loadProcedure$: Observable<Action> = this.actions$
    .ofType(procedureDetailsActionTypes.LoadProcedure)
    .mergeMap((action: LoadProcedure) => {
      return this.proceduresService.loadProcedureDetails(action.id)
        .map((procedure) => {
          return new LoadProcedureSuccess(procedure);
        })
        .catch(() => Observable.of(new LoadProcedureFailure()));
    });

  @Effect({ dispatch: false }) loadProcedureFailure$: Observable<Action> = this.actions$
    .ofType(procedureDetailsActionTypes.LoadProcedureFailure)
    .do(() => {
      this.router.navigate(['procedure']);
    });

  @Effect() addSequence$: Observable<Action> = this.actions$
    .ofType(procedureDetailsActionTypes.AddSequence)
    .withLatestFrom(this.store.select(procedureSelector))
    .mergeMap(([action, procedure]: [AddSequence, ProcedureDetails]) => {
      const lineNo: number = procedure.lines.length
        ? procedure.lines[procedure.lines.length - 1].lineNo + 1
        : 1;

      return this.sequenceDetailsService.getSequenceDetails(action.sequenceId)
        .map((sequence: SequenceDetails) => new AddProcedureLineSuccess({
          lineNo,
          id: 0,
          sequence: this.transformSequence(sequence),
          procedureLineType: EntityType.SEQUENCE
        }));
    });

  @Effect() addRoutine$: Observable<Action> = this.actions$
    .ofType(procedureDetailsActionTypes.AddRoutine)
    .withLatestFrom(this.store.select(procedureSelector))
    .mergeMap(([action, procedure]: [AddRoutine, ProcedureDetails]) => {
      const lineNo: number = procedure.lines.length
        ? procedure.lines[procedure.lines.length - 1].lineNo + 1
        : 1;

      return this.routineDetailsService.getRoutineDetails(action.routineId)
        .map((routine: RoutineDetails) => new AddProcedureLineSuccess({
          lineNo,
          id: 0,
          routine: routine,
          procedureLineType: EntityType.ROUTINE
        }));
    });

  @Effect({ dispatch: false }) saveProcedure$: Observable<void> = this.actions$
    .ofType(procedureDetailsActionTypes.SaveProcedure)
    .withLatestFrom(this.store.select(procedureSelector))
    .mergeMap(([action, procedure]) => {
      return this.proceduresService.saveProcedure(procedure)
        .map(() => this.notificationService.show('Procedure Saved', successNotificationConfig))
        .catch(() => Observable.of(this.notificationService.show('Failed To Save Procedure', errorNotificationConfig)));
    });

  private transformSequence(sequence: SequenceDetails): SequenceDetails {
    const transformedSequence = cloneDeep(sequence);

    transformedSequence.sequenceLines = transformedSequence.sequenceLines.map(sequenceLine => {
      sequenceLine.id = 0;
      return sequenceLine;
    });

    return transformedSequence;
  }
}
