import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TestDetails, TestObject } from './test-details.model';
import { DateHandlerService} from '../../../core/services/date/date-handler.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class TestDetailsService {
  public url = `${environment.apiUrl}/test/`;
  public urlToDelete = `${environment.apiUrl}/test/delete/`;
  public urlToUpdate = `${environment.apiUrl}/test/update/`;
  public urlToCreate = `${environment.apiUrl}/test/create`;
  public testObjectUrl = `${environment.apiUrl}/test/objectPhase`;
  public testSwVersionUrl = `${environment.apiUrl}/test/softwareBaseLine`;
  public getTestLeaderUrl = `${environment.apiUrl}/user/testLeader`;

  constructor(public Http: HttpClient, private dateService: DateHandlerService) {}

  public getTestDetails(id): Observable<TestDetails> {
    return this.Http.get<TestDetails>(this.url + id);
  }

  public getTestObjects(): Observable<TestObject> {
    return this.Http.get<TestObject>(this.testObjectUrl);
  }

  public getTestSWVersion() {
    return this.Http.get(this.testSwVersionUrl);
  }

  public deleteTestData(id: number) {
    return this.Http.delete(this.urlToDelete + id);
  }

  public updateTestData(test) {
      test.plannedStartDate = test.plannedStartDate ? this.dateService.convertToTimeStamp(test.plannedStartDate.date) : null;
      test.plannedEndDate = test.plannedEndDate ? this.dateService.convertToTimeStamp(test.plannedEndDate.date) : null;
      test.actualStartDate = test.actualStartDate ? this.dateService.convertToTimeStamp(test.actualStartDate.date) :  null;
      return this.Http.put(this.urlToUpdate + test.testId, test);
  }

  public createTestData(test) {
    test.plannedStartDate = test.plannedStartDate ? this.dateService.convertToTimeStamp(test.plannedStartDate.date) : null;
    test.plannedEndDate = test.plannedEndDate ? this.dateService.convertToTimeStamp(test.plannedEndDate.date) : null;
    test.actualStartDate = test.actualStartDate ? this.dateService.convertToTimeStamp(test.actualStartDate.date) :  null;
    return this.Http.post(this.urlToCreate, test);
  }

  public getTestLeader(payload: any) {
    const parameters = new HttpParams()
      .set('siteId', payload.siteId)
      .set('groupId', payload.groupId);
    return this.Http.get(this.getTestLeaderUrl, {params: parameters});
  }

}
