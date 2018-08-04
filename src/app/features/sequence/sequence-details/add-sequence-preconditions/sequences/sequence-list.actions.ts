import { Action } from '@ngrx/store';
import {Sequence} from '../../../sequence-overview/sequence-overview.model';
import {PaginatedResponse} from '../../../../../core/interfaces/paginated-response.i';
import {PaginationParameters} from '../../../../../core/interfaces/pagination-params.i';

export const sequenceListingActionsTypes = {
  UPDATE_SEQUENCE_FILTER: '[SequenceListing] Update Filters',
  CLEAR_SEQUENCE_FILTERS: '[SequenceListing] Clear Filters',
  EMPTY_SEQUENCE_FILTERS: '[SequenceListing] Empty Filters',
  CLEAR_SEQUENCE_TABLE_FILTERS: '[SequenceListing] Clear Filters of Sequence Table',
  PAGINATE: '[SequenceListing] Pages of Sequences',
  PAGINATE_CLOCKWISE: '[SequenceListing] Pages of Sequences Clockwise',
  PAGINATE_ANTI_CLOCKWISE: '[SequenceListing] Pages of Sequences Anti Clockwise',
  LOAD_SEQUENCES: '[SequenceListing] Load Sequences',
  LOAD_SEQUENCES_SUCCESS: '[SequenceListing] Load Sequences Successfully',
  LOAD_SEQUENCES_FAILURE: '[SequenceListing] Load Sequences Failure',
  SELECT_SEQUENCE: '[SequenceListing] Select Sequences',
  DESELECT_SEQUENCE: '[SequenceListing] DeSelect Sequences',
  UPDATE_SELECTED_SEQUENCE: '[SequenceListing] Update Selected Sequences',
  LOAD_SEQUENCES_CLOCKWISE: '[SequenceListing] Load Sequences Clockwise',
  LOAD_SEQUENCES_CLOCKWISE_SUCCESS: '[SequenceListing] Load Sequences Clockwise Successfully',
  LOAD_SEQUENCES_CLOCKWISE_FAILURE: '[SequenceListing] Load Sequences Clockwise Failure',
  LOAD_SEQUENCES_ANTI_CLOCKWISE: '[SequenceListing] Load Sequences AntiClockwise',
  LOAD_SEQUENCES_ANTI_CLOCKWISE_SUCCESS: '[SequenceListing] Load Sequences AntiClockwise Successfully',
  LOAD_SEQUENCES_ANTI_CLOCKWISE_FAILURE: '[SequenceListing] Load Sequences AntiClockwise Failure'
};

export class UpdateSequenceListFilters implements Action {
  readonly type: string = sequenceListingActionsTypes.UPDATE_SEQUENCE_FILTER;
  constructor(public filterData: object, public fromPage: string) {}
}

export class PaginateClockwiseSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.PAGINATE_CLOCKWISE;
  constructor(public payload: PaginationParameters) {}
}

export class PaginateAntiClockwiseSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.PAGINATE_ANTI_CLOCKWISE;
  constructor(public payload: PaginationParameters) {}
}

export class EmptySequenceListFilters implements Action {
  readonly type: string = sequenceListingActionsTypes.EMPTY_SEQUENCE_FILTERS;
}

export class ClearSequenceListTableFilters implements Action {
  readonly type: string = sequenceListingActionsTypes.CLEAR_SEQUENCE_TABLE_FILTERS;
}

export class LoadSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES;
}

export class PaginateSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.PAGINATE;
  constructor(public payload: PaginationParameters) {}
}

export class LoadSequenceListSuccess implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_SUCCESS;
  constructor(public payload: PaginatedResponse<Sequence[]>) {}
}

export class LoadSequenceListFailure implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_FAILURE;
}

export class SelectSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.SELECT_SEQUENCE;
  constructor(public sequence: Sequence) {}
}

export class DeSelectSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.DESELECT_SEQUENCE;
  constructor(public sequenceID: number) {}
}

export class UpdateSelectedSequence implements Action {
  readonly type: string = sequenceListingActionsTypes.UPDATE_SELECTED_SEQUENCE;
  constructor(public sequence: Sequence[]) {}
}

export class LoadClockwiseSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_CLOCKWISE;
}

export class LoadClockwiseSequenceListSuccess implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_CLOCKWISE_SUCCESS;
  constructor(public payload: PaginatedResponse<Sequence[]>) {}
}

export class LoadClockwiseSequenceListFailure implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_CLOCKWISE_FAILURE;
}

export class LoadAntiClockwiseSequenceList implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_ANTI_CLOCKWISE;
}

export class LoadAntiClockwiseSequenceListSuccess implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_ANTI_CLOCKWISE_SUCCESS;
  constructor(public payload: PaginatedResponse<Sequence[]>) {}
}

export class LoadAntiClockwiseSequenceListFailure implements Action {
  readonly type: string = sequenceListingActionsTypes.LOAD_SEQUENCES_ANTI_CLOCKWISE_FAILURE;
}

export type SequenceListingActions = UpdateSequenceListFilters
                                      | EmptySequenceListFilters
                                      | ClearSequenceListTableFilters
                                      | LoadSequenceList
                                      | PaginateSequenceList
                                      | LoadSequenceListSuccess
                                      | LoadSequenceListFailure
                                      | SelectSequenceList
                                      | DeSelectSequenceList
                                      | UpdateSelectedSequence
                                      | LoadClockwiseSequenceList
                                      | LoadClockwiseSequenceListSuccess
                                      | LoadClockwiseSequenceListFailure
                                      | LoadAntiClockwiseSequenceList
                                      | LoadAntiClockwiseSequenceListSuccess
                                      | LoadAntiClockwiseSequenceListFailure
                                      | PaginateClockwiseSequenceList
                                      | PaginateAntiClockwiseSequenceList;


