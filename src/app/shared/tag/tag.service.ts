import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { PaginatedResponse } from '../../core/interfaces/paginated-response.i';
import { Store} from '@ngrx/store';
import { Tag } from './tag.model';
import { SortDirection } from '../../core/interfaces/sort.i';
import {tagStateSelector, TagComponentState} from './tag.reducer';
import {environment} from '../../../environments/environment';

@Injectable()
export class TagComponentService {
  private state$: Observable<TagComponentState>;
  public urlPath = `${environment.apiUrl}/testCaseStep/tags`;
  constructor(public Http: HttpClient,
              private store: Store<TagComponentState>) {

  this.state$ = this.store.select(tagStateSelector);
}

  getTagList(): Observable<PaginatedResponse<Tag[]>> {
    let parameters: HttpParams;

    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.tagPagination && state.tagPagination.page.toString())
          .set('pageSize', state.tagPagination && state.tagPagination.pageSize.toString());

        if (state.tagSort) {
          parameters = parameters
            .set('sort', `${state.tagSort.field}-${SortDirection[state.tagSort.direction]}`);
        }

        Object.keys(state.tagFilters).forEach((key: string) => {
          parameters = parameters.set(key, `${state.tagFilters[key]}`);
          parameters = parameters.set('page', '1');
        });

        return this.Http.get<PaginatedResponse<Tag[]>>(this.urlPath, {params: parameters});
      });
  }

}
