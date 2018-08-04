import { RoutineDetailsFilters, RoutineDetails } from './routine-details.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ActivitiesPaginate, CreateRoutineCopySuccess,
  GetRoutineDetailsSuccess, GetRoutineResultTypeSuccess,
  routineDetailsActionTypes, UpdateActivitiesFilters,
  UpdateRoutineForm, UpdateRoutineSuccess, UpdateUserGroupSuccess, UpdateUserSiteSuccess
} from './routine-details.action';
import { RoutineDetailsAction } from './routine-details.action';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { cloneDeep, omitBy } from 'lodash';
import { Filter } from '../../../core/interfaces/filter.model';

export const routineDetailsFeatureName = 'RoutineDetails';

export interface RoutineDetailsState {
  routineResultType: any;
  routineDetails: RoutineDetails;
  pagination: PaginationParameters;
  filters: RoutineDetailsFilters;
  routineUserGroup: string;
  routineUserSite: string;
  loader: boolean;
}

export const routineDetailsDefaultState: RoutineDetailsState = {
  routineResultType: [],
  routineDetails: {},
  filters: {},
  pagination: {
    page: 1,
    pageSize: 5
  },
  routineUserGroup: '',
  routineUserSite: '',
  loader: false
};

export function routineDetailsReducer(state: RoutineDetailsState = routineDetailsDefaultState,
                                   action: RoutineDetailsAction): RoutineDetailsState {

  switch (action.type) {
    case routineDetailsActionTypes.GET_ROUTINE_RESULT_TYPE_SUCCESS:
      return <RoutineDetailsState>{
        ...state,
        routineResultType: (<GetRoutineResultTypeSuccess> action).payload
      };
    case routineDetailsActionTypes.GET_ROUTINE_DETAILS_SUCCESS:
      return <RoutineDetailsState>{
        ...state,
        routineDetails: (<GetRoutineDetailsSuccess> action).payload
      };
    case routineDetailsActionTypes.CREATE_ROUTINE_COPY_SUCCESS:
      return <RoutineDetailsState>{
        ...state,
        routineDetails: (<CreateRoutineCopySuccess> action).routineCopy
      };
    case routineDetailsActionTypes.UPDATE_ACTIVITIES_FILTERS:
      const filterToUpdate: Filter = (<UpdateActivitiesFilters>action).payload;

      const updatedFilters: RoutineDetailsFilters = cloneDeep(state.filters);

      updatedFilters[filterToUpdate.field] = filterToUpdate.value;

      return <RoutineDetailsState>{
        ...state,
        filters: omitBy(updatedFilters, value => value === '')
      };
    case routineDetailsActionTypes.CLEAR_ACTIVITIES_FILTERS:
      return <RoutineDetailsState>{
        ...state,
        filters: {}
      };
    case routineDetailsActionTypes.ACTIVITIES_PAGINATE:
      return <RoutineDetailsState>{
        ...state,
        pagination: (<ActivitiesPaginate>action).payload
      };
    case routineDetailsActionTypes.CLEAR_ROUTINE_DETAILS:
      return {
        ...state,
        routineDetails: {}
      };
    case routineDetailsActionTypes.UPDATE_ROUTINE_FORM:
      return {
        ...state,
        routineDetails: {
          ...state.routineDetails,
          ...(<UpdateRoutineForm>action).routineDetails
        }
      };
    case routineDetailsActionTypes.UPDATE_ROUTINE_SUCCESS:
      return {
        ...state,
        routineDetails: {
          ...state.routineDetails,
          ...(<UpdateRoutineSuccess>action).routineDetails
        },
        loader: false
      };
    case routineDetailsActionTypes.UPDATE_USER_SITE_SUCCESS:
      return {
        ...state,
        routineUserSite: (<UpdateUserSiteSuccess> action).payload
      };
    case routineDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS:
      return {
        ...state,
        routineUserGroup: (<UpdateUserGroupSuccess> action).payload
      };
    case routineDetailsActionTypes.CREATE_ROUTINE:
    case routineDetailsActionTypes.UPDATE_ROUTINE:
      return {
        ...state,
        loader: true
      };
    case routineDetailsActionTypes.CREATE_ROUTINE_SUCCESS:
    case routineDetailsActionTypes.CREATE_ROUTINE_FAILURE:
    case routineDetailsActionTypes.UPDATE_ROUTINE_FAILURE:
      return {
        ...state,
        loader: false
      };
    default:
      return state;
  }
}

export const getRoutineDetails = (state: RoutineDetailsState) => state.routineDetails;
export const getFilters = (state: RoutineDetailsState) => state.filters;
export const getRoutineResultType = (state: RoutineDetailsState) => state.routineResultType;
export const updateUserSite = (state: RoutineDetailsState) => state.routineUserSite;
export const updateUserGroup = (state: RoutineDetailsState) => state.routineUserGroup;
export const loader = (state: RoutineDetailsState) => state.loader;

export const stateSelector = createFeatureSelector<RoutineDetailsState>(routineDetailsFeatureName);
export const routineDetailsSelector = createSelector(stateSelector, getRoutineDetails);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const resultTypeSelector = createSelector(stateSelector, getRoutineResultType);
export const updateUserSiteSelector = createSelector(stateSelector, updateUserSite);
export const updateUserGroupSelector = createSelector(stateSelector, updateUserGroup);
export const loaderSelector = createSelector(stateSelector, loader);
