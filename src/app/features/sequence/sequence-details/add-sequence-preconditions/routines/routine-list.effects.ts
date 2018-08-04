import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import { cloneDeep } from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/withLatestFrom';
import {
  DeSelectRoutineList,
  EmptyRoutineListFilters,
  LoadRoutineList,
  LoadRoutineListFailure,
  LoadRoutineListSuccess,
  routineListActionTypes, SelectRoutineList, UpdateSelectedRoutine
} from './routine-list.action';
import {PaginatedResponse} from '../../../../../core/interfaces/paginated-response.i';
import {Routine} from './routine-list.model';
import {RoutineListService} from './routine-list.service';
import {RoutineListState, selectedRoutineListSelector} from './routine-list.reducer';

@Injectable()

export class RoutineListEffects {
  constructor (private actions$: Actions,
               private routineListService: RoutineListService,
               private store: Store<RoutineListState>) {}

  @Effect() getRoutineList$: Observable<Action> = this.actions$
    .ofType(...[
      routineListActionTypes.LOAD_ROUTINES
    ]).mergeMap(() => {
      return this.routineListService.getRoutineList()
        .map((result: PaginatedResponse<Routine[]>) => new LoadRoutineListSuccess(result))
        .catch(() => Observable.of(new LoadRoutineListFailure()));
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      routineListActionTypes.PAGINATE_ROUTINE_LIST,
      routineListActionTypes.UPDATE_ROUTINE_FILTER
    ]).map(() => new LoadRoutineList());

  @Effect() clearFilters$: Observable<Action> = this.actions$
    .ofType(routineListActionTypes.CLEAR_ROUTINE_FILTERS)
    .map(() => new EmptyRoutineListFilters());

  @Effect() selectRoutine$: Observable<Action> = this.actions$
    .ofType( routineListActionTypes.SELECT_ROUTINE)
    .withLatestFrom(this.store.select(selectedRoutineListSelector))
    .map(([action, selectedRoutine]) => {
      const item = cloneDeep(selectedRoutine);
      item.push((<SelectRoutineList>action).routine);
      return new UpdateSelectedRoutine(item);
    });

  @Effect() deselectRoutine$: Observable<Action> = this.actions$
    .ofType( routineListActionTypes.DESELECT_ROUTINE)
    .withLatestFrom(this.store.select(selectedRoutineListSelector))
    .map(([action, selectedRoutine]) => {
      const routineID = (<DeSelectRoutineList>action).routineID;
      const routine = selectedRoutine.filter(item => item.id !== routineID);
      return new UpdateSelectedRoutine(routine);
    });
}
