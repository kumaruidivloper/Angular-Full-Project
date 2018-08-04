import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { cloneDeep, omitBy, pick } from 'lodash';
import { Sequence } from './sequence-overview.model';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';
import {
  FiltersOnPageLoad,
  LoadSequencesSuccess,
  PaginateSequence,
  SelectSequence,
  SequenceOverviewActions,
  SortSequence,
  UpdateSelectedSequenceGroup,
  UpdateSelectedSequenceSite,
  UpdateSequenceFilters
} from './sequence-overview.action';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import { Filter } from '../../../core/interfaces/filter.model';


export const sequenceOverviewFeatureName = 'SequenceOverview';


export interface SequenceOverviewState {
  sequences: Sequence[];
  pagination: PaginationParameters;
  filters: object;
  sort?: SortOptions;
  selectedSequence: Sequence;
  getSelectedSequenceSite: UserSite;
  getSelectedSequenceGroup: UserGroup;
  initialFilter: object;
}


export const sequenceOverviewDefaultState: SequenceOverviewState = {
  sequences: [],
  pagination: {
    page: 1,
    pageSize: 20
  },
  selectedSequence: null,
  getSelectedSequenceSite: null,
  getSelectedSequenceGroup: null,
  filters: {},
  initialFilter: {}
};


export function sequenceOverviewReducer (
  state: SequenceOverviewState = sequenceOverviewDefaultState,
  action: SequenceOverviewActions): SequenceOverviewState {


  switch (action.type) {

    case SequenceOverviewActions.LOAD_SEQUENCES_SUCCESS:
      return <SequenceOverviewState>{
        ...state,
        sequences: (<LoadSequencesSuccess> action).payload.data,
        pagination: (<LoadSequencesSuccess> action).payload.pagination,
        initialFilter: {}
      };
    case SequenceOverviewActions.UPDATE_SEQUENCE_FILTER:
      const filterToUpdate: Filter = (<UpdateSequenceFilters> action).filterData;
      const updatedFilters = cloneDeep(state.filters);

      updatedFilters[filterToUpdate.field] = filterToUpdate.value;

      return <SequenceOverviewState>{
        ...state,
        filters: omitBy(filterToUpdate, value => value === '')
      };
    case SequenceOverviewActions.SORT:
      const sort = getNextSort((<SortSequence>action).payload, state.sort);

      return <SequenceOverviewState>{
        ...state,
        sort: sort
      };
    case SequenceOverviewActions.PAGINATE:
      return <SequenceOverviewState>{
        ...state,
        pagination: (<PaginateSequence>action).payload
      };
    case SequenceOverviewActions.CLEAR_SEQUENCE_TABLE_FILTERS:
        const filtersToRetain = pick(state.filters, ['siteId', 'groupId']);
        return <SequenceOverviewState>{
          ...state,
          filters: filtersToRetain
        };
    case SequenceOverviewActions.CLEAR_SEQUENCE_FILTERS:
      return <SequenceOverviewState>{
        ...state,
        filters: {},
        initialFilter: {},
        sequences: []
      };
    case SequenceOverviewActions.SELECT_SEQUENCE:
      return {
        ...state,
        selectedSequence: cloneDeep((<SelectSequence>action).sequence)
      };

    case SequenceOverviewActions.UPDATE_SELECTED_SEQUENCE_SITE:
      return {
        ...state,
        getSelectedSequenceSite: (<UpdateSelectedSequenceSite>action).site
      };

    case SequenceOverviewActions.UPDATE_SELECTED_SEQUENCE_GROUP:
      return {
        ...state,
        getSelectedSequenceGroup: (<UpdateSelectedSequenceGroup>action).group
      };
    case SequenceOverviewActions.INITIAL_FILTER_ON_PAGE_LOAD:
      return {
        ...state,
        initialFilter: (<FiltersOnPageLoad>action).filterData
      };
    default:
      return state;
  }

}


export function getNextSort(field: string, sort: SortOptions): SortOptions | undefined {
  if (sort && sort.field === field) {
    const nextSort: SortDirection = (sort.direction + 1) % 3;
    return SortDirection[nextSort] && {
      field: field,
      direction: nextSort
    };
  }

  return {
    field: field,
    direction: SortDirection.ASC
  };
}


export const getSequence = (state: SequenceOverviewState) => state.sequences;
export const getPagination = (state: SequenceOverviewState) => state.pagination;
export const getFilters = (state: SequenceOverviewState) => state.filters;
export const getSort = (state: SequenceOverviewState) => state.sort;
export const getSelectedSequence = (state: SequenceOverviewState) => state.selectedSequence;

export const stateSelector = createFeatureSelector<SequenceOverviewState>(sequenceOverviewFeatureName);
export const sequenceSelector = createSelector(stateSelector, getSequence);
export const paginationSelector = createSelector(stateSelector, getPagination);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const sortSelector = createSelector(stateSelector, getSort);
export const selectedSequenceSelector = createSelector(stateSelector, getSelectedSequence);
