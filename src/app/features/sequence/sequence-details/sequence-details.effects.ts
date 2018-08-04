import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { cloneDeep, sortBy } from 'lodash';
import { NotificationService } from 'ng2-notify-popup';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {
  sequenceDetailsSelector,
  SequenceDetailsState,
  stateSelector} from './sequence-details.reducer';
import {
  CheckForParentSequence, CheckForParentSequenceSuccess, ClearSequenceDetailsData, CreateSequenceCopySuccess,
  CreateSequenceFailure,
  CreateSequenceSuccess, DeleteAndUpdateSequenceLines, DeleteSequence, DeleteSequenceFailure, DeleteSequenceItem,
  DeleteSequenceLine,
  DeleteSequenceSuccess,
  GetSequenceDetails,
  GetSequenceDetailsFailure,
  GetSequenceDetailsSuccess,
  GetTrackList,
  GetTrackListFailure,
  GetTrackListSuccess, ReorderSequenceLine,
  sequenceDetailsActionTypes, UpdateSequenceDetails,
  UpdateSequenceDetailsFailure, UpdateSequenceDetailsForm,
  UpdateSequenceDetailsSuccess,
} from './sequence-details.actions';
import { testCaseStepListActionTypes,
  GetTestCaseList,
  GetTestCaseListFailure,
  GetTestCaseListSuccess } from './add-sequence-preconditions/test-case-step/test-case-step.actions';
import { SequenceDetailsService } from './sequence-details.service';
import { SequenceLines } from './sequence-details.model';
import { TestCaseStep } from './add-sequence-preconditions/test-case-step/test-case-step.model';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';


@Injectable()
export class SequenceDetailsEffects {
  public getUserGroup: string;
  public getUserSite: string;
  constructor(private actions$: Actions,
              private router: Router,
              private notifyService: NotificationService,
              private store: Store<SequenceDetailsState>,
              private sequenceDetailsService: SequenceDetailsService) {
  }

