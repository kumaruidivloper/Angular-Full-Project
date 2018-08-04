import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { PaginatedResponse } from '../../core/interfaces/paginated-response.i';
import { Store} from '@ngrx/store';
import { Tool } from './tool.model';
import { SortDirection } from '../../core/interfaces/sort.i';
import {toolsStateSelector, ToolComponentState} from './tool.reducer';
import {environment} from '../../../environments/environment';

@Injectable()
export class ToolComponentService {
  private state$: Observable<ToolComponentState>;
  public urlPath = `${environment.apiUrl}/testCaseStep/tools`;

  constructor(public Http: HttpClient,
              private store: Store<ToolComponentState>) {
               this.state$ = this.store.select(toolsStateSelector);
              }

  getToolList(): Observable<PaginatedResponse<Tool[]>> {
    let parameters: HttpParams;

    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.toolsPagination && state.toolsPagination.page.toString())
          .set('pageSize', state.toolsPagination && state.toolsPagination.pageSize.toString());

        if (state.toolsSort) {
          parameters = parameters
            .set('sort', `${state.toolsSort.field}-${SortDirection[state.toolsSort.direction]}`);
        }

        Object.keys(state.toolsFilters).forEach((key: string) => {
          parameters = parameters.set(key, `${state.toolsFilters[key]}`);
          parameters = parameters.set('page', '1');
        });

        return this.Http.get<PaginatedResponse<Tool[]>>(this.urlPath, {params: parameters});
      });
  }

}
