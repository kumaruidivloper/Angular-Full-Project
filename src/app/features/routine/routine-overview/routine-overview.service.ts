import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';

import { RoutineOverviewState, stateSelector } from './routine-overview.reducer';

import { Routine } from './routine-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { SortDirection } from '../../../core/interfaces/sort.i';
import {environment} from '../../../../environments/environment';



@Injectable()

export class RoutineOverviewService {
  private state$: Observable<RoutineOverviewState>;

  constructor(
    public Http: HttpClient,
    private store: Store<RoutineOverviewState>) {

    this.state$ = this.store.select(stateSelector);
  }

  private urlPath = `${environment.apiUrl}/routine`;

  getRoutineList(): Observable<PaginatedResponse<Routine[]>> {

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
          if (key === 'name' || key === 'category' || key === 'private' || key === 'status') {
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
        return this.Http.get<PaginatedResponse<Routine[]>>(this.urlPath, {params: parameters});

      });
  }
}