  @Effect() getTrackList$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.GET_TRACK_LIST)
    .mergeMap((action) => {
      return this.sequenceDetailsService.getTrackList((<GetTrackList>action).siteId)
        .map((result) => new GetTrackListSuccess(result))
        .catch(() => Observable.of(new GetTrackListFailure()));
    });

  @Effect() getSequenceDetails$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.GET_SEQUENCE_DETAILS)
    .mergeMap((action) => {
      return this.sequenceDetailsService.getSequenceDetails((<GetSequenceDetails>action).id)
        .map((result) => new GetSequenceDetailsSuccess(result))
        .catch(() => Observable.of(new GetSequenceDetailsFailure()));
    });



  @Effect() createSequence$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.CREATE_SEQUENCE)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, sequenceDetailsState]) => {
      return {action, sequenceDetailsState};
    })
    .withLatestFrom(this.store.select(sequenceDetailsSelector))
    .mergeMap(([{action, sequenceDetailsState}, sequenceDetails]) => {
      let createSequenceData = cloneDeep(sequenceDetails);
        createSequenceData.sequenceLines = this.orderLineItems(createSequenceData.sequenceLines);
        createSequenceData = this.sequenceData(createSequenceData);
      return this.sequenceDetailsService.createSequenceData(createSequenceData)
        .map((result) => {
          this.notifyService.show('Sequence is successfully created!', {position: 'top', duration: '2500', type: 'success'});
          const sequenceId = result['id'];
          this.router.navigate(['sequence/details/' + sequenceId]);
          // this.reloadPage();
          return new CreateSequenceSuccess();
        })
        .catch(() => {
          this.notifyService.show('Create Sequence Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateSequenceFailure());
        });
    });

  @Effect() getTestCaseList$: Observable<Action> = this.actions$
    .ofType(testCaseStepListActionTypes.LOAD_TEST_CASE)
    .mergeMap(() => {
      return this.sequenceDetailsService.getTestCaseList()
        .map(() => new GetTestCaseListFailure());
    });

  @Effect() createSequenceCopy$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.CREATE_SEQUENCE_COPY)
    .withLatestFrom(this.store.select(stateSelector))
    .map(([action, sequenceDetailsState]) => {
      return {action, sequenceDetailsState};
    })
    .withLatestFrom(this.store.select(sequenceDetailsSelector))
    .mergeMap(([{action, sequenceDetailsState}, sequenceDetails]) => {
      let createSequenceData = cloneDeep(sequenceDetails);
      if ( createSequenceData.sequenceLines && createSequenceData.sequenceLines.length > 0 ) {
        createSequenceData.sequenceLines = this.orderLineItems(createSequenceData.sequenceLines);
        for ( const lineItem of  createSequenceData.sequenceLines){
          lineItem.id = 0;
          if (lineItem.sequenceLineType === 'SEQUENCE_GROUP') {
            lineItem.sequenceGroupID.id = 0;
            for ( const group of  lineItem.sequenceGroupID.sequenceGroupLines){
              group.id = 0;
            }
          }
        }
      }
      createSequenceData = this.sequenceData(createSequenceData);
      return this.sequenceDetailsService.createSequenceData(createSequenceData)
        .map((result) => {
          this.notifyService.show('Sequence Copy is successfully created!', {position: 'top', duration: '2500', type: 'success'});
          const sequenceId = result['id'];
          this.router.navigate(['sequence/details/' + sequenceId]);
          // this.reloadPage();
          return new CreateSequenceCopySuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Create Sequence Copy Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new CreateSequenceFailure());
        });
    });

  @Effect() updateSequence$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS)
    .withLatestFrom(this.store.select(sequenceDetailsSelector))
    .mergeMap(([action, sequenceDetails]) => {
      let updateSequenceData = cloneDeep(sequenceDetails);
      updateSequenceData.sequenceLines = this.orderLineItems(updateSequenceData.sequenceLines);
      updateSequenceData = this.sequenceData(updateSequenceData);
      return this.sequenceDetailsService.updateSequenceDetails(updateSequenceData)
        .map((result) => {
          this.notifyService.show('Sequence is successfully updated!', {position: 'top', duration: '2500', type: 'success'});
          this.reloadPage();
          return new UpdateSequenceDetailsSuccess(result);
        })
        .catch(() => {
          this.notifyService.show('Update Sequence Failed!', {position: 'top', duration: '2500', type: 'error'});
          return Observable.of(new UpdateSequenceDetailsFailure());
        });
    });

  @Effect() getParentSequence$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.CHECK_PARENT_SEQUENCE)
    .mergeMap((action) => {
      return this.sequenceDetailsService.getParentSequence((<CheckForParentSequence>action).id)
        .map((result) => new CheckForParentSequenceSuccess(result))
        .catch(() => Observable.of(new DeleteSequenceFailure()));
    });

  @Effect() deleteSequence$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.DELETE_SEQUENCE)
    .mergeMap((action) => {
      return this.sequenceDetailsService.deleteSequenceData((<DeleteSequence>action).id)
        .map(() => {
          this.router.navigate(['/sequence']);
          this.notifyService.show('Sequence is successfully deleted!', {position: 'top', duration: '2500', type: 'info'});
          return new DeleteSequenceSuccess();
        })
        .catch(() => Observable.of(new DeleteSequenceFailure()));
    });

  @Effect() deleteSequenceLine$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.DELETE_SEQUENCE_LINES)
    .mergeMap((action) => {
      return this.sequenceDetailsService.deleteSequenceLine((<DeleteSequenceLine>action).id)
        .map(() => new DeleteAndUpdateSequenceLines((<DeleteSequenceLine>action).itemNo))
        .catch(() => Observable.of(new DeleteSequenceFailure()));
    });

  @Effect() reorderSequenceLines$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.REORDER_SEQUENCE_LINES)
    .withLatestFrom(this.store.select(sequenceDetailsSelector))
    .map(([action, sequenceDetails]) => {
      const { from, to } = <ReorderSequenceLine>action;
      let sequenceLines: SequenceLines[] = sortBy(sequenceDetails.sequenceLines, ['lineNo']);
      sequenceLines.splice(to, 0, sequenceLines.splice(from, 1)[0]);
      sequenceLines = this.orderLineItems(sequenceLines);
      return new UpdateSequenceDetailsForm({
        ...sequenceDetails,
        sequenceLines : [
          ...sequenceLines
        ]
      });
    });

  @Effect() deleteAndUpdateSequenceItem$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.DELETE_AND_UPDATE_SEQUENCE_LINES)
    .withLatestFrom(this.store.select(sequenceDetailsSelector))
    .switchMap(([action, sequenceDetails]) => {
      let sequenceLines: SequenceLines[] = sortBy(sequenceDetails.sequenceLines, ['lineNo']);
      sequenceLines.splice((<DeleteSequenceItem>action).itemNo, 1);
      sequenceLines = this.orderLineItems(sequenceLines);
      return [
        new UpdateSequenceDetailsForm({
        ...sequenceDetails,
        sequenceLines : [
          ...sequenceLines
        ]
      }),
        new UpdateSequenceDetails()
      ];
    });

  @Effect() deleteSequenceItem$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.DELETE_SEQUENCE_ITEM)
    .withLatestFrom(this.store.select(sequenceDetailsSelector))
    .map(([action, sequenceDetails]) => {
      let sequenceLines: SequenceLines[] = sortBy(sequenceDetails.sequenceLines, ['lineNo']);
      sequenceLines.splice((<DeleteSequenceItem>action).itemNo, 1);
      sequenceLines = this.orderLineItems(sequenceLines);
      return new UpdateSequenceDetailsForm({
        ...sequenceDetails,
        sequenceLines : [
          ...sequenceLines
        ]
      });
    });

  @Effect() clearSequenceForm$: Observable<Action> = this.actions$
    .ofType(sequenceDetailsActionTypes.CLEAR_SEQUENCE_DETAILS).map(() => new ClearSequenceDetailsData());


  public sequenceData(updateSequenceData) {
    updateSequenceData.testCaseCategory = updateSequenceData.testCaseCategory === ''
      ? null : updateSequenceData.testCaseCategory;
    updateSequenceData.trackDirectionOptions = updateSequenceData.trackDirectionOptions === ''
      ? null : updateSequenceData.trackDirectionOptions;
    updateSequenceData.sequenceTrack = updateSequenceData.sequenceTrack === ''
      ? null : updateSequenceData.sequenceTrack;

    return updateSequenceData;
}

  public orderLineItems(data) {

    let orderLine = 0;
    for ( const item of data) {
      if (item) {
        item.lineNo = ++orderLine;
      }
    }
    return data;
  }

  public reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

}
