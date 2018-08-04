import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { SortDirection } from '../../../core/interfaces/sort.i';
import { environment } from '../../../../environments/environment';
import { TestProgress } from './test-progress-overview.model';
import { stateSelector, TestProgressOverviewState } from './test-progress-overview.reducer';


@Injectable()

export class TestProgressOverviewService {
  private state$: Observable<TestProgressOverviewState>;
  private urlPath = `${environment.apiUrl}/testprogress`;

  constructor(
    public Http: HttpClient,
    private store: Store<TestProgress>) {
    this.state$ = this.store.select(stateSelector);
  }

getTestProgressList(): Observable<PaginatedResponse<TestProgress[]>> {
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
        parameters = parameters.set(key, `${state.filters[key]}`);
        parameters = parameters.set('page', '1');
      });
    }

    if (state.initialFilter) {
      Object.keys(state.initialFilter).forEach((key: string) => {
        parameters = parameters.set(key, `${state.initialFilter[key]}`);
      });
    }

    return this.Http.get<PaginatedResponse<TestProgress[]>>(this.urlPath, {params: parameters});
  });
}
}
