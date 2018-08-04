import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { cloneDeep } from 'lodash';
import { NotificationService } from 'ng2-notify-popup';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { stateSelector } from '../test-overview/test-overview.reducer';
import {
  CreateTestFailure,
  CreateTestSuccess,
  DeleteTest,
  DeleteTestFailure,
  DeleteTestSuccess,
  GetTestDetailsFailure,
  GetTestDetailsSuccess,
  GetTestSoftwareVersionFailure,
  GetTestDetails,
  GetTestObjectFailure,
  UpdateTestFailure,
  UpdateTestSuccess,
  GetTestLeaders, GetTestObjectSuccess, GetTestSoftwareVersionSuccess, GetTestLeadersSuccess,
  testDetailsActionTypes, UpdateUserGroup, UpdateUserSite, UpdateUserSiteSuccess, UpdateUserGroupSuccess
} from './test-details.actions';
import { testDetailsSelector, TestDetailsState } from './test-details.reducer';

import { TestDetailsService } from './test-details.service';

@Injectable()
export class TestDetailsEffects {
  public getUserGroup: string;
  public getUserSite: string;
  constructor(private actions$: Actions,
              private testDetailsService: TestDetailsService,
              private router: Router,
              private notifyService: NotificationService,
              private store: Store<TestDetailsState>) {
  }

  @Effect() getTestDetails$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.GET_TEST_DETAILS)
    .mergeMap((action) => {
      return this.testDetailsService.getTestDetails((<GetTestDetails>action).id)
        .map((result) => {
          return new GetTestDetailsSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetTestDetailsFailure());
        });
    });

  @Effect() getTestObject$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.GET_TEST_OBJECTS)
    .mergeMap(() => {
      return this.testDetailsService.getTestObjects()
        .map((result) => {
          return new GetTestObjectSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetTestObjectFailure());
        });
    });

  @Effect() getTestSWVersion$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.GET_TEST_SOFTWARE_VERSION)
    .mergeMap(() => {
      return this.testDetailsService.getTestSWVersion()
        .map((result) => {
          return new GetTestSoftwareVersionSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetTestSoftwareVersionFailure());
        });
    });



  @Effect() deleteTest$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.DELETE_TEST)
    .mergeMap((action) => {
      return this.testDetailsService.deleteTestData((<DeleteTest>action).id)
        .map(() => {
          this.router.navigate(['/test']);
          this.notifyService.show('Test is successfully deleted!', {position: 'top', duration: '2500', type: 'info'});
          return new DeleteTestSuccess();
        })
        .catch(() => {
          return Observable.of(new DeleteTestFailure());
        });
    });

  @Effect() updateTest$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.UPDATE_TEST)
    .withLatestFrom(this.store.select(testDetailsSelector))
    .mergeMap(([action, testDetails]) => {
      return this.testDetailsService.updateTestData(testDetails)
        .map(() => {
          // this.router.navigate(['/test']);
          this.notifyService.show('Test is successfully updated!', {position: 'top', duration: '2500', type: 'success'});
          this.reloadPage();
          return new UpdateTestSuccess();
        })
        .catch(() => {
          this.notifyService.show('Update Test Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UpdateTestFailure());
        });
    });

  @Effect() createTest$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.CREATE_TEST)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, testOverviewState]) => {
      return {action, testOverviewState};
    })
    .withLatestFrom(this.store.select(testDetailsSelector))
    .mergeMap(([{action, testOverviewState}, testDetails]) => {
      const createTestData = cloneDeep(testDetails);
      createTestData.testId = undefined;

      return this.testDetailsService.createTestData(createTestData)
        .map((result) => {
          this.notifyService.show('Test is successfully created!', {position: 'top', duration: '2500', type: 'success'});
          const testId = result['testId'];
          this.router.navigate(['test/details/' + testId]);
          this.reloadPage();
          return new CreateTestSuccess();
        })
        .catch(() => {
          this.notifyService.show('Create Test Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateTestFailure());
        });
    });

  @Effect() updateUserGroup$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.UPDATE_USER_GROUP)
    .map((action) => {
      this.getUserGroup = (<UpdateUserGroup>action).payload;
      return new UpdateUserGroupSuccess((<UpdateUserGroup>action).payload);
    });

  @Effect() updateUserSite$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.UPDATE_USER_SITE)
    .map((action) => {
      this.getUserSite = (<UpdateUserSite>action).payload;
      return new UpdateUserSiteSuccess((<UpdateUserSite>action).payload);
    });
  //
  // @Effect() complete$: Observable<Action> = this.actions$
  //   .ofType(testDetailsActionTypes.UPDATE_USER_SITE_SUCCESS)
  //   .combineLatest(this.actions$.ofType(testDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS), (testSite, testGroup) => {
  //       return new GetTestLeaders({groupId: testGroup, siteId: testSite});
  //     }
  //   ).take(1);

  @Effect() getTestLeader$: Observable<Action> = this.actions$
    .ofType(testDetailsActionTypes.GET_TEST_LEADERS)
    .mergeMap((action) => {
      return this.testDetailsService.getTestLeader((<GetTestLeaders>action).payload)
        .map((result) => {
          return new GetTestLeadersSuccess(result);
        });
    });

  public reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

}
