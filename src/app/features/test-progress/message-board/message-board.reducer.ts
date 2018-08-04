import { createFeatureSelector, createSelector } from '@ngrx/store';
import { omitBy } from 'lodash';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import {
  ClearMessageFilters,
  GetMessagesSuccess,
  MessageBoardActions,
  messageBoardActionTypes,
  MessagePagination,
  UpdateMessageFilters
} from './message-board.actions';
import {MessageFilter, MessageModel} from './message-board.model';


export const messageBoardFeatureName = 'MessageBoard';

export interface MessageBoardState {
  messages: MessageModel[];
  msgFilters: MessageFilter;
  pagination: PaginationParameters;
}

export const messageBoardDefaultState: MessageBoardState = {
  messages: [],
  msgFilters: {},
  pagination: {
    page: 1,
    pageSize: 50
  }
};

export function messageBoardReducer(
                  state: MessageBoardState = messageBoardDefaultState,
                  action: MessageBoardActions): MessageBoardState {

  switch (action.type) {
    case messageBoardActionTypes.GET_MESSAGES_SUCCESS:
      return <MessageBoardState>{
        ...state,
        messages: (<GetMessagesSuccess> action).messages.data,
        pagination: (<GetMessagesSuccess> action).messages.pagination
      };
    case messageBoardActionTypes.UPDATE_MESSAGE_FILTERS:
      const filterToUpdate: object = (<UpdateMessageFilters> action).payload;
      return <MessageBoardState>{
        ...state,
        msgFilters: omitBy(filterToUpdate, value => value === '')
      };
    case messageBoardActionTypes.CLEAR_MESSAGE_FILTERS:
      const filterClear: object = (<ClearMessageFilters> action).filter;
      return <MessageBoardState> {
        ...state,
        msgFilters: omitBy(filterClear, value => value === '')
      };
    case messageBoardActionTypes.MESSAGE_PAGINATE:
      return <MessageBoardState>{
        ...state,
        pagination: (<MessagePagination>action).payload
      };
    default:
      return state;
  }
}

export const getMessages = (state: MessageBoardState) => state.messages;
export const getMsgFilters = (state: MessageBoardState) => state.msgFilters;
export const getPagination = (state: MessageBoardState) => state.pagination;

export const stateSelector = createFeatureSelector<MessageBoardState>(messageBoardFeatureName);
export const messageSelector = createSelector(stateSelector, getMessages);
export const msgFiltersSelector = createSelector(stateSelector, getMsgFilters);
export const msgPaginationSelector = createSelector(stateSelector, getPagination);



