import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SequenceListingState, stateSelector } from './sequence-list.reducer';
import { Store } from '@ngrx/store';
import { PaginatedResponse } from '../../../../../core/interfaces/paginated-response.i';
import { Sequence } from '../../../sequence-overview/sequence-overview.model';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class SequenceListService {
  private state$: Observable<SequenceListingState>;

  constructor(public Http: HttpClient,
              private store: Store<SequenceListingState>) {

    this.state$ = this.store.select(stateSelector);
  }

  private urlPath = `${environment.apiUrl}/sequence`;

  public getSequencesList(): Observable<PaginatedResponse<Sequence[]>> {
    let parameters: HttpParams;
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.pagination && state.pagination.page.toString())
          .set('pageSize', state.pagination && state.pagination.pageSize.toString());

        Object.keys(state.filters).forEach((key: string) => {
          if (key === 'name' || key === 'category' || key === 'private' || key === 'trackDirection') {
            parameters = parameters.set('page', '1');
          } else {
            parameters = parameters.set('page', state.pagination && state.pagination.page.toString());
          }
          parameters = parameters.set(key, `${state.filters[key]}`);
        });

        return this.Http.get<PaginatedResponse<Sequence[]>>(this.urlPath, {params: parameters});
      });
  }

  public getClockwiseSequencesList(): Observable<PaginatedResponse<Sequence[]>> {
    let parameters: HttpParams;
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.paginationClockwise && state.paginationClockwise.page.toString())
          .set('pageSize', state.paginationClockwise && state.paginationClockwise.pageSize.toString());

        Object.keys(state.clockWiseFilters).forEach((key: string) => {
          if (key === 'name' || key === 'category' || key === 'private') {
            parameters = parameters.set('page', '1');
          } else {
            parameters = parameters.set('page', state.paginationClockwise && state.paginationClockwise.page.toString());
          }
          parameters = parameters.set(key, `${state.clockWiseFilters[key]}`);
        });
        return this.Http.get<PaginatedResponse<Sequence[]>>(this.urlPath + '?trackDirectionOptions=CLOCKWISE', {params: parameters});
      });
  }

  public getAntiClockwiseSequencesList(): Observable<PaginatedResponse<Sequence[]>> {
    let parameters: HttpParams;
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.paginationAntiClockwise && state.paginationAntiClockwise.page.toString())
          .set('pageSize', state.paginationAntiClockwise && state.paginationAntiClockwise.pageSize.toString());

        Object.keys(state.antiClockWiseFilters).forEach((key: string) => {
          if (key === 'name' || key === 'category' || key === 'private') {
            parameters = parameters.set('page', '1');
          } else {
            parameters = parameters.set('page', state.paginationAntiClockwise && state.paginationAntiClockwise.page.toString());
          }
          parameters = parameters.set(key, `${state.antiClockWiseFilters[key]}`);
        });
        return this.Http.get<PaginatedResponse<Sequence[]>>(this.urlPath + '?trackDirectionOptions=ANTICLOCKWISE', {params: parameters});
      });
  }
}

