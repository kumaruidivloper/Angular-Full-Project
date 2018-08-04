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
import { stateSelector, testStepDetailsSelector, TestStepDetailsState } from './test-step-detail.reducer';
import {
  CreateTestStepCopySuccess,
  CreateTestStepFailure,
  CreateTestStepSuccess,
  DeleteTestStep,
  DeleteTestStepFailure,
  DeleteTestStepSuccess,
  GetResultTypeTestStepSuccess,
  GetResultTypTestStepFailure,
  GetTestStepDetails,
  GetTestStepDetailsFailure,
  GetTestStepDetailsSuccess,
  testStepDetailsActionTypes,
  UpdateTestStepFailure,
  UpdateTestStepSuccess,
  UpdateUserGroup,
  UpdateUserGroupSuccess,
  UpdateUserSite,
  UpdateUserSiteSuccess
} from './test-step-detail-actions';
import { TestStepDetailService } from './test-step-detail.service';
import { DeleteTestCase } from '../test-case-detail/test-case-detail.actions';

@Injectable()

export class TestStepDetailsEffects {
  public getUserGroup: string;
  public getUserSite: string;

  constructor(private actions$: Actions,
              private testStepDetailService: TestStepDetailService,
              private router: Router,
              private notifyService: NotificationService,
              private store: Store<TestStepDetailsState>) {
  }

  @Effect() getTestStepDetails$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.GET_TEST_STEP)
    .mergeMap((action) => {
      return this.testStepDetailService.getTestStepDetails((<GetTestStepDetails>action).id)
        .map((result) => {
          return new GetTestStepDetailsSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetTestStepDetailsFailure());
        });
    });
  @Effect() getTestStepResultType$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.GET_RESULT_TYPE_TEST_STEP)
    .mergeMap((action) => {
      return this.testStepDetailService.getResultType()
        .map((result) => {
          return new GetResultTypeTestStepSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetResultTypTestStepFailure());
        });
    });
  @Effect() createTestStep$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.CREATE_TEST_STEP)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, testStepState]) => {
      return {action, testStepState};
    })
    .withLatestFrom(this.store.select(testStepDetailsSelector))
    .mergeMap(([{action, testStepState}, testStepDetails]) => {
        testStepDetails.currentTestCaseStepVersion.testCaseStepTruckFunction = {};
      return this.testStepDetailService.createTestStep(testStepDetails)
        .map((result) => {
          this.notifyService.show('Test Step is successfully created!', {position: 'top', duration: '2500', type: 'success'});
          const testCaseId = result['id'];
          this.router.navigate(['test-case-step/testStepDetails/' + testCaseId]);
          return new CreateTestStepSuccess();
        })
        .catch(() => {
          this.notifyService.show('Create Test Step Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateTestStepFailure());
        });
    });
  @Effect() createTestStepCopy$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.CREATE_TEST_STEP_COPY)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, testStepState]) => {
      return {action, testStepState};
    })
    .withLatestFrom(this.store.select(testStepDetailsSelector))
    .mergeMap(([{action, testStepState}, testStepDetails]) => {
      if (!testStepDetails.hasOwnProperty('testCaseStepTruckFunction')) {
        testStepDetails.currentTestCaseStepVersion.testCaseStepTruckFunction = {};
      }
      return this.testStepDetailService.createTestStep(testStepDetails)
        .map((result) => {
          this.notifyService.show('Created Test Step Copy Successfully!', {position: 'top', duration: '2500', type: 'success'});
          const testCaseId = result['id'];
          this.router.navigate(['test-case-step/testStepDetails/' + testCaseId]);
          // this.reloadPage();
          return new CreateTestStepCopySuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Create Test Step Copy Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateTestStepFailure());
        });
    });
  @Effect() updateTestStep$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.UPDATE_TEST_STEP)
    .withLatestFrom(this.store.select(testStepDetailsSelector))
    .mergeMap(([action, testStepDetails]) => {
        testStepDetails.currentTestCaseStepVersion.testCaseStepTruckFunction = {};
      return this.testStepDetailService.updateTestStep(testStepDetails)
        .map((result) => {
          this.notifyService.show('Test Step is successfully updated!', {position: 'top', duration: '2500', type: 'success'});
          return new UpdateTestStepSuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Update Test Step Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UpdateTestStepFailure());
        });
    });
  @Effect() updateUserGroup$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.UPDATE_USER_GROUP)
    .map((action) => {
      this.getUserGroup = (<UpdateUserGroup>action).payload;
      return new UpdateUserGroupSuccess((<UpdateUserGroup>action).payload);
    });
  @Effect() updateUserSite$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.UPDATE_USER_SITE)
    .map((action) => {
      this.getUserSite = (<UpdateUserSite>action).payload;
      return new UpdateUserSiteSuccess((<UpdateUserSite>action).payload);
    });
  @Effect() deleteTestStep$: Observable<Action> = this.actions$
    .ofType(testStepDetailsActionTypes.DELETE_TEST_STEP)
    .mergeMap((action) => {
      return this.testStepDetailService.deleteTestStep((<DeleteTestStep>action).testCaseStepDetails.id)
        .map(() => {
          const testStepVersion = (<DeleteTestCase>action);
          if (testStepVersion.testCaseStepDetails.currentTestCaseStepVersion.versionNo > 1) {
            this.notifyService.show('Current Test Step version is successfully deleted!',
              {position: 'top', duration: '2500', type: 'info'});
          } else {
            this.notifyService.show('Test Step is successfully deleted!', {position: 'top', duration: '2500', type: 'info'});
          }
          this.router.navigate(['/test-case-step']);
          // this.notifyService.show('Test Step is successfully deleted!', {position: 'top', duration: '2500', type: 'error'});
          return new DeleteTestStepSuccess();
        })
        .catch(() => {
          return Observable.of(new DeleteTestStepFailure());
        });
    });
}
