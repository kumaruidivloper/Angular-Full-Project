import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ResultType, TestCaseStepDetails } from '../test-case-detail/test-case-detail.model';
import { environment } from '../../../../environments/environment';

@Injectable()

export class TestStepDetailService {
  private url = `${environment.apiUrl}/testCaseStep/`;
  private resultTypeUrl = `${environment.apiUrl}/testCaseStep/resultTypeTestCase`;
  private urlToCreate = `${environment.apiUrl}/testCaseStep/create`;
  private urlToUpdate = `${environment.apiUrl}/testCaseStep/update/`;
  private urlToDelete = `${environment.apiUrl}/testCaseStep/delete/`;
  constructor(public http: HttpClient) { }

  public getTestStepDetails(id): Observable<TestCaseStepDetails> {
    return this.http.get<TestCaseStepDetails>(this.url + id);
  }
  public getResultType(): Observable<ResultType> {
    return this.http.get<ResultType>(this.resultTypeUrl);
  }
  public createTestStep(testStep): Observable<TestCaseStepDetails> {
    return this.http.post(this.urlToCreate, testStep);
  }
  public updateTestStep(testStep): Observable<TestCaseStepDetails> {
    return this.http.put(this.urlToUpdate + testStep.id, testStep);
  }
  public deleteTestStep(id: number) {
    return this.http.delete(this.urlToDelete + id);
  }
}

