import { Routine, RoutineOverviewFilters } from './routine-overview.model';
import {
  FiltersOnPageLoad,
  LoadRoutinesSuccess,
  Paginate,
  RoutineOverviewActions,
  routineOverviewActionTypes,
  SelectRoutine,
  UpdateRoutineFilters
} from './routine-overview.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';
import { cloneDeep, omitBy, pick } from 'lodash';


export const routineOverviewFeatureName = 'RoutineOverview';


export interface RoutineOverviewState {
  routine: Routine[];
  filters: RoutineOverviewFilters;
  pagination: PaginationParameters;
  sort?: SortOptions;
  selectedRoutine: Routine;
  selectedRoutineSite: UserSite;
  selectedRoutineGroup: UserGroup;
  initialFilter: object;
}


export const routineOverviewDefaultState: RoutineOverviewState = {
  routine: [],
  filters: {},
  pagination: {
    page: 1,
    pageSize: 20
  },
  selectedRoutine: null,
  selectedRoutineSite: null,
  selectedRoutineGroup: null,
  initialFilter: {}
};


export function routineOverviewReducer (

  state: RoutineOverviewState = routineOverviewDefaultState,
  action: RoutineOverviewActions ): RoutineOverviewState {
  const routineWithOutType = '';


  switch (action.type) {
    case routineOverviewActionTypes.LOAD_ROUTINES_FAILURE:
      return <RoutineOverviewState>{
        ...state,
        routine: routineOverviewDefaultState.routine,
        pagination: routineOverviewDefaultState.pagination
      };

    case routineOverviewActionTypes.LOAD_ROUTINES_SUCCESS:
      return <RoutineOverviewState>{
        ...state,
        routine: (<LoadRoutinesSuccess> action).payload.data,
        pagination: (<LoadRoutinesSuccess> action).payload.pagination,
        initialFilter: {}
      };

    case routineOverviewActionTypes.UPDATE_ROUTINE_FILTER:
      const filterToUpdate: object = (<UpdateRoutineFilters> action).payload;
      return <RoutineOverviewState>{
        ...state,
        filters: omitBy(filterToUpdate, value => value === '')
      };

    // case SORT:
    //   const sort = getNextSort((<Sort>action).payload, state.sort);
    //
    //   return <RoutineOverviewState>{
    //     ...state,
    //     sort: sort
    //   };

    case routineOverviewActionTypes.PAGINATE:
      return <RoutineOverviewState>{
        ...state,
        pagination: (<Paginate>action).payload
      };

    case routineOverviewActionTypes.EMPTY_ROUTINE_FILTERS:
      return <RoutineOverviewState>{
        ...state,
        filters: {}
      };
    case routineOverviewActionTypes.CLEAR_ROUTINE_TABLE_FILTERS:
      const filtersToRetain = pick(state.filters, ['siteId', 'groupId']);
      return <RoutineOverviewState>{
        ...state,
        filters: filtersToRetain
      };

    case routineOverviewActionTypes.SELECT_ROUTINE:
      return {
        ...state,
        selectedRoutine: cloneDeep((<SelectRoutine>action).routine)
      };
    case routineOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD:
      return {
        ...state,
        initialFilter: (<FiltersOnPageLoad>action).filterData
      };
    case routineOverviewActionTypes.CLEAR_ROUTINE_FILTERS:
      return <RoutineOverviewState>{
        ...state,
        filters: {},
        initialFilter: {},
        routine: []
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


export const getRoutine = (state: RoutineOverviewState) => state.routine;
export const getSort = (state: RoutineOverviewState) => state.sort;
export const getFilters = (state: RoutineOverviewState) => state.filters;
export const getPagination = (state: RoutineOverviewState) => state.pagination;
export const getSelectedRoutine = (state: RoutineOverviewState) => state.selectedRoutine;


export const stateSelector = createFeatureSelector<RoutineOverviewState>(routineOverviewFeatureName);
export const routineSelector = createSelector(stateSelector, getRoutine);
export const sortSelector = createSelector(stateSelector, getSort);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const paginationSelector = createSelector(stateSelector, getPagination);
export const selectedRoutineSelector = createSelector(stateSelector, getSelectedRoutine);
