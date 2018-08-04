import { Action } from '@ngrx/store';
import { Routine } from './routine-overview.model';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';

export const routineOverviewActionTypes = {
  UPDATE_ROUTINE_FILTER: '[RoutineOverview] Update Filters',
  DELETE_SELECTED: '[RoutineOverview] Delete Selected',
  CLEAR_ROUTINE_FILTERS: '[RoutineOverview] Clear Filters',
  EMPTY_ROUTINE_FILTERS: '[RoutineOverview] Empty Filters',
  CLEAR_ROUTINE_TABLE_FILTERS: '[RoutineOverview] Clear Filters of Routine Table',
  PAGINATE: '[RoutineOverview] Pages of Routines',
  LOAD_ROUTINES: '[RoutineOverview] Load Routines',
  LOAD_ROUTINES_SUCCESS: '[RoutineOverview] Load Routines Successfully',
  LOAD_ROUTINES_FAILURE: '[RoutineOverview] Load Routines Failure',
  SORT: '[RoutineOverview] Sort Routines',
  SELECT_ROUTINE: '[RoutineOverview] Select Routines',
  LOAD_ALL_ROUTINE: '[RoutineOverview] Load All Routine',
  LOAD_TYPE_OF_ROUTINE: '[RoutineOverview] Load Type of Routine',
  INITIAL_FILTER_ON_PAGE_LOAD: '[RoutineOverview] Filter On Page Load',
  INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS: '[RoutineOverview] Filter On Page Load Success'
};


export class UpdateRoutineFilters implements Action {
  readonly type: string = routineOverviewActionTypes.UPDATE_ROUTINE_FILTER;
  constructor(public payload: object) {}
}

export class DeleteSelected implements Action {
  readonly type: string = routineOverviewActionTypes.DELETE_SELECTED;
  constructor(public payload: Routine[]) {}
}

export class ClearFilters implements Action {
  readonly type: string = routineOverviewActionTypes.CLEAR_ROUTINE_FILTERS;
}
export class EmptyFilters implements Action {
  readonly type: string = routineOverviewActionTypes.EMPTY_ROUTINE_FILTERS;
}
export class ClearTableFilters implements Action {
  readonly type: string = routineOverviewActionTypes.CLEAR_ROUTINE_TABLE_FILTERS;
}

export class LoadRoutines implements Action {
  readonly type: string = routineOverviewActionTypes.LOAD_ROUTINES;
}

export class Paginate implements Action {
  readonly type: string = routineOverviewActionTypes.PAGINATE;
  constructor(public payload: PaginationParameters) {}
}

export class LoadRoutinesSuccess implements Action {
  readonly type: string = routineOverviewActionTypes.LOAD_ROUTINES_SUCCESS;
  constructor(public payload: PaginatedResponse<Routine[]>) {}
}

export class LoadRoutinesFailure implements Action {
  readonly type: string = routineOverviewActionTypes.LOAD_ROUTINES_FAILURE;
}

export class Sort implements Action {
  readonly type: string = routineOverviewActionTypes.SORT;
  constructor(public payload: string) {}
}

export class SelectRoutine implements Action {
  readonly type: string = routineOverviewActionTypes.SELECT_ROUTINE;
  constructor(public routine: Routine) {}
}

export class LoadAllRoutine implements Action {
  readonly type: string = routineOverviewActionTypes.LOAD_ALL_ROUTINE;
}
export class LoadTypeOfRoutine implements Action {
  readonly type: string = routineOverviewActionTypes.LOAD_TYPE_OF_ROUTINE;
}

export class FiltersOnPageLoad implements Action {
  readonly type: string = routineOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD;
  constructor(public filterData: object) {}
}
export type RoutineOverviewActions = UpdateRoutineFilters | ClearFilters  | LoadRoutines | LoadRoutinesSuccess |
  LoadRoutinesFailure | Sort | Paginate | SelectRoutine | LoadAllRoutine | LoadTypeOfRoutine | ClearTableFilters
  | EmptyFilters | FiltersOnPageLoad;

