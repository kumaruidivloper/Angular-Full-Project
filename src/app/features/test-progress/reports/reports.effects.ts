import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { Router } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';
import { ReportsService} from './reports.service';
import {
  CreateNewComments, CreateNewCommentsFailure, CreateNewCommentsSuccess,
  CreateReports, CreateReportsFailure, CreateReportsSuccess, DeleteComment, GetReports, GetReportsFailure,
  GetReportsSuccess,
  reportActionTypes, UpdateComments, UpdateCommentsFailure, UpdateCommentsSuccess, UpdateReport, UpdateReportFailure,
  UpdateReportSuccess
} from './reports.actions';
import { ReportMessageModel } from './reports.model';

@Injectable()
export class ReportsEffects {
  constructor(
    private actions$: Actions,
    public reportsService: ReportsService,
    private router: Router,
    private notifyService: NotificationService) {
  }

  @Effect() getReports$: Observable<Action> = this.actions$
    .ofType(reportActionTypes.GET_REPORTS)
    .mergeMap(( action) => {
      return this.reportsService.getReports()
        .map((result: PaginatedResponse<ReportMessageModel[]>) => new GetReportsSuccess(result))
        .catch(() => Observable.of(new GetReportsFailure()));
    });

  @Effect() createReports$: Observable<Action> = this.actions$
    .ofType(reportActionTypes.CREATE_REPORTS)
    .mergeMap(( action) => {
      return this.reportsService.postReports((<CreateReports>action).id, (<CreateReports>action).reportData)
        .map((result) => {
          this.notifyService.show('Report is successfully created!', {position: 'top', duration: '2500', type: 'success'});
          const testId = result['testId'];
          // this.router.navigate(['test/details/' + testId]);
          this.reloadPage();
          return new CreateReportsSuccess();
        })
        .catch(() => {
          this.notifyService.show('Create Report Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateReportsFailure());
        });
    });

  @Effect() createComments$: Observable<Action> = this.actions$
    .ofType(reportActionTypes.CREATE_NEW_COMMENT)
    .mergeMap(( action) => {
      return this.reportsService.postComment((<CreateNewComments>action).reportId, (<CreateNewComments>action).commentTxt)
        .map((result) => {
          this.notifyService.show('Comment is successfully created!', {position: 'top', duration: '2500', type: 'success'});
          return new CreateNewCommentsSuccess();
        })
        .catch(() => {
          this.notifyService.show('Create Report Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateNewCommentsFailure());
        });
    });

  @Effect() updateComments$: Observable<Action> = this.actions$
    .ofType(reportActionTypes.UPDATE_COMMENT)
    .mergeMap(( action) => {
      return this.reportsService.updateComment((<UpdateComments>action).comments)
        .map(() => {
          this.notifyService.show('Comment is successfully Updated!', {position: 'top', duration: '2500', type: 'success'});
          return new UpdateCommentsSuccess();
        })
        .catch(() => {
          this.notifyService.show('Updating Comment Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UpdateCommentsFailure());
        });
    });
  @Effect() updateReport$: Observable<Action> = this.actions$
    .ofType(reportActionTypes.UPDATE_REPORT)
    .mergeMap(( action) => {
      return this.reportsService.updateReportByID((<UpdateReport>action).report)
        .map(() => {
          this.notifyService.show('Report is successfully Updated!', {position: 'top', duration: '2500', type: 'success'});
          return new UpdateReportSuccess();
        })
        .catch(() => {
          this.notifyService.show('Updating Report Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UpdateReportFailure());
        });
    });

  @Effect() deleteComment$: Observable<Action> = this.actions$
    .ofType(reportActionTypes.DELETE_COMMENT)
    .mergeMap(( action) => {
      return this.reportsService.deleteComment((<DeleteComment>action).commentId)
        .map(() => new GetReports());
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      reportActionTypes.UPDATE_REPORTS_FILTERS,
      reportActionTypes.CREATE_REPORTS_SUCCESS,
      reportActionTypes.CREATE_NEW_COMMENT_SUCCESS,
      reportActionTypes.UPDATE_COMMENT_SUCCESS
    ]).map(() => new GetReports());

  public reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
}
