import { Action } from '@ngrx/store';
import { RoutineDetails } from './routine-details.model';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { Filter } from '../../../core/interfaces/filter.model';

export const routineDetailsActionTypes = {
  GET_ROUTINE_DETAILS: '[RoutineDetails] Get Routine Details',
  GET_ROUTINE_DETAILS_SUCCESS: '[RoutineDetails] Got Routine Details Successfully',
  GET_ROUTINE_DETAILS_FAILURE: '[RoutineDetails] Got Routine Details Failure',
  DELETE_ROUTINE: '[RoutineDetails] Delete Routine',
  DELETE_ROUTINE_SUCCESS: '[RoutineDetails] Delete Routine Success',
  DELETE_ROUTINE_FAILURE: '[RoutineDetails] Delete Routine Failure',
  UPDATE_ROUTINE: '[RoutineDetails] Update Routine',
  UPDATE_ROUTINE_FAILURE: '[RoutineDetails] Update Routine Failure',
  UPDATE_ROUTINE_SUCCESS: '[RoutineDetails] Update Routine Success',
  CREATE_ROUTINE: '[RoutineDetails] Create Routine',
  CREATE_ROUTINE_FAILURE: '[RoutineDetails] Create Routine Failure',
  CREATE_ROUTINE_SUCCESS: '[RoutineDetails] Create Routine Success',
  UPDATE_ACTIVITIES_FILTERS: '[RoutineDetails] Update Filters',
  GET_ROUTINE_TEAM: '[RoutineDetails] Get Routine Team',
  CLEAR_ACTIVITIES_FILTERS: '[RoutineDetails] Clear Filters',
  ACTIVITIES_PAGINATE: '[RoutineDetails] Activities Pagination',
  CLEAR_ROUTINE_DETAILS: '[RoutineDetails] Clear Routine Details',
  UPDATE_ROUTINE_FORM: '[RoutineDetails] Update Form',
  GET_ROUTINE_RESULT_TYPE: '[RoutineDetails] Routine Result Type',
  GET_ROUTINE_RESULT_TYPE_SUCCESS: '[RoutineDetails] Routine Result Type Success',
  GET_ROUTINE_RESULT_TYPE_FAILURE: '[RoutineDetails] Routine Result Type Failure',
  UPDATE_USER_GROUP: '[RoutineDetails] Update User Group',
  UPDATE_USER_GROUP_SUCCESS: '[RoutineDetails] Update User Group Success' ,
  UPDATE_USER_SITE: '[RoutineDetails] Update User Site',
  UPDATE_USER_SITE_SUCCESS: '[RoutineDetails] Update User Site Success',
  CREATE_ROUTINE_COPY: '[RoutineDetails] Create Routine Copy',
  CREATE_ROUTINE_COPY_SUCCESS: '[RoutineDetails] Create Routine Copy Success'
};


export class GetRoutineDetails implements Action {
  readonly type: string = routineDetailsActionTypes.GET_ROUTINE_DETAILS;
  constructor(public id: number) {}
}

export class GetRoutineDetailsSuccess implements Action {
  readonly type: string = routineDetailsActionTypes.GET_ROUTINE_DETAILS_SUCCESS;
  constructor(public payload: RoutineDetails) {}
}

export class GetRoutineDetailsFailure implements Action {
  readonly type: string = routineDetailsActionTypes.GET_ROUTINE_DETAILS_FAILURE;
}

export class DeleteRoutine implements Action {
  readonly type: string = routineDetailsActionTypes.DELETE_ROUTINE;
  constructor(public routineDetails: RoutineDetails ) { }
}

export class DeleteRoutineSuccess implements Action {
  readonly type: string = routineDetailsActionTypes.DELETE_ROUTINE_SUCCESS;
}

export class DeleteRoutineFailure implements Action {
  readonly type: string = routineDetailsActionTypes.DELETE_ROUTINE_FAILURE;
}

export class UpdateRoutine implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_ROUTINE;
}

export class UpdateRoutineFailure implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_ROUTINE_FAILURE;
}

export class UpdateRoutineSuccess implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_ROUTINE_SUCCESS;
  constructor(public routineDetails: RoutineDetails ) { }
}

export class CreateRoutine implements Action {
  readonly type: string = routineDetailsActionTypes.CREATE_ROUTINE;
}

export class CreateRoutineFailure implements Action {
  readonly type: string = routineDetailsActionTypes.CREATE_ROUTINE_FAILURE;
}

export class CreateRoutineSuccess implements Action {
  readonly type: string = routineDetailsActionTypes.CREATE_ROUTINE_SUCCESS;
}

export class UpdateActivitiesFilters implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_ACTIVITIES_FILTERS;
  constructor(public payload: Filter) {}
}

export class ClearActivitiesFilters implements Action {
  readonly type: string = routineDetailsActionTypes.CLEAR_ACTIVITIES_FILTERS;
}

// export class GetRoutineTeam implements Action {
//   readonly type: string = routineDetailsActionTypes.GET_ROUTINE_TEAM;
//   constructor(public payload: any) {}
// }


export class ActivitiesPaginate implements Action {
  readonly type: string = routineDetailsActionTypes.ACTIVITIES_PAGINATE;
  constructor(public payload: PaginationParameters) {}
}

export class ClearRoutineDetails implements Action {
  readonly type: string = routineDetailsActionTypes.CLEAR_ROUTINE_DETAILS;
}

export class UpdateRoutineForm implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_ROUTINE_FORM;

  constructor(public routineDetails: RoutineDetails) {}
}

export class GetRoutineResultType implements Action {
  readonly type: string = routineDetailsActionTypes.GET_ROUTINE_RESULT_TYPE;
}

export class GetRoutineResultTypeSuccess implements Action {
  readonly type: string = routineDetailsActionTypes.GET_ROUTINE_RESULT_TYPE_SUCCESS;
  constructor(public payload: any) {}
}

export class GetRoutineResultTypeFailure implements Action {
  readonly type: string = routineDetailsActionTypes.GET_ROUTINE_RESULT_TYPE_FAILURE;
}

export class UpdateUserGroup implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_USER_GROUP;
  constructor(public payload: string) {}
}
export class UpdateUserGroupSuccess implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS;
  constructor(public payload: string) {}
}

export class UpdateUserSite implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_USER_SITE;
  constructor(public payload: any) {}
}

export class UpdateUserSiteSuccess implements Action {
  readonly type: string = routineDetailsActionTypes.UPDATE_USER_SITE_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateRoutineCopy implements Action {
  readonly type: string = routineDetailsActionTypes.CREATE_ROUTINE_COPY;
}
export class CreateRoutineCopySuccess implements Action {
  readonly type: string = routineDetailsActionTypes.CREATE_ROUTINE_COPY_SUCCESS;
  constructor(public routineCopy: RoutineDetails) {}
}






export type RoutineDetailsAction = GetRoutineDetails
  | GetRoutineDetailsSuccess | GetRoutineDetailsFailure | DeleteRoutine
  | DeleteRoutineSuccess | DeleteRoutineFailure | UpdateRoutine | UpdateRoutineFailure | UpdateRoutineSuccess
  | CreateRoutine | CreateRoutineFailure | CreateRoutineSuccess | ClearActivitiesFilters
  | ActivitiesPaginate | ClearRoutineDetails | UpdateRoutineForm | GetRoutineResultType | GetRoutineResultTypeSuccess
  | GetRoutineResultTypeFailure | UpdateUserGroup | UpdateUserSite | UpdateUserGroupSuccess | UpdateUserSiteSuccess
  | CreateRoutineCopy | CreateRoutineCopySuccess;
