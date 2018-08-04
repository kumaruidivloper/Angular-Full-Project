import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';

import { ProcedureOverviewState, stateSelector } from './procedure-overview.reducer';
import { Procedure } from './procedure-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { SortDirection } from '../../../core/interfaces/sort.i';
import {environment} from '../../../../environments/environment';


@Injectable()

export class ProcedureOverviewService {

  private state$: Observable<ProcedureOverviewState>;

  constructor(public Http: HttpClient,
              private store: Store<ProcedureOverviewState>) {

    this.state$ = this.store.select(stateSelector);
  }

  private urlPath = `${environment.apiUrl}/procedure`;

  getProcedureList(): Observable<PaginatedResponse<Procedure[]>> {

    let parameters: HttpParams;

    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.pagination && state.pagination.page.toString())
          .set('pageSize', state.pagination && state.pagination.pageSize.toString());

        if (state.sort) {
          parameters = parameters
            .set('sort', `${state.sort.field}-${SortDirection[state.sort.direction]}`);
        }

        Object.keys(state.filters).forEach((key: string) => {
          if (key === 'name' || key === 'basedOn' || key === 'category' || key === 'changed') {
            parameters = parameters.set('page', '1');
          } else {
            parameters = parameters.set('page', state.pagination && state.pagination.page.toString());
          }
          parameters = parameters.set(key, `${state.filters[key]}`);
        });

        if (state.initialFilter) {
          Object.keys(state.initialFilter).forEach((key: string) => {
            parameters = parameters.set(key, `${state.initialFilter[key]}`);
          });
        }
        return this.Http.get<PaginatedResponse<Procedure[]>>(this.urlPath, {params: parameters});

      });
  }
}
