import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { cloneDeep } from 'lodash';
import {
  DeSelectTestCaseList, DeSelectTestStepList,
  GetTestCaseList,
  GetTestCaseListFailure,
  GetTestCaseListSuccess,
  GetTestStepList,
  GetTestStepListFailure,
  GetTestStepListSuccess, GetTruckFunctionAreaFailure, GetTruckFunctionAreaSuccess, LoadTagsFailure, LoadTagsSuccess,
  SelectTestCaseList,
  SelectTestStepList,
  testCaseStepListActionTypes,
  UpdateTestCaseList,
  UpdateTestStepList
} from './test-case-step.actions';
import {PaginatedResponse} from '../../../../../core/interfaces/paginated-response.i';
import {TestCaseStep} from './test-case-step.model';
import {TestCaseStepListService} from './test-case-step.service';
import {
  selectedTestCaseSelector,
  selectedTestStepSelector,
  TestCaseStepListState
} from './test-case-step.reducer';
import {Tag} from '../../../../../shared/tag/tag.model';
import {TestCaseDetailService} from '../../../../test-case-step/test-case-detail/test-case-detail.service';


@Injectable()
export class TestCaseStepListEffects {
  constructor(
    private actions$: Actions,
    public testCaseStepListService: TestCaseStepListService,
    private store: Store<TestCaseStepListState>,
    private testCaseDetailService: TestCaseDetailService) {
  }

  @Effect() getTestCaseList$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.LOAD_TEST_CASE)
    .mergeMap(() => {
      return this.testCaseStepListService.getTestCaseList()
        .map((result: PaginatedResponse<TestCaseStep[]>) => new GetTestCaseListSuccess(result))
        .catch(() => Observable.of(new GetTestCaseListFailure()));
    });
  @Effect() getTestStepList$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.LOAD_TEST_STEP)
    .mergeMap(() => {
      return this.testCaseStepListService.getTestStepList()
        .map((result: PaginatedResponse<TestCaseStep[]>) => new GetTestStepListSuccess(result))
        .catch(() => Observable.of(new GetTestStepListFailure()));
    });

  @Effect() testCaseFilter$: Observable<Action> = this.actions$
    .ofType(...[
      testCaseStepListActionTypes.UPDATE_TEST_CASE_FILTER,
      testCaseStepListActionTypes.PAGINATE_TEST_CASE
    ]).map(() => new GetTestCaseList());

  @Effect() testStepFilter$: Observable<Action> = this.actions$
    .ofType(...[
      testCaseStepListActionTypes.UPDATE_TEST_STEP_FILTER,
      testCaseStepListActionTypes.PAGINATE_TEST_STEP
    ]).map(() => new GetTestStepList());

  @Effect() selectTestCase$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.SELECT_TEST_CASE)
    .withLatestFrom(this.store.select(selectedTestCaseSelector))
    .map(([action, testCase]) => {
      const item = cloneDeep(testCase);
      item.push((<SelectTestCaseList>action).testCaseList);
      return new UpdateTestCaseList(item);
    });
  @Effect() selectTestStep$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.SELECT_TEST_STEP)
    .withLatestFrom(this.store.select(selectedTestStepSelector))
    .map(([action, selectedTestStep]) => {
      const item = cloneDeep(selectedTestStep);
      item.push((<SelectTestStepList>action).testStepList);
      return new UpdateTestStepList(item);
    });

  @Effect() deselectTestCase: Observable<Action> = this.actions$
    .ofType( testCaseStepListActionTypes.DESELECT_TEST_CASE)
    .withLatestFrom(this.store.select(selectedTestCaseSelector))
    .map(([action, testCase]) => {
      const testCaseID = (<DeSelectTestCaseList>action).testCaseID;
      const testCaseData = testCase.filter(item => item.id !== testCaseID);
      return new UpdateTestCaseList(testCaseData);
    });

  @Effect() deselectTestStep: Observable<Action> = this.actions$
    .ofType( testCaseStepListActionTypes.DESELECT_TEST_STEP)
    .withLatestFrom(this.store.select(selectedTestStepSelector))
    .map(([action, testStep]) => {
      const testStepID = (<DeSelectTestStepList>action).testStepID;
      const testStepData = testStep.filter(item => item.id !== testStepID);
      return new UpdateTestCaseList(testStepData);
    });

  @Effect() getTagsList$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.LOAD_TAGS)
    .mergeMap(() => {
      return this.testCaseStepListService.getTags()
        .map((result: PaginatedResponse<Tag[]>) => new LoadTagsSuccess(result))
        .catch(() =>  Observable.of(new LoadTagsFailure()));
    });

  @Effect() getTCTruckFunctionArea$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.GET_TRUCK_FUNCTION_AREA)
    .mergeMap((action) => {
      return this.testCaseDetailService.getTruckFunctionArea()
        .map((result) => {
          return new GetTruckFunctionAreaSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetTruckFunctionAreaFailure());
        });
    });

  @Effect() getAllTestCases$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.LOAD_ALL_TEST_CASE)
    .mergeMap(() => {
      return this.testCaseStepListService.getAllTestCases()
        .map((result: PaginatedResponse<TestCaseStep[]>) => new GetTestCaseListSuccess(result))
        .catch(() =>  Observable.of(new GetTestCaseListFailure()));
    });

  @Effect() getAllTestSteps$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.LOAD_ALL_TEST_STEP)
    .mergeMap(() => {
      return this.testCaseStepListService.getAllTestSteps()
        .map((result: PaginatedResponse<TestCaseStep[]>) => new GetTestStepListSuccess(result))
        .catch(() =>  Observable.of(new GetTestStepListFailure()));
    });

}
