import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/withLatestFrom';
import { ProcedureOverviewService } from './procedure-overview.service';
import { Procedure } from './procedure-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import {
  EmptyFilters,
  LoadProcedures,
  LoadProceduresFailure,
  LoadProceduresSuccess,
  procedureOverviewActionTypes
} from './procedure-overview.actions';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeLast';

@Injectable()
export class ProcedureOverviewEffects {
  constructor (private actions$: Actions, public procedureOverviewService: ProcedureOverviewService ) {}

  @Effect() getProcedureList$: Observable<Action> = this.actions$
    .ofType(procedureOverviewActionTypes.LOAD_PROCEDURES)
    .mergeMap(() => {
       return this.procedureOverviewService.getProcedureList()
         .map((result: PaginatedResponse<Procedure[]>) => new LoadProceduresSuccess(result))
         .catch(() => Observable.of(new LoadProceduresFailure()));
      });
  @Effect() getProcedureListOnLoad$: Observable<Action> = this.actions$
    .ofType(procedureOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD)
    .mergeMap(() => {
      return this.procedureOverviewService.getProcedureList()
        .map((result: PaginatedResponse<Procedure[]>) => new LoadProceduresSuccess(result))
        .catch(() => Observable.of(new LoadProceduresFailure()));
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      procedureOverviewActionTypes.PAGINATE,
      procedureOverviewActionTypes.UPDATE_PROCEDURE_FILTER,
      procedureOverviewActionTypes.SORT,
      procedureOverviewActionTypes.LOAD_ALL_PROCEDURE,
      procedureOverviewActionTypes.LOAD_TYPE_OF_PROCEDURE,
      procedureOverviewActionTypes.CLEAR_PROCEDURE_TABLE_FILTERS
    ]).map(() => new LoadProcedures());

  @Effect() clearFilters$: Observable<Action> = this.actions$
    .ofType(procedureOverviewActionTypes.CLEAR_PROCEDURE_FILTERS)
    .map(() => new EmptyFilters());
}
