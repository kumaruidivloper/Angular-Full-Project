import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { MessageBoardService } from './message-board.service';
import { MessageModel } from './message-board.model';
import {
  DeleteMessage,
  DeleteMessageSuccess,
  GetMessages,
  GetMessagesFailure,
  GetMessagesSuccess,
  messageBoardActionTypes,
  PostMessages,
  PostMessagesFailure,
  PostMessagesSuccess
} from './message-board.actions';
import { Router } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';

@Injectable()
export class MessageBoardEffects {
  constructor(
    private actions$: Actions,
    public messageBoardService: MessageBoardService,
    private router: Router,
    private notifyService: NotificationService) {
  }

  @Effect() getMessages$: Observable<Action> = this.actions$
    .ofType(messageBoardActionTypes.GET_MESSAGES)
    .mergeMap(( action) => {
      return this.messageBoardService.getMessages()
        .map((result: PaginatedResponse<MessageModel[]>) => new GetMessagesSuccess(result))
        .catch(() => Observable.of(new GetMessagesFailure()));
    });
  @Effect() postMessages$: Observable<Action> = this.actions$
    .ofType(messageBoardActionTypes.POST_MESSAGE)
    .mergeMap((action) => {
      return this.messageBoardService.postMessage((<PostMessages>action).message, (<PostMessages>action).id)
        .map(() => {
          this.notifyService.show('Created Message Successfully!', {position: 'top', duration: '2500', type: 'success'});
            return new PostMessagesSuccess();
        })
        .catch(() => Observable.of(new PostMessagesFailure()));
    });
  @Effect() deleteMessages$: Observable<Action> = this.actions$
    .ofType(messageBoardActionTypes.DELETE_MESSAGE)
    .mergeMap((action) => {
      return this.messageBoardService.deleteMessage((<DeleteMessage>action).id)
        .map(() => {
          this.notifyService.show('Message Deleted Successfully!', {position: 'top', duration: '2500', type: 'info'});
          return new DeleteMessageSuccess();
        });
    });

  //
  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      messageBoardActionTypes.UPDATE_MESSAGE_FILTERS,
      messageBoardActionTypes.MESSAGE_PAGINATE,
      messageBoardActionTypes.POST_MESSAGE_SUCCESS,
      messageBoardActionTypes.DELETE_MESSAGE_SUCCESS,
      messageBoardActionTypes.CLEAR_MESSAGE_FILTERS
    ]).map(() => new GetMessages());

  // @Effect() clearFilters$: Observable<Action> = this.actions$
  //   .ofType(CLEAR_FILTERS)
  //   .map(() => new EmptyFilters());
  public reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
}
