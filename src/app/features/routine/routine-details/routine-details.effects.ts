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
import { stateSelector } from '../routine-overview/routine-overview.reducer';
import {
  CreateRoutineCopySuccess,
  CreateRoutineFailure,
  CreateRoutineSuccess,
  DeleteRoutine,
  DeleteRoutineFailure,
  DeleteRoutineSuccess,
  GetRoutineDetails,
  GetRoutineDetailsFailure,
  GetRoutineDetailsSuccess,
  GetRoutineResultTypeFailure,
  GetRoutineResultTypeSuccess,
  routineDetailsActionTypes,
  UpdateRoutineFailure,
  UpdateRoutineSuccess,
  UpdateUserGroup,
  UpdateUserGroupSuccess,
  UpdateUserSite,
  UpdateUserSiteSuccess
} from './routine-details.action';
import { routineDetailsSelector, RoutineDetailsState } from './routine-details.reducer';
import { RoutineDetailsService } from './routine-details.service';

@Injectable()

export class RoutineDetailsEffects {

  public getUserGroup: string;
  public getUserSite: string;

  constructor(private actions$: Actions,
              private routineDetailsService: RoutineDetailsService,
              private router: Router,
              private notifyService: NotificationService,
              private store: Store<RoutineDetailsState>) {
  }

  @Effect() getRoutineDetails$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.GET_ROUTINE_DETAILS)
    .mergeMap((action) => {
      return this.routineDetailsService.getRoutineDetails((<GetRoutineDetails>action).id)
        .map((result) => {
          return new GetRoutineDetailsSuccess(result);
        })
        .catch(() => {
          // this.notifyService.show('Failed to fetch this Routine', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new GetRoutineDetailsFailure());
        });
    });

  @Effect() getResultType$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.GET_ROUTINE_RESULT_TYPE)
    .mergeMap(() => {
      return this.routineDetailsService.getRoutineResultType()
        .map((result) => {
          return new GetRoutineResultTypeSuccess(result);
        })
        .catch(() => {
          return Observable.of(new GetRoutineResultTypeFailure());
        });
    });

  @Effect() deleteRoutine$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.DELETE_ROUTINE)
    .mergeMap((action) => {
      return this.routineDetailsService.deleteRoutineData((<DeleteRoutine>action).routineDetails.id)
        .map(() => {
          const deleteRoutineVersion = (<DeleteRoutine>action);
          this.router.navigate(['/routine']);
          if (deleteRoutineVersion.routineDetails.objectCurrentRoutineVersion.versionNo > '1') {
            this.notifyService.show('Current Routine version is successfully deleted!',
              {position: 'top', duration: '2500', type: 'info'});
          } else {
            this.notifyService.show('Routine is successfully deleted!', {
              position: 'top',
              duration: '2500',
              type: 'info'
            });
          }
          return new DeleteRoutineSuccess();
        })
        .catch(() => {
          return Observable.of(new DeleteRoutineFailure());
        });
    });

  @Effect() updateRoutine$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.UPDATE_ROUTINE)
    .withLatestFrom(this.store.select(routineDetailsSelector))
    .mergeMap(([action, routineDetails]) => {
      const updateRoutineData = cloneDeep(routineDetails);
      updateRoutineData.objectRoutineVersion = [updateRoutineData.objectCurrentRoutineVersion];

      return this.routineDetailsService.updateRoutineData(updateRoutineData)
        .map((result) => {
          this.notifyService.show('Routine is successfully updated!', {
            position: 'top',
            duration: '2500',
            type: 'success'
          });
          this.reloadPage();
          return new UpdateRoutineSuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Update Routine Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UpdateRoutineFailure());
        });
    });

  @Effect() createRoutine$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.CREATE_ROUTINE)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, routineOverviewState]) => {
      return {action, routineOverviewState};
    })
    .withLatestFrom(this.store.select(routineDetailsSelector))
    .mergeMap(([{action, routineOverviewState}, routineDetails]) => {
      const createRoutineData = cloneDeep(routineDetails);
      createRoutineData.objectRoutineVersion = [createRoutineData.objectCurrentRoutineVersion];
      return this.routineDetailsService.createRoutineData(createRoutineData)
        .map((result) => {
          this.notifyService.show('Routine is successfully created!', {
            position: 'top',
            duration: '2500',
            type: 'success'
          });
          const routineId = result['id'];
          this.router.navigate(['routine/details/' + routineId]);
          this.reloadPage();
          return new CreateRoutineSuccess();
        })
        .catch(() => {
          this.notifyService.show('Create Routine Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateRoutineFailure());
        });
    });

  @Effect() createRoutineCopy$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.CREATE_ROUTINE_COPY)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, routineOverviewState]) => {
      return {action, routineOverviewState};
    })
    .withLatestFrom(this.store.select(routineDetailsSelector))
    .mergeMap(([{action, routineOverviewState}, routineDetails]) => {
      const createRoutineData = cloneDeep(routineDetails);
      createRoutineData.objectRoutineVersion = [createRoutineData.objectCurrentRoutineVersion];
      return this.routineDetailsService.createRoutineData(createRoutineData)
        .map((result) => {
          this.notifyService.show('Created Routine Copy Successfully!', {
            position: 'top',
            duration: '2500',
            type: 'success'
          });
          const routineId = result['id'];
          this.router.navigate(['routine/details/' + routineId]);
          this.reloadPage();
          return new CreateRoutineCopySuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Create Routine Copy Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateRoutineFailure());
        });
    });


  @Effect() updateUserGroup$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.UPDATE_USER_GROUP)
    .map((action) => {
      this.getUserGroup = (<UpdateUserGroup>action).payload;
      return new UpdateUserGroupSuccess((<UpdateUserGroup>action).payload);
    });

  @Effect() updateUserSite$: Observable<Action> = this.actions$
    .ofType(routineDetailsActionTypes.UPDATE_USER_SITE)
    .map((action) => {
      this.getUserSite = (<UpdateUserSite>action).payload;
      return new UpdateUserSiteSuccess((<UpdateUserSite>action).payload);
    });

  public reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
}
