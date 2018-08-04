import { createFeatureSelector, createSelector } from '@ngrx/store';
import { omitBy } from 'lodash';
import {
  LoadAntiClockwiseSequenceListSuccess,
  LoadClockwiseSequenceListSuccess,
  LoadSequenceListSuccess, PaginateAntiClockwiseSequenceList, PaginateClockwiseSequenceList,
  PaginateSequenceList,
  SequenceListingActions,
  sequenceListingActionsTypes,
  UpdateSelectedSequence,
  UpdateSequenceListFilters
} from './sequence-list.actions';
import { Sequence } from '../../../sequence-overview/sequence-overview.model';
import { PaginationParameters } from '../../../../../core/interfaces/pagination-params.i';

export const sequenceListingFeatureName = 'SequenceListing';

export interface SequenceListingState {
  sequences: Sequence[];
  pagination: PaginationParameters;
  paginationClockwise: PaginationParameters;
  paginationAntiClockwise: PaginationParameters;
  filters: any;
  clockWiseFilters: any;
  antiClockWiseFilters: any;
  selectedSequence: Sequence[];
  clockWiseSequence: Sequence[];
  antiClockWiseSequence: Sequence[];
}


export const sequenceListingDefaultState: SequenceListingState = {
  sequences: [],
  pagination: {
    page: 1,
    pageSize: 6
  },
  paginationClockwise: {
    page: 1,
    pageSize: 6
  },
  paginationAntiClockwise: {
    page: 1,
    pageSize: 6
  },
  selectedSequence: [],
  filters: {},
  clockWiseFilters: {},
  antiClockWiseFilters: {},
  clockWiseSequence: [],
  antiClockWiseSequence: []
};


export function sequenceListingReducer (
  state: SequenceListingState = sequenceListingDefaultState,
  action: SequenceListingActions): SequenceListingState {


  switch (action.type) {
    case sequenceListingActionsTypes.LOAD_SEQUENCES_SUCCESS:
        return <SequenceListingState>{
          ...state,
          sequences: (<LoadSequenceListSuccess> action).payload.data,
          pagination: (<LoadSequenceListSuccess> action).payload.pagination
        };
    case sequenceListingActionsTypes.LOAD_SEQUENCES_CLOCKWISE_SUCCESS:
      return <SequenceListingState>{
        ...state,
        clockWiseSequence: (<LoadClockwiseSequenceListSuccess> action).payload.data,
        paginationClockwise: (<LoadClockwiseSequenceListSuccess> action).payload.pagination
      };
    case sequenceListingActionsTypes.LOAD_SEQUENCES_ANTI_CLOCKWISE_SUCCESS:
      return <SequenceListingState>{
        ...state,
        antiClockWiseSequence: (<LoadAntiClockwiseSequenceListSuccess> action).payload.data,
        paginationAntiClockwise: (<LoadAntiClockwiseSequenceListSuccess> action).payload.pagination
      };
    case sequenceListingActionsTypes.UPDATE_SEQUENCE_FILTER:
      const filterToUpdate: object = (<UpdateSequenceListFilters> action).filterData;
      const fromPage = (<UpdateSequenceListFilters>action).fromPage;
      if ( fromPage === 'clockwise') {
        return <SequenceListingState>{
          ...state,
          clockWiseFilters: omitBy(filterToUpdate, value => value === '')
        };
      } else if ( fromPage === 'anti-clockwise') {
        return <SequenceListingState>{
          ...state,
          antiClockWiseFilters: omitBy(filterToUpdate, value => value === '')
        };
      } else {
        return <SequenceListingState>{
          ...state,
          filters: omitBy(filterToUpdate, value => value === '')
        };
      }
    case sequenceListingActionsTypes.PAGINATE:
      return <SequenceListingState>{
        ...state,
        pagination: (<PaginateSequenceList>action).payload
      };
    case sequenceListingActionsTypes.PAGINATE_CLOCKWISE:
      return <SequenceListingState>{
        ...state,
        paginationClockwise: (<PaginateClockwiseSequenceList>action).payload
      };
    case sequenceListingActionsTypes.PAGINATE_ANTI_CLOCKWISE:
      return <SequenceListingState>{
        ...state,
        paginationAntiClockwise: (<PaginateAntiClockwiseSequenceList>action).payload
      };
    case sequenceListingActionsTypes.UPDATE_SELECTED_SEQUENCE:
      return <SequenceListingState>{
        ...state,
        selectedSequence: (<UpdateSelectedSequence> action).sequence
      };
    default:
      return state;
  }

}



export const getSequenceLists = (state: SequenceListingState) => state.sequences;
export const getClockwiseSequenceLists = (state: SequenceListingState) => state.clockWiseSequence;
export const getAntiClockwiseSequenceLists = (state: SequenceListingState) => state.antiClockWiseSequence;
export const getSequenceListPagination = (state: SequenceListingState) => state.pagination;
export const getSequenceClockwiseListPagination = (state: SequenceListingState) => state.paginationClockwise;
export const getSequenceAntiClockwiseListPagination = (state: SequenceListingState) => state.paginationAntiClockwise;
export const getClockwiseFilters = (state: SequenceListingState) => state.clockWiseFilters;
export const getAntiClockwiseFilters = (state: SequenceListingState) => state.antiClockWiseSequence;
export const getSequenceListFilters = (state: SequenceListingState) => state.filters;
export const getSequenceSelected = (state: SequenceListingState) => state.selectedSequence;

export const stateSelector = createFeatureSelector<SequenceListingState>(sequenceListingFeatureName);
export const sequenceListSelector = createSelector(stateSelector, getSequenceLists);
export const clockWiseSequenceListSelector = createSelector(stateSelector, getClockwiseSequenceLists);
export const antiClockWiseSequenceListSelector = createSelector(stateSelector, getAntiClockwiseSequenceLists);
export const paginationSequenceListSelector = createSelector(stateSelector, getSequenceListPagination);
export const paginationClockwiseSequenceListSelector = createSelector(stateSelector, getSequenceClockwiseListPagination);
export const paginationAntiClockwiseSequenceListSelector = createSelector(stateSelector, getSequenceAntiClockwiseListPagination);
export const filtersSequenceListSelector = createSelector(stateSelector, getSequenceListFilters);
export const clockWiseFilterSelector = createSelector(stateSelector, getClockwiseFilters);
export const antiClockWiseFilterSelector = createSelector(stateSelector, getAntiClockwiseFilters);
export const selectedSequenceListSelector = createSelector(stateSelector, getSequenceSelected);
