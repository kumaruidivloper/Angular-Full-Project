import { Action } from '@ngrx/store';
import { Procedure } from './procedure-overview.model';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';

export const procedureOverviewActionTypes = {
  UPDATE_PROCEDURE_FILTER: '[ProcedureOverview] Update Filters',
  CLEAR_PROCEDURE_FILTERS: '[ProcedureOverview] Clear Filters',
  EMPTY_PROCEDURE_FILTERS: '[ProcedureOverview] Empty Filters',
  CLEAR_PROCEDURE_TABLE_FILTERS: '[ProcedureOverview] Clear Filters of Table',
  PAGINATE: '[ProcedureOverview] Pages of Procedures',
  LOAD_PROCEDURES: '[ProcedureOverview] Load Procedures',
  LOAD_PROCEDURES_SUCCESS: '[ProcedureOverview] Load Procedures Successfully',
  LOAD_PROCEDURES_FAILURE: '[ProcedureOverview] Load Procedures Failure',
  SORT: '[ProcedureOverview] Sort Procedures',
  SELECT_PROCEDURE: '[ProcedureOverview] Select Procedure',
  LOAD_ALL_PROCEDURE: '[ProcedureOverview] Load All Procedure',
  LOAD_TYPE_OF_PROCEDURE: '[ProcedureOverview] Load Type of Procedure',
  UPDATE_SELECTED_PROCEDURE_SITE: '[ProcedureOverview] Update Selected Test Site',
  UPDATE_SELECTED_PROCEDURE_GROUP: '[ProcedureOverview] Update Selected Test Group',
  INITIAL_FILTER_ON_PAGE_LOAD: '[ProcedureOverview] Filter On Page Load',
  INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS: '[ProcedureOverview] Filter On Page Load Success'
};


export class UpdateProcedureFilters implements Action {
  readonly type: string = procedureOverviewActionTypes.UPDATE_PROCEDURE_FILTER;
  constructor(public filterData: object) {}
}

export class ClearFilters implements Action {
  readonly type: string = procedureOverviewActionTypes.CLEAR_PROCEDURE_FILTERS;
}
export class EmptyFilters implements Action {
  readonly type: string = procedureOverviewActionTypes.EMPTY_PROCEDURE_FILTERS;
}
export class ClearProcedureTableFilters implements Action {
  readonly type: string = procedureOverviewActionTypes.CLEAR_PROCEDURE_TABLE_FILTERS;
}

export class LoadProcedures implements Action {
  readonly type: string = procedureOverviewActionTypes.LOAD_PROCEDURES;
}

export class Paginate implements Action {
  readonly type: string = procedureOverviewActionTypes.PAGINATE;
  constructor(public pageParams: PaginationParameters) {}
}

export class LoadProceduresSuccess implements Action {
  readonly type: string = procedureOverviewActionTypes.LOAD_PROCEDURES_SUCCESS;
  constructor(public procedureData: PaginatedResponse<Procedure[]>) {}
}

export class LoadProceduresFailure implements Action {
  readonly type: string = procedureOverviewActionTypes.LOAD_PROCEDURES_FAILURE;
}

export class Sort implements Action {
  readonly type: string = procedureOverviewActionTypes.SORT;
  constructor(public sortData: string) {}
}

export class SelectProcedure implements Action {
  readonly type: string = procedureOverviewActionTypes.SELECT_PROCEDURE;
  constructor(public procedure: Procedure) {}
}

export class LoadAllProcedure implements Action {
  readonly type: string = procedureOverviewActionTypes.LOAD_ALL_PROCEDURE;
}

export class LoadTypeOfProcedure implements Action {
  readonly type: string = procedureOverviewActionTypes.LOAD_TYPE_OF_PROCEDURE;
}

export class UpdateSelectedProcedureSite implements Action {
  readonly type: string = procedureOverviewActionTypes.UPDATE_SELECTED_PROCEDURE_SITE;
  constructor(public site: UserSite) {}
}

export class UpdateSelectedProcedureGroup implements Action {
  readonly type: string = procedureOverviewActionTypes.UPDATE_SELECTED_PROCEDURE_GROUP;
  constructor(public group: UserGroup) {}
}
export class FiltersOnPageLoad implements Action {
  readonly type: string = procedureOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD;
  constructor(public filterData: object) {}
}
export class FiltersOnPageLoadSuccess implements Action {
  readonly type: string = procedureOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD_SUCCESS;
  constructor(public procedureData: PaginatedResponse<Procedure[]>) {}
}
export type ProcedureOverviewActions = UpdateProcedureFilters | ClearFilters  | LoadProcedures | LoadProceduresSuccess |
  LoadProceduresFailure | Sort | Paginate | SelectProcedure | LoadAllProcedure | LoadTypeOfProcedure | UpdateSelectedProcedureSite
  | UpdateSelectedProcedureGroup | ClearProcedureTableFilters | EmptyFilters | FiltersOnPageLoad | FiltersOnPageLoadSuccess;
