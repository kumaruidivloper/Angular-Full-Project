import { Action } from '@ngrx/store';
import {Routine} from './routine-list.model';


import {PaginationParameters} from '../../../../../core/interfaces/pagination-params.i';
import {PaginatedResponse} from '../../../../../core/interfaces/paginated-response.i';

export const routineListActionTypes = {
  UPDATE_ROUTINE_FILTER: '[RoutineList] Update Filters',
  DELETE_SELECTED: '[RoutineList] Delete Selected',
  CLEAR_ROUTINE_FILTERS: '[RoutineList] Clear Filters',
  EMPTY_ROUTINE_FILTERS: '[RoutineList] Empty Filters',
  CLEAR_ROUTINE_TABLE_FILTERS: '[RoutineList] Clear Filters of Routine Table',
  PAGINATE_ROUTINE_LIST: '[RoutineList] Pages of Routines',
  LOAD_ROUTINES: '[RoutineList] Load Routines',
  LOAD_ROUTINES_SUCCESS: '[RoutineList] Load Routines Successfully',
  LOAD_ROUTINES_FAILURE: '[RoutineList] Load Routines Failure',
  SELECT_ROUTINE: '[RoutineList] Select Routines',
  DESELECT_ROUTINE: '[RoutineList] DeSelect Routines',
  UPDATE_SELECTED_ROUTINE : '[RoutineList] Update Selected Routine'
};


export class UpdateRoutineListFilters implements Action {
  readonly type: string = routineListActionTypes.UPDATE_ROUTINE_FILTER;
  constructor(public payload: object) {}
}

export class DeleteRoutineListSelected implements Action {
  readonly type: string = routineListActionTypes.DELETE_SELECTED;
  constructor(public payload: Routine[]) {}
}

export class ClearRoutineListFilters implements Action {
  readonly type: string = routineListActionTypes.CLEAR_ROUTINE_FILTERS;
}

export class EmptyRoutineListFilters implements Action {
  readonly type: string = routineListActionTypes.EMPTY_ROUTINE_FILTERS;
}

export class PaginateRoutineList implements Action {
  readonly type: string = routineListActionTypes.PAGINATE_ROUTINE_LIST;
  constructor(public payload: PaginationParameters) {}
}

export class LoadRoutineList implements Action {
  readonly type: string = routineListActionTypes.LOAD_ROUTINES;
}

export class LoadRoutineListSuccess implements Action {
  readonly type: string = routineListActionTypes.LOAD_ROUTINES_SUCCESS;
  constructor(public payload: PaginatedResponse<Routine[]>) {}
}

export class LoadRoutineListFailure implements Action {
  readonly type: string = routineListActionTypes.LOAD_ROUTINES_FAILURE;
}

export class SelectRoutineList implements Action {
  readonly type: string = routineListActionTypes.SELECT_ROUTINE;
  constructor(public routine: Routine) {}
}

export class DeSelectRoutineList implements Action {
  readonly type: string = routineListActionTypes.DESELECT_ROUTINE;
  constructor(public routineID: number) {}
}

export class UpdateSelectedRoutine implements Action {
  readonly type: string = routineListActionTypes.UPDATE_SELECTED_ROUTINE;
  constructor(public routine: Routine[]) {}
}


export type RoutineListActions = UpdateRoutineListFilters | DeleteRoutineListSelected
                                | ClearRoutineListFilters | EmptyRoutineListFilters
                                | PaginateRoutineList | LoadRoutineListSuccess | LoadRoutineListFailure
                                | SelectRoutineList | DeSelectRoutineList | LoadRoutineList | UpdateSelectedRoutine;

