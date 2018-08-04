import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ResultType, TestCaseStepDetails, TruckFunctionArea } from './test-case-detail.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TestCaseDetailService {
  private url = `${environment.apiUrl}/testCaseStep/`;
  private resultTypeUrl = `${environment.apiUrl}/testCaseStep/resultTypeTestCase`;
  private truckFunctionAreaUrl = `${environment.apiUrl}/testCaseStep/truckFunctionArea`;
  private urlToCreate = `${environment.apiUrl}/testCaseStep/create`;
  private urlToUpdate = `${environment.apiUrl}/testCaseStep/update/`;
  private urlToDelete = `${environment.apiUrl}/testCaseStep/delete/`;

  constructor(public http: HttpClient) { }

  public getTestCaseDetails(id): Observable<TestCaseStepDetails> {
    return this.http.get<TestCaseStepDetails>(this.url + id);
  }
  public getResultType(): Observable<ResultType> {
    return this.http.get<ResultType>(this.resultTypeUrl);
  }
  public getTruckFunctionArea(): Observable<TruckFunctionArea> {
    return this.http.get<TruckFunctionArea>(this.truckFunctionAreaUrl);
  }
  public createTestCase(testCase): Observable<TestCaseStepDetails> {
    return this.http.post(this.urlToCreate, testCase);
  }
  public updateTestCase(testCase): Observable<TestCaseStepDetails> {
    return this.http.put(this.urlToUpdate + testCase.id, testCase);
  }
  public deleteTestCase(id: number) {
    return this.http.delete(this.urlToDelete + id);
  }
}
