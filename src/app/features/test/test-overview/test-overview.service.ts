import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';

import { Test } from './test-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { TestOverviewState, stateSelector } from './test-overview.reducer';
import { SortDirection } from '../../../core/interfaces/sort.i';
import {environment} from '../../../../environments/environment';

@Injectable()

export class TestOverviewService {
  private state$: Observable<TestOverviewState>;
  private urlPath = `${environment.apiUrl}/test`;
  constructor(
    public Http: HttpClient,
    private store: Store<TestOverviewState>) {
    this.state$ = this.store.select(stateSelector);
  }
  getTestList(): Observable<PaginatedResponse<Test[]>> {
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
        if (state.filters) {
          Object.keys(state.filters).forEach((key: string) => {
            if (key === 'testObjectField' || key === 'name' || key === 'project' || key === 'swVersion' || key === 'testLeader') {
              parameters = parameters.set('page', '1');
            } else {
              parameters = parameters.set('page', state.pagination && state.pagination.page.toString());
            }
            parameters = parameters.set(key, `${state.filters[key]}`);
          });
        }

        if (state.initialFilter) {
          Object.keys(state.initialFilter).forEach((key: string) => {
            parameters = parameters.set(key, `${state.initialFilter[key]}`);
          });
        }

        return this.Http.get<PaginatedResponse<Test[]>>(this.urlPath, {params: parameters});
      });
  }
}
