import { createFeatureSelector, createSelector } from '@ngrx/store';
import { omitBy } from 'lodash';
import { Routine, RoutineListFilters } from './routine-list.model';
import { PaginationParameters } from '../../../../../core/interfaces/pagination-params.i';
import {
  LoadRoutineListSuccess,
  PaginateRoutineList,
  RoutineListActions,
  routineListActionTypes,
  UpdateRoutineListFilters,
  UpdateSelectedRoutine
} from './routine-list.action';

export const routineListFeatureName = 'RoutineList';


export interface RoutineListState {
  routine: Routine[];
  filters: RoutineListFilters;
  pagination: PaginationParameters;
  selectedRoutine: Routine[];
}


export const routineListDefaultState: RoutineListState = {
  routine: [],
  filters: {},
  pagination: {
    page: 1,
    pageSize: 5
  },
  selectedRoutine: []
};


export function routineListReducer (

  state: RoutineListState = routineListDefaultState,
  action: RoutineListActions ): RoutineListState {

  switch (action.type) {
    case routineListActionTypes.LOAD_ROUTINES_SUCCESS:
      return <RoutineListState>{
        ...state,
        routine: (<LoadRoutineListSuccess> action).payload.data,
        pagination: (<LoadRoutineListSuccess> action).payload.pagination
      };

    case routineListActionTypes.UPDATE_ROUTINE_FILTER:
      const filterToUpdate: object = (<UpdateRoutineListFilters> action).payload;
      return <RoutineListState>{
        ...state,
        filters: omitBy(filterToUpdate, value => value === '')
      };
    case routineListActionTypes.UPDATE_SELECTED_ROUTINE:
      return <RoutineListState>{
        ...state,
        selectedRoutine: (<UpdateSelectedRoutine> action).routine
      };

    case routineListActionTypes.PAGINATE_ROUTINE_LIST:
      return <RoutineListState>{
        ...state,
        pagination: (<PaginateRoutineList>action).payload
      };
    case routineListActionTypes.EMPTY_ROUTINE_FILTERS:
      return <RoutineListState>{
        ...state,
        routine: [],
        filters: {},
        selectedRoutines: []
      };
    default:
      return state;
  }

}


export const getRoutineList = (state: RoutineListState) => state.routine;
export const getRoutineListFilters = (state: RoutineListState) => state.filters;
export const getRoutineListPagination = (state: RoutineListState) => state.pagination;
export const getSelectedRoutine = (state: RoutineListState) => state.selectedRoutine;


export const stateSelector = createFeatureSelector<RoutineListState>(routineListFeatureName);
export const routineListSelector = createSelector(stateSelector, getRoutineList);
export const filtersRoutineListSelector = createSelector(stateSelector, getRoutineListFilters);
export const paginationRoutineListSelector = createSelector(stateSelector, getRoutineListPagination);
export const selectedRoutineListSelector = createSelector(stateSelector, getSelectedRoutine);
