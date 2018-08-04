import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../../../../../environments/environment';
import {stateSelector, TestCaseStepListState} from './test-case-step.reducer';
import {TestCaseStep} from './test-case-step.model';
import {PaginatedResponse} from '../../../../../core/interfaces/paginated-response.i';
import {Tag} from '../../../../../shared/tag/tag.model';

@Injectable()
export class TestCaseStepListService {

  private state$: Observable<TestCaseStepListState>;

  constructor(
    public Http: HttpClient,
    private store: Store<TestCaseStepListState>) {
     this.state$ = this.store.select(stateSelector);
    }

  private testCaseUrlPath = `${environment.apiUrl}/testCaseStep?type=TEST_CASE&status=ACTIVE`;
  private testStepUrlPath = `${environment.apiUrl}/testCaseStep?type=TEST_STEP&status=ACTIVE`;
  private urlGetTag = `${environment.apiUrl}/testCaseStep/tags`;

  public getTestCaseList(): Observable<PaginatedResponse<TestCaseStep[]>> {
    let parameters: HttpParams;
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.paginationTestCase && state.paginationTestCase.page.toString())
          .set('pageSize', state.paginationTestCase && state.paginationTestCase.pageSize.toString());

        Object.keys(state.testCaseFilters).forEach((key: string) => {
          if (key === 'name' || key === 'category' || key === 'private' || key === 'level'
              || key === 'truckFunctionArea' || key === 'truckFunction' ) {
            parameters =  parameters.set('page', '1');
          } else {
            parameters =  parameters.set('page', state.paginationTestCase && state.paginationTestCase.page.toString());
          }
          parameters =  parameters.set(key, `${state.testCaseFilters[key]}`);
        });
        return this.Http.get<PaginatedResponse<TestCaseStep[]>>(this.testCaseUrlPath, {params:  parameters});
      });
  }

  public getTestStepList(): Observable<PaginatedResponse<TestCaseStep[]>> {
    let parameters: HttpParams;
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        parameters = new HttpParams()
          .set('page', state.paginationTestStep && state.paginationTestStep.page.toString())
          .set('pageSize', state.paginationTestStep && state.paginationTestStep.pageSize.toString());

        Object.keys(state.testStepFilters).forEach((key: string) => {
          if (key === 'name' || key === 'category' || key === 'private' || key === 'tag') {
            parameters =  parameters.set('page', '1');
          } else {
            parameters =  parameters.set('page', state.paginationTestStep && state.paginationTestStep.page.toString());
          }
           parameters =  parameters.set(key, `${state.testStepFilters[key]}`);
        });
        return this.Http.get<PaginatedResponse<TestCaseStep[]>>(this.testStepUrlPath, {params:  parameters});
      });
  }

  public getTags(): Observable<PaginatedResponse<Tag[]>> {
    return this.Http.get<PaginatedResponse<Tag[]>>(this.urlGetTag);
  }

  public getAllTestCases(): Observable<PaginatedResponse<TestCaseStep[]>> {
    return this.Http.get<PaginatedResponse<TestCaseStep[]>>(this.testCaseUrlPath);
  }

  public getAllTestSteps(): Observable<PaginatedResponse<TestCaseStep[]>> {
    return this.Http.get<PaginatedResponse<TestCaseStep[]>>(this.testStepUrlPath);
  }

}
