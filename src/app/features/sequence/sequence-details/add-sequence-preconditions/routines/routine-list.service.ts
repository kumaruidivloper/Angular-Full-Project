import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';
import {RoutineListState, stateSelector} from './routine-list.reducer';
import {environment} from '../../../../../../environments/environment';
import {PaginatedResponse} from '../../../../../core/interfaces/paginated-response.i';
import {Routine} from './routine-list.model';


@Injectable()

export class RoutineListService {
  private state$: Observable<RoutineListState>;

  constructor(
    public Http: HttpClient,
    private store: Store<RoutineListState>) {

    this.state$ = this.store.select(stateSelector);
  }

  private urlPath = `${environment.apiUrl}/routine?status=ACTIVE`;

  getRoutineList(): Observable<PaginatedResponse<Routine[]>> {

    let parameters: HttpParams;

    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.pagination && state.pagination.page.toString())
          .set('pageSize', state.pagination && state.pagination.pageSize.toString());


        Object.keys(state.filters).forEach((key: string) => {
          if (key === 'name' || key === 'category' || key === 'private' || key === 'status') {
            parameters = parameters.set('page', '1');
          } else {
            parameters = parameters.set('page', state.pagination && state.pagination.page.toString());
          }
          parameters = parameters.set(key, `${state.filters[key]}`);
        });

        return this.Http.get<PaginatedResponse<Routine[]>>(this.urlPath, {params: parameters});

      });
  }
}
