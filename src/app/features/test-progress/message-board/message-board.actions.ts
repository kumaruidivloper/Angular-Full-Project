import { Action } from '@ngrx/store';
import { MessageModel } from './message-board.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';

export const messageBoardActionTypes = {
  GET_MESSAGES: '[MessageBoard] Get Messages',
  GET_MESSAGES_SUCCESS: '[MessageBoard] Get Messages Success',
  GET_MESSAGES_FAILURE: '[MessageBoard] Get Messages Failure',
  POST_MESSAGE: '[MessageBoard] Send Message',
  POST_MESSAGE_SUCCESS: '[MessageBoard] Send Message Success',
  POST_MESSAGE_FAILURE: '[MessageBoard] Send Message Failure',
  DELETE_MESSAGE: '[MessageBoard] Delete Message',
  DELETE_MESSAGE_SUCCESS: '[MessageBoard] Delete Message Success',
  UPDATE_MESSAGE_FILTERS: '[MessageBoard] Update Filters',
  CLEAR_MESSAGE_FILTERS: '[MessageBoard] Clear Filters',
  MESSAGE_PAGINATE: '[MessageBoard] Procedure Pagination'
};

export class GetMessages implements Action {
  readonly type: string = messageBoardActionTypes.GET_MESSAGES;
}
export class GetMessagesSuccess implements Action {
  readonly type: string = messageBoardActionTypes.GET_MESSAGES_SUCCESS;
  constructor( public messages: PaginatedResponse<MessageModel[]>) {}
}
export class GetMessagesFailure implements Action {
  readonly type: string = messageBoardActionTypes.GET_MESSAGES_FAILURE;
}
export class PostMessages implements Action {
  readonly type: string = messageBoardActionTypes.POST_MESSAGE;
  constructor( public message:  MessageModel, public id: number) {}
}
export class PostMessagesSuccess implements Action {
  readonly type: string = messageBoardActionTypes.POST_MESSAGE_SUCCESS;
}
export class PostMessagesFailure implements Action {
  readonly type: string = messageBoardActionTypes.POST_MESSAGE_FAILURE;
}
export class UpdateMessageFilters implements Action {
  readonly type: string = messageBoardActionTypes.UPDATE_MESSAGE_FILTERS;
  // constructor( public filter: object) {}
  constructor(public payload: object) {}
}
export class ClearMessageFilters implements Action {
  readonly type: string = messageBoardActionTypes.CLEAR_MESSAGE_FILTERS;
  constructor(public filter: object) {}
}
export class MessagePagination implements Action {
  readonly type: string = messageBoardActionTypes.MESSAGE_PAGINATE;
  constructor(public payload: PaginationParameters) {}
}
export class DeleteMessage implements Action {
  readonly type: string = messageBoardActionTypes.DELETE_MESSAGE;
  constructor( public id: number) {}
}
export class DeleteMessageSuccess implements Action {
  readonly type: string = messageBoardActionTypes.DELETE_MESSAGE_SUCCESS;
}


export type MessageBoardActions = GetMessages | GetMessagesSuccess | GetMessagesFailure
                                  | PostMessages | PostMessagesSuccess | PostMessagesFailure
                                  | UpdateMessageFilters | ClearMessageFilters | MessagePagination
                                  | DeleteMessage | DeleteMessageSuccess;

