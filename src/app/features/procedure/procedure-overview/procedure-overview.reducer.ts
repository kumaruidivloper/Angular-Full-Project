import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep, omitBy, pick } from 'lodash';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';
import {
  FiltersOnPageLoad,
  LoadProceduresSuccess,
  Paginate,
  ProcedureOverviewActions,
  procedureOverviewActionTypes,
  SelectProcedure,
  UpdateProcedureFilters,
  UpdateSelectedProcedureGroup,
  UpdateSelectedProcedureSite
} from './procedure-overview.actions';
import { Procedure } from './procedure-overview.model';

export const procedureOverviewFeatureName = 'ProcedureOverview';

export interface ProcedureOverviewState {
  procedures: Procedure[];
  filters: any;
  pagination: PaginationParameters;
  sort?: SortOptions;
  selectedProcedure: Procedure;
  getSelectedProcedureSite: UserSite;
  getSelectedProcedureGroup: UserGroup;
  initialFilter: object;
}

export const procedureOverviewDefaultState: ProcedureOverviewState = {
  procedures: [],
  filters: {},
  pagination: {
    page: 1,
    pageSize: 20
  },
  selectedProcedure: null,
  getSelectedProcedureSite: null,
  getSelectedProcedureGroup: null,
  initialFilter: {}
};
export function procedureOverviewReducer (
  state: ProcedureOverviewState = procedureOverviewDefaultState,
  action: ProcedureOverviewActions): ProcedureOverviewState {

  switch (action.type) {
    case procedureOverviewActionTypes.LOAD_PROCEDURES_FAILURE:
      return <ProcedureOverviewState>{
        ...state,
        procedures: procedureOverviewDefaultState.procedures,
        pagination: procedureOverviewDefaultState.pagination
      };

    case procedureOverviewActionTypes.LOAD_PROCEDURES_SUCCESS:
      return <ProcedureOverviewState>{
        ...state,
        procedures: (<LoadProceduresSuccess> action).procedureData.data,
        pagination: (<LoadProceduresSuccess> action).procedureData.pagination,
        initialFilter: {}
      };

    case procedureOverviewActionTypes.UPDATE_PROCEDURE_FILTER:
      const filterToUpdate: object = (<UpdateProcedureFilters> action).filterData;
      return <ProcedureOverviewState>{
        ...state,
        filters: omitBy(filterToUpdate, value => value === '')
      };
    case procedureOverviewActionTypes.PAGINATE:
      return <ProcedureOverviewState>{
        ...state,
        pagination: (<Paginate>action).pageParams
      };

    case procedureOverviewActionTypes.CLEAR_PROCEDURE_TABLE_FILTERS:
      const filtersToRetain = pick(state.filters, ['siteId', 'groupId']);
      return <ProcedureOverviewState>{
        ...state,
        filters: filtersToRetain
      };
    case procedureOverviewActionTypes.CLEAR_PROCEDURE_FILTERS:
      return <ProcedureOverviewState>{
        ...state,
        filters: {},
        initialFilter: {},
        procedures: []
      };

    case procedureOverviewActionTypes.SELECT_PROCEDURE:
      return {
        ...state,
        selectedProcedure: cloneDeep((<SelectProcedure>action).procedure)
      };

    case procedureOverviewActionTypes.UPDATE_SELECTED_PROCEDURE_SITE:
      return {
        ...state,
        getSelectedProcedureSite: (<UpdateSelectedProcedureSite>action).site
      };

    case procedureOverviewActionTypes.UPDATE_SELECTED_PROCEDURE_GROUP:
      return {
        ...state,
        getSelectedProcedureGroup: (<UpdateSelectedProcedureGroup>action).group
      };
    case procedureOverviewActionTypes.INITIAL_FILTER_ON_PAGE_LOAD:
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



export const getProcedures = (state: ProcedureOverviewState) => state.procedures;
export const getSort = (state: ProcedureOverviewState) => state.sort;
export const getFilters = (state: ProcedureOverviewState) => state.filters;
export const getPagination = (state: ProcedureOverviewState) => state.pagination;
export const getSelectedProcedureSite = (state: ProcedureOverviewState) => state.getSelectedProcedureSite;
export const getSelectedProcedureGroup = (state: ProcedureOverviewState) => state.getSelectedProcedureGroup;

export const stateSelector = createFeatureSelector<ProcedureOverviewState>(procedureOverviewFeatureName);
export const procedureSelector = createSelector(stateSelector, getProcedures);
export const sortSelector = createSelector(stateSelector, getSort);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const paginationSelector = createSelector(stateSelector, getPagination);
export const selectedProcedureSiteSelector = createSelector(stateSelector, getSelectedProcedureSite);
export const selectedProcedureGroupSelector = createSelector(stateSelector, getSelectedProcedureGroup);

