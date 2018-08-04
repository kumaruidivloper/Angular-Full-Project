import { Action } from '@ngrx/store';
import { SequenceDetails, TrackList } from './sequence-details.model';
import { Sequence } from '../sequence-overview/sequence-overview.model';

export const sequenceDetailsActionTypes = {
  GET_TRACK_LIST: '[SequenceDetails] Get Track List',
  GET_TRACK_LIST_SUCCESS: '[SequenceDetails] Get Track List Successful',
  GET_TRACK_LIST_FAILURE: '[SequenceDetails] Get Track List Failure',
  GET_SEQUENCE_DETAILS: '[SequenceDetails] Get Sequence Details',
  GET_SEQUENCE_DETAILS_SUCCESS: '[SequenceDetails] Get Sequence Details Successful',
  GET_SEQUENCE_DETAILS_FAILURE: '[SequenceDetails] Get Sequence Details Failure',
  DELETE_SEQUENCE_ITEM: '[SequenceDetails] Delete Sequence item',
  DELETE_SEQUENCE: '[SequenceDetails] Delete Sequence',
  DELETE_SEQUENCE_SUCCESS: '[SequenceDetails] Delete Sequence Success',
  DELETE_SEQUENCE_FAILURE: '[SequenceDetails] Delete Sequence Failure',
  UPDATE_SEQUENCE_DETAILS: '[SequenceDetails] Update Sequence Details',
  UPDATE_SEQUENCE_DETAILS_FAILURE: '[SequenceDetails] Update Sequence Details Failure',
  UPDATE_SEQUENCE_DETAILS_SUCCESS: '[SequenceDetails] Update Sequence Details Success',
  CREATE_SEQUENCE: '[SequenceDetails] Create Sequence',
  CREATE_SEQUENCE_FAILURE: '[SequenceDetails] Create Sequence Failure',
  CREATE_SEQUENCE_SUCCESS: '[SequenceDetails] Create Sequence Success',
  UPDATE_SEQUENCE_DETAILS_FORM: '[SequenceDetails] Update Form',
  UPDATE_USER_GROUP: '[SequenceDetails] Update User Group',
  UPDATE_USER_GROUP_SUCCESS: '[SequenceDetails] Update User Group Success' ,
  UPDATE_USER_SITE: '[SequenceDetails] Update User Site',
  UPDATE_USER_SITE_SUCCESS: '[SequenceDetails] Update User Site Success',
  CLEAR_SEQUENCE_DETAILS: '[SequenceDetails] Clear Test Case',
  CLEAR_SEQUENCE_DETAILS_DATA: '[SequenceDetails] Clear Test Case Data',
  REORDER_SEQUENCE_LINES: '[SequenceDetails] Reorder Sequence Lines',
  DELETE_SEQUENCE_LINES: '[SequenceDetails] Delete Sequence Lines',
  CHECK_PARENT_SEQUENCE: '[SequenceDetails] Check for Parent Sequence',
  CHECK_PARENT_SEQUENCE_SUCCESS: '[SequenceDetails] Check for Parent Sequence Success',
  CREATE_SEQUENCE_COPY: '[SequenceDetails] Create Sequence Copy',
  CREATE_SEQUENCE_COPY_SUCCESS: '[SequenceDetails] Create Sequence Copy Success',
  DELETE_AND_UPDATE_SEQUENCE_LINES: '[SequenceDetails] Delete and Update Sequence Lines'
};

export class GetTrackList implements Action {
  readonly type: string = sequenceDetailsActionTypes.GET_TRACK_LIST;
  constructor ( public siteId: string) {}
}

export class GetTrackListSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.GET_TRACK_LIST_SUCCESS;
  constructor ( public trackList: TrackList) {}
}

export class GetTrackListFailure implements Action {
  readonly type: string = sequenceDetailsActionTypes.GET_TRACK_LIST_FAILURE;
}

export class GetSequenceDetails implements Action {
  readonly type: string = sequenceDetailsActionTypes.GET_SEQUENCE_DETAILS;
  constructor(public id: number) {}
}

export class GetSequenceDetailsSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.GET_SEQUENCE_DETAILS_SUCCESS;
  constructor(public payload: SequenceDetails) {}
}

export class GetSequenceDetailsFailure implements Action {
  readonly type: string = sequenceDetailsActionTypes.GET_SEQUENCE_DETAILS_FAILURE;
}

export class DeleteSequence implements Action {
  readonly type: string = sequenceDetailsActionTypes.DELETE_SEQUENCE;
  constructor(public id: number) {}
}

