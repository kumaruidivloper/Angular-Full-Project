import { Action } from '@ngrx/store';
import { Sequence } from './sequence-overview.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';
import { Filter } from '../../../core/interfaces/filter.model';

export const SequenceOverviewActions = {
  UPDATE_SEQUENCE_FILTER: '[SequenceOverview] Update Filters',
  CLEAR_SEQUENCE_FILTERS: '[SequenceOverview] Clear Filters',
  CLEAR_SEQUENCE_TABLE_FILTERS: '[SequenceOverview] Clear Filters of Sequence Table',
  PAGINATE: '[SequenceOverview] Pages of Sequences',
  LOAD_SEQUENCES: '[SequenceOverview] Load Sequences',
  LOAD_SEQUENCES_SUCCESS: '[SequenceOverview] Load Sequences Successfully',
  LOAD_SEQUENCES_FAILURE: '[SequenceOverview] Load Sequences Failure',
  SORT: '[SequenceOverview] Sort Sequences',
  SELECT_SEQUENCE: '[SequenceOverview] Select Sequences',
  LOAD_ALL_SEQUENCE: '[SequenceOverview] Load All Sequence',
  LOAD_TYPE_OF_SEQUENCE: '[SequenceOverview] Load Type of Sequence',
  UPDATE_SELECTED_SEQUENCE_SITE: '[SequenceOverview] Update Selected Sequence Site',
  UPDATE_SELECTED_SEQUENCE_GROUP: '[SequenceOverview] Update Selected Sequence Group',
  INITIAL_FILTER_ON_PAGE_LOAD: '[SequenceOverview] Filter On Page Load',
  INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS: '[SequenceOverview] Filter On Page Load Success',
};


export class UpdateSequenceFilters implements Action {
  readonly type: string = SequenceOverviewActions.UPDATE_SEQUENCE_FILTER;
  constructor(public filterData: Filter) {}
}

export class ClearSequenceFilters implements Action {
  readonly type: string = SequenceOverviewActions.CLEAR_SEQUENCE_FILTERS;
}

export class ClearSequenceTableFilters implements Action {
  readonly type: string = SequenceOverviewActions.CLEAR_SEQUENCE_TABLE_FILTERS;
}

export class LoadSequences implements Action {
  readonly type: string = SequenceOverviewActions.LOAD_SEQUENCES;
}

export class PaginateSequence implements Action {
  readonly type: string = SequenceOverviewActions.PAGINATE;
  constructor(public payload: PaginationParameters) {}
}

export class LoadSequencesSuccess implements Action {
  readonly type: string = SequenceOverviewActions.LOAD_SEQUENCES_SUCCESS;
  constructor(public payload: PaginatedResponse<Sequence[]>) {}
}

export class LoadSequencesFailure implements Action {
  readonly type: string = SequenceOverviewActions.LOAD_SEQUENCES_FAILURE;
}

export class SortSequence implements Action {
  readonly type: string = SequenceOverviewActions.SORT;
  constructor(public payload: string) {}
}

export class SelectSequence implements Action {
  readonly type: string = SequenceOverviewActions.SELECT_SEQUENCE;
  constructor(public sequence: Sequence) {}
}

export class LoadAllSequence implements Action {
  readonly type: string = SequenceOverviewActions.LOAD_ALL_SEQUENCE;
}

export class UpdateSelectedSequenceSite implements Action {
  readonly type: string = SequenceOverviewActions.UPDATE_SELECTED_SEQUENCE_SITE;
  constructor(public site: UserSite) {}
}

export class UpdateSelectedSequenceGroup implements Action {
  readonly type: string = SequenceOverviewActions.UPDATE_SELECTED_SEQUENCE_GROUP;
  constructor(public group: UserGroup) {}
}

export class FiltersOnPageLoad implements Action {
  readonly type: string = SequenceOverviewActions.INITIAL_FILTER_ON_PAGE_LOAD;
  constructor(public filterData: object) {}
}
export class FiltersOnPageLoadSuccess implements Action {
  readonly type: string = SequenceOverviewActions.INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS;
  constructor(public payload: PaginatedResponse<Sequence[]>) {}
}

export type SequenceOverviewActions = UpdateSequenceFilters | ClearSequenceFilters  | LoadSequences | LoadSequencesSuccess |
  LoadSequencesFailure | SortSequence | PaginateSequence | SelectSequence | LoadAllSequence | ClearSequenceTableFilters
  | FiltersOnPageLoad | FiltersOnPageLoadSuccess;

