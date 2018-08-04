import { createFeatureSelector, createSelector } from '@ngrx/store';
import { omitBy } from 'lodash';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import {GetReportsSuccess, reportActionTypes, ReportsActions, UpdateReportsFilters} from './reports.actions';
import {ReportMessageModel} from './reports.model';


export const reportsFeatureName = 'Reports';

export interface ReportsState {
  reports: ReportMessageModel[];
  reportsFilter: object;
  loader: boolean;
}

export const reportsDefaultState: ReportsState = {
  reports: [],
  reportsFilter: {},
  loader: false
};

export function reportsReducer(
                  state: ReportsState = reportsDefaultState,
                  action: ReportsActions): ReportsState {

  switch (action.type) {
    case reportActionTypes.GET_REPORTS_SUCCESS:
      return <ReportsState>{
        ...state,
        reports: (<GetReportsSuccess> action).reports.data,
        pagination: (<GetReportsSuccess> action).reports.pagination,
        loader: false
      };
    case reportActionTypes.UPDATE_REPORTS_FILTERS:
      const filterToUpdate: object = (<UpdateReportsFilters> action).filter;
      // filterToUpdate = pick(state.filters, ['siteId', 'groupId'])
      return <ReportsState>{
        ...state,
        reportsFilter: omitBy(filterToUpdate, value => value === '')
      };
    case reportActionTypes.GET_REPORTS:
    case reportActionTypes.UPDATE_REPORT:
      return <ReportsState>{
        ...state,
        loader: true
      };
    case reportActionTypes.GET_REPORTS_FAILURE:
    case reportActionTypes.UPDATE_REPORT_SUCCESS:
    case reportActionTypes.UPDATE_REPORT_FAILURE:
      return <ReportsState>{
        ...state,
        loader: false
      };
    default:
      return state;
  }
}

export const getReports = (state: ReportsState) => state.reports;
export const getReportsFilter = (state: ReportsState) => state.reportsFilter;
export const loader = (state: ReportsState) => state.loader;

export const reportStateSelector = createFeatureSelector<ReportsState>(reportsFeatureName);
export const reportSelector = createSelector(reportStateSelector, getReports);
export const reportFilterSelector = createSelector(reportStateSelector, getReportsFilter);
export const loaderSelector = createSelector(reportStateSelector, loader);