export class DeleteSequenceSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.DELETE_SEQUENCE_SUCCESS;
}

export class DeleteSequenceFailure implements Action {
  readonly type: string = sequenceDetailsActionTypes.DELETE_SEQUENCE_FAILURE;
}

export class UpdateSequenceDetails implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS;
}

export class UpdateSequenceDetailsFailure implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS_FAILURE;
}

export class UpdateSequenceDetailsSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS_SUCCESS;
  constructor (public sequenceDetails: SequenceDetails) {}
}

export class CreateSequence implements Action {
  readonly type: string = sequenceDetailsActionTypes.CREATE_SEQUENCE;
}

export class CreateSequenceFailure implements Action {
  readonly type: string = sequenceDetailsActionTypes.CREATE_SEQUENCE_FAILURE;
}

export class CreateSequenceSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.CREATE_SEQUENCE_SUCCESS;
}

export class UpdateSequenceDetailsForm implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS_FORM;
  constructor(public sequenceDetails: SequenceDetails) {}
}

export class UpdateUserGroup implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_USER_GROUP;
  constructor(public payload: string) {}
}

export class UpdateUserGroupSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS;
  constructor(public payload: string) {}
}

export class UpdateUserSite implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_USER_SITE;
  constructor(public payload: any) {}
}

export class UpdateUserSiteSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.UPDATE_USER_SITE_SUCCESS;
  constructor(public payload: any) {}
}

export class ClearSequenceDetails implements Action {
  readonly type: string = sequenceDetailsActionTypes.CLEAR_SEQUENCE_DETAILS;
}

export class ClearSequenceDetailsData implements Action {
  readonly type: string = sequenceDetailsActionTypes.CLEAR_SEQUENCE_DETAILS_DATA;
}

export class ReorderSequenceLine implements Action {
  readonly type: string = sequenceDetailsActionTypes.REORDER_SEQUENCE_LINES;
  constructor(public from: number, public to: number) {}
}

export class DeleteSequenceLine implements Action {
  readonly type: string = sequenceDetailsActionTypes.DELETE_SEQUENCE_LINES;
  constructor(public id: number, public itemNo: number) {}
}

export class CheckForParentSequence implements Action {
  readonly type: string = sequenceDetailsActionTypes.CHECK_PARENT_SEQUENCE;
  constructor(public id: number) {}
}

export class CheckForParentSequenceSuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.CHECK_PARENT_SEQUENCE_SUCCESS;
  constructor(public sequence: Sequence[]) {}
}

export class DeleteSequenceItem implements Action {
  readonly type: string = sequenceDetailsActionTypes.DELETE_SEQUENCE_ITEM;
  constructor(public itemNo: number) {}
}

export class CreateSequenceCopy implements Action {
  readonly type: string = sequenceDetailsActionTypes.CREATE_SEQUENCE_COPY;
}

export class CreateSequenceCopySuccess implements Action {
  readonly type: string = sequenceDetailsActionTypes.CREATE_SEQUENCE_COPY_SUCCESS;
  constructor(public sequenceCopy: SequenceDetails) {}
}

export class DeleteAndUpdateSequenceLines implements Action {
  readonly type: string = sequenceDetailsActionTypes.DELETE_AND_UPDATE_SEQUENCE_LINES;
  constructor(public itemNo: number) {}
}

export type SequenceDetailsActions = GetTrackList | GetTrackListSuccess
                                    | GetTrackListFailure | GetSequenceDetails
                                    | GetSequenceDetailsSuccess | GetSequenceDetailsFailure
                                    | DeleteSequence | DeleteSequenceSuccess
                                    | DeleteSequenceFailure | UpdateSequenceDetails
                                    | UpdateSequenceDetailsFailure | UpdateSequenceDetailsSuccess
                                    | CreateSequence | CreateSequenceFailure
                                    | CreateSequenceSuccess | UpdateSequenceDetailsForm
                                    | UpdateUserGroup | UpdateUserGroupSuccess
                                    | UpdateUserSite | UpdateUserSiteSuccess
                                    | ClearSequenceDetails | ReorderSequenceLine | DeleteSequenceLine
                                    | CheckForParentSequence | CheckForParentSequenceSuccess
                                    | DeleteSequenceItem | CreateSequenceCopy | CreateSequenceCopySuccess
                                    | DeleteAndUpdateSequenceLines | ClearSequenceDetailsData;


