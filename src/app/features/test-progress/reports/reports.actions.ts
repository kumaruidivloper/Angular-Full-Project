import { Action } from '@ngrx/store';
import {PaginatedResponse} from '../../../core/interfaces/paginated-response.i';
import {ReportCommentsModel, ReportMessageModel} from './reports.model';


export const reportActionTypes = {
  GET_REPORTS: '[Reports] Get Reports',
  GET_REPORTS_SUCCESS: '[Reports] Get Reports Success',
  GET_REPORTS_FAILURE: '[Reports] Get Reports Failure',
  UPDATE_REPORTS_FILTERS: '[Reports] Update Reports Filters',
  CREATE_REPORTS: '[Reports] Create Reports',
  CREATE_REPORTS_SUCCESS: '[Reports] Create Reports Success',
  CREATE_REPORTS_FAILURE: '[Reports] Create Reports Failure',
  CREATE_NEW_COMMENT: '[Reports] Create New Comment',
  CREATE_NEW_COMMENT_SUCCESS: '[Reports] Create New Comment Success',
  CREATE_NEW_COMMENT_FAILURE: '[Reports] Create New Comment Failure',
  DELETE_COMMENT: '[Reports] Delete Comment',
  UPDATE_COMMENT: '[Reports] Update Comment',
  UPDATE_COMMENT_SUCCESS: '[Reports] Update Comment Success',
  UPDATE_COMMENT_FAILURE: '[Reports] Update Comment failure',
  UPDATE_REPORT: '[Reports] Update Reports',
  UPDATE_REPORT_SUCCESS: '[Reports] Update Reports Success',
  UPDATE_REPORT_FAILURE: '[Reports] Update Reports Failure',
};

export class GetReports implements Action {
  readonly type: string = reportActionTypes.GET_REPORTS;
}

export class GetReportsSuccess implements Action {
  readonly type: string = reportActionTypes.GET_REPORTS_SUCCESS;
  constructor( public reports: PaginatedResponse<any>) {}
}

export class GetReportsFailure implements Action {
  readonly type: string = reportActionTypes.GET_REPORTS_FAILURE;
}

export class UpdateReportsFilters implements Action {
  readonly type: string = reportActionTypes.UPDATE_REPORTS_FILTERS;
  constructor( public filter: object) {}
}

export class CreateReports implements Action {
  readonly type: string = reportActionTypes.CREATE_REPORTS;
  constructor( public id: number, public reportData: object ) {}
}

export class CreateReportsSuccess implements Action {
  readonly type: string = reportActionTypes.CREATE_REPORTS_SUCCESS;
}

export class CreateReportsFailure implements Action {
  readonly type: string = reportActionTypes.CREATE_REPORTS_FAILURE;
}

export class CreateNewComments implements Action {
  readonly type: string = reportActionTypes.CREATE_NEW_COMMENT;
  constructor( public reportId: number, public commentTxt: object ) {}
}

export class CreateNewCommentsSuccess implements Action {
  readonly type: string = reportActionTypes.CREATE_NEW_COMMENT_SUCCESS;
}

export class CreateNewCommentsFailure implements Action {
  readonly type: string = reportActionTypes.CREATE_NEW_COMMENT_FAILURE;
}

export class DeleteComment implements Action {
  readonly type: string = reportActionTypes.DELETE_COMMENT;
  constructor(public commentId: number) {}
}

export class UpdateComments implements Action {
  readonly type: string = reportActionTypes.UPDATE_COMMENT;
  constructor( public comments: ReportCommentsModel) {}
}

export class UpdateCommentsSuccess implements Action {
  readonly type: string = reportActionTypes.UPDATE_COMMENT_SUCCESS;
}

export class UpdateCommentsFailure implements Action {
  readonly type: string = reportActionTypes.UPDATE_COMMENT_FAILURE;
}

export class UpdateReport implements Action {
  readonly type: string = reportActionTypes.UPDATE_REPORT;
  constructor(public report: ReportMessageModel) {}
}

export class UpdateReportSuccess implements Action {
  readonly type: string = reportActionTypes.UPDATE_REPORT_SUCCESS;
}

export class UpdateReportFailure implements Action {
  readonly type: string = reportActionTypes.UPDATE_REPORT_FAILURE;
}

export type ReportsActions = GetReports | GetReportsSuccess | GetReportsFailure
                              | UpdateReportsFilters | CreateReports | CreateReportsSuccess
                              | CreateReportsFailure | CreateNewComments | CreateNewCommentsSuccess
                              | CreateNewCommentsFailure | DeleteComment
                              | UpdateComments | UpdateCommentsSuccess | UpdateCommentsFailure
                              | UpdateReport | UpdateReportSuccess | UpdateReportFailure;

