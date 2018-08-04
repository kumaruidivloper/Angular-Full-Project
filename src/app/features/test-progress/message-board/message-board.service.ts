import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import {environment} from '../../../../environments/environment';
import {MessageBoardState, stateSelector} from './message-board.reducer';


@Injectable()
export class MessageBoardService {
// @todo all hard code data has to be made dynamic after test Progress overview
  private getMessageURL = `${environment.apiUrl}/message`;
  private postMessageURL = `${environment.apiUrl}/message/`;
  private deleteMessageURL = `${environment.apiUrl}/message/`;
  private state$: Observable<MessageBoardState>;

  constructor(public Http: HttpClient,
              private store: Store<MessageBoardState>) {
                this.state$ = this.store.select(stateSelector);
  }

  getMessages(): Observable<any> {
    let parameters: HttpParams;
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.pagination && state.pagination.page.toString())
          .set('pageSize', state.pagination && state.pagination.pageSize.toString());

        Object.keys(state.msgFilters).forEach((key: string) => {
          if (key === 'name' || key === 'createdDate') {
            parameters = parameters.set('page', '1');
          } else {
            parameters = parameters.set('page', state.pagination && state.pagination.page.toString());
          }
          parameters = parameters.set(key, `${state.msgFilters[key]}`);
        });
        return this.Http.get<any>(this.getMessageURL, {params: parameters});

      });

  }

  postMessage(messageData, id): Observable<any> {
    return this.Http.post<any>(this.postMessageURL + id, messageData);
  }

  deleteMessage(id): Observable<any> {
    return this.Http.delete<any>(this.deleteMessageURL + id);
  }
}
