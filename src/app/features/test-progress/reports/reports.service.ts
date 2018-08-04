import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import {ReportsState, reportStateSelector} from './reports.reducer';
import {environment} from '../../../../environments/environment';


@Injectable()
export class ReportsService {
  private getReportsURL = `${environment.apiUrl}/report`;
  private postReportsURL = `${environment.apiUrl}/report/`;
  private updateReportsURL = `${environment.apiUrl}/report/update/`;
  private postCommentURL = `${environment.apiUrl}/report/comment/`;
  private updateCommentURL = `${environment.apiUrl}/report/comment`;
  private deleteCommentsURL = `${environment.apiUrl}/report/comment/`;
  private state$: Observable<ReportsState>;

  constructor(public http: HttpClient,
              private store: Store<ReportsState>) {
                this.state$ = this.store.select(reportStateSelector);
  }

  getReports(): Observable<any> {
    let parameters: HttpParams;
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams();

        Object.keys(state.reportsFilter).forEach((key: string) => {
          parameters = parameters.set(key, `${state.reportsFilter[key]}`);
        });
        return this.http.get<any>(this.getReportsURL, {params: parameters});
      });

  }

  postReports(id, reportData): Observable<any> {
    return this.http.post<any>(this.postReportsURL + id, reportData);
  }

  postComment(reportId, commentTxt): Observable<any> {
    return this.http.post<any>(this.postCommentURL + reportId, commentTxt);
  }

  updateComment(commentTxt): Observable<any> {
    return this.http.put<any>(this.updateCommentURL, commentTxt);
  }

  deleteComment(commentId): Observable<any> {
    return this.http.delete<any>(this.deleteCommentsURL + commentId);
  }

  updateReportByID(reportData): Observable<any> {
    return this.http.put<any>(this.updateReportsURL + reportData.id, reportData );
  }
}
