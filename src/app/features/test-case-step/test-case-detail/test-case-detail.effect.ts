import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { NotificationService } from 'ng2-notify-popup';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { stateSelector, testCaseDetailsSelector, TestCaseDetailsState } from './test-case-detail.reducer';
import { TestCaseDetailService } from './test-case-detail.service';
import {
  CreateTestCaseCopySuccess,
  CreateTestCaseFailure,
  CreateTestCaseSuccess,
  DeleteTestCase,
  DeleteTestCaseFailure,
  DeleteTestCaseSuccess,
  GetResultTypeTestCaseSuccess,
  GetResultTypTestCaseFailure,
  GetTestCaseDetails,
  GetTestCaseDetailsFailure,
  GetTestCaseDetailsSuccess,
  GetTruckFunctionAreaFailure,
  GetTruckFunctionAreaSuccess,
  testCaseDetailsActionTypes,
  UpdateTestCaseFailure,
  UpdateTestCaseSuccess,
  UpdateUserGroup,
  UpdateUserGroupSuccess,
  UpdateUserSite,
  UpdateUserSiteSuccess
} from './test-case-detail.actions';

@Injectable()
export class TestCaseDetailsEffects {
  public getUserGroup: string;
  public getUserSite: string;

  constructor(private actions$: Actions,
              private testCaseDetailService: TestCaseDetailService,
              private router: Router,
              private notifyService: NotificationService,
              private store: Store<TestCaseDetailsState>) {
  }

  @Effect() getTestCaseDetails$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.GET_TEST_CASE)
    .mergeMap((action) => {
      return this.testCaseDetailService.getTestCaseDetails((<GetTestCaseDetails>action).id)
        .map((result) => {
          return new GetTestCaseDetailsSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetTestCaseDetailsFailure());
        });
    });
  @Effect() getTestCaseResultType$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.GET_RESULT_TYPE_TEST_CASE)
    .mergeMap((action) => {
      return this.testCaseDetailService.getResultType()
        .map((result) => {
          return new GetResultTypeTestCaseSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetResultTypTestCaseFailure());
        });
    });
  @Effect() getTCTruckFunctionArea$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.GET_TRUCK_FUNCTION_AREA)
    .mergeMap((action) => {
      return this.testCaseDetailService.getTruckFunctionArea()
        .map((result) => {
          return new GetTruckFunctionAreaSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetTruckFunctionAreaFailure());
        });
    });

  @Effect() createTestCase$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.CREATE_TEST_CASE)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, testCaseState]) => {
      return {action, testCaseState};
    })
    .withLatestFrom(this.store.select(testCaseDetailsSelector))
    .mergeMap(([{action, testCaseState}, testCaseDetails]) => {
      if (!testCaseDetails.currentTestCaseStepVersion['testCaseStepTruckFunction']) {
          testCaseDetails.currentTestCaseStepVersion['testCaseStepTruckFunction'] = {};
      }
      return this.testCaseDetailService.createTestCase(testCaseDetails)
        .map((result) => {
          this.notifyService.show('Created Test Case Successfully!', {position: 'top', duration: '2500', type: 'success'});
          const testCaseId = result['id'];
          this.router.navigate(['test-case-step/testCaseDetails/' + testCaseId]);
          return new CreateTestCaseSuccess();
        })
        .catch(() => {
          this.notifyService.show('Create Test Case Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateTestCaseFailure());
        });
    });
  @Effect() createTestCaseCopy$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.CREATE_TEST_CASE_COPY)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, testCaseState]) => {
      return {action, testCaseState};
    })
    .withLatestFrom(this.store.select(testCaseDetailsSelector))
    .mergeMap(([{action, testCaseState}, testCaseDetails]) => {
      if (!testCaseDetails.currentTestCaseStepVersion['testCaseStepTruckFunction']) {
        testCaseDetails.currentTestCaseStepVersion['testCaseStepTruckFunction'] = {};
      }
      return this.testCaseDetailService.createTestCase(testCaseDetails)
        .map((result) => {
          this.notifyService.show('Created Test Case Copy Successfully!', {position: 'top', duration: '2500', type: 'success'});
          const testCaseId = result['id'];
          this.router.navigate(['test-case-step/testCaseDetails/' + testCaseId]);
          this.reloadPage();
          return new CreateTestCaseCopySuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Create Test Case Copy Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateTestCaseFailure());
        });
    });
  @Effect() updateTestCase$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.UPDATE_TEST_CASE)
    .withLatestFrom(this.store.select(testCaseDetailsSelector))
    .mergeMap(([action, testCaseDetails]) => {
      return this.testCaseDetailService.updateTestCase(testCaseDetails)
        .map((result) => {
          // this.router.navigate(['/test']);
          this.notifyService.show('Updated Test Case Successfully!', {position: 'top', duration: '2500', type: 'success'});
          return new UpdateTestCaseSuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Update Test Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UpdateTestCaseFailure());
        });
    });
  @Effect() updateUserGroup$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.UPDATE_USER_GROUP)
    .map((action) => {
      this.getUserGroup = (<UpdateUserGroup>action).payload;
      return new UpdateUserGroupSuccess((<UpdateUserGroup>action).payload);
    });

  @Effect() updateUserSite$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.UPDATE_USER_SITE)
    .map((action) => {
      this.getUserSite = (<UpdateUserSite>action).payload;
      return new UpdateUserSiteSuccess((<UpdateUserSite>action).payload);
    });

  @Effect() deleteTestCase$: Observable<Action> = this.actions$
    .ofType(testCaseDetailsActionTypes.DELETE_TEST_CASE)
    .mergeMap((action) => {
      return this.testCaseDetailService.deleteTestCase((<DeleteTestCase>action).testCaseStepDetails.id)
        .map(() => {
          const testCaseVersion = (<DeleteTestCase>action);
          if (testCaseVersion.testCaseStepDetails.currentTestCaseStepVersion.versionNo > 1) {
            this.notifyService.show('Current Test Case version is successfully deleted!',
              {position: 'top', duration: '2500', type: 'info'});
          } else {
            this.notifyService.show('Test Case is successfully deleted!', {position: 'top', duration: '2500', type: 'info'});
          }
          this.router.navigate(['/test-case-step']);
          return new DeleteTestCaseSuccess();
        })
        .catch(() => {
          return Observable.of(new DeleteTestCaseFailure());
        });
    });
  public reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
}
