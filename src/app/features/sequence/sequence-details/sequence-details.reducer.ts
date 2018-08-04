import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SequenceDetails, TrackList } from './sequence-details.model';
import { omitBy } from 'lodash';
import {
  CheckForParentSequenceSuccess,
  CreateSequenceCopySuccess,
  GetSequenceDetailsSuccess,
  GetTrackListSuccess,
  SequenceDetailsActions,
  sequenceDetailsActionTypes,
  UpdateSequenceDetailsForm,
  UpdateSequenceDetailsSuccess,
  UpdateUserGroupSuccess,
  UpdateUserSiteSuccess,
} from './sequence-details.actions';
import { UpdateTestCaseListFilters,
  GetTestCaseListSuccess,
  PaginateTestCaseList,
  testCaseStepListActionTypes
} from './add-sequence-preconditions/test-case-step/test-case-step.actions';
import { Sequence } from '../sequence-overview/sequence-overview.model';
import { TestCaseStep } from './add-sequence-preconditions/test-case-step/test-case-step.model';

export const sequenceDetailsFeatureName = 'SequenceDetails';

export interface SequenceDetailsState {
  testCases: TestCaseStep[];
  trackList: TrackList[];
  sequenceDetails: SequenceDetails;
  pagination: PaginationParameters;
  paginationTestCase: PaginationParameters;
  filters: any;
  sequenceUserGroup: string;
  sequenceUserSite: string;
  getParentSequences$: Sequence[];
  loader: boolean;
  testCaseFilters: any;
}

export const sequenceDetailsDefaultState: SequenceDetailsState = {
  testCases: [],
  trackList: [],
  sequenceDetails: {},
  filters: {},
  pagination: {
    page: 1,
    pageSize: 5
  },
  paginationTestCase: {
    page: 1,
    pageSize: 5
  },
  sequenceUserGroup: '',
  sequenceUserSite: '',
  getParentSequences$: [],
  loader: false,
  testCaseFilters: {},
};

export function sequenceDetailsReducer(state: SequenceDetailsState = sequenceDetailsDefaultState,
                                   action: SequenceDetailsActions): SequenceDetailsState {

  switch (action.type) {
    case testCaseStepListActionTypes.LOAD_TEST_CASE_SUCCESS:
      return <SequenceDetailsState>{
        ...state,
        testCases: (<GetTestCaseListSuccess> action).testCases.data,
        paginationTestCase: (<GetTestCaseListSuccess> action).testCases.pagination
      };
    case testCaseStepListActionTypes.UPDATE_TEST_CASE_FILTER:
      const filterToUpdate: object = (<UpdateTestCaseListFilters> action).filterData;
      return <SequenceDetailsState>{
        ...state,
        testCaseFilters: omitBy(filterToUpdate, value => value === '')
      };
    case testCaseStepListActionTypes.PAGINATE_TEST_CASE:
      return <SequenceDetailsState>{
        ...state,
        paginationTestCase: (<PaginateTestCaseList>action).payload
      };
    case sequenceDetailsActionTypes.GET_TRACK_LIST_SUCCESS:
      return <SequenceDetailsState>{
        ...state,
        trackList: (<GetTrackListSuccess>action).trackList,
        loader: false
      };
    case sequenceDetailsActionTypes.GET_SEQUENCE_DETAILS_SUCCESS:
      return <SequenceDetailsState>{
        ...state,
        sequenceDetails: (<GetSequenceDetailsSuccess>action).payload,
        loader: false
      };
    case sequenceDetailsActionTypes.CREATE_SEQUENCE_COPY_SUCCESS:
      return <SequenceDetailsState>{
        ...state,
        sequenceDetails: (<CreateSequenceCopySuccess> action).sequenceCopy
      };
    case sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS_FORM:
      return {
        ...state,
        sequenceDetails: {
          ...state.sequenceDetails,
          ...(<UpdateSequenceDetailsForm>action).sequenceDetails
        }
      };
    case sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS_SUCCESS:
      return {
        ...state,
        sequenceDetails: {
          ...state.sequenceDetails,
          ...(<UpdateSequenceDetailsSuccess>action).sequenceDetails
        },
        loader: false
      };
    case sequenceDetailsActionTypes.UPDATE_USER_SITE_SUCCESS:
      return {
        ...state,
        sequenceUserSite: (<UpdateUserSiteSuccess> action).payload
      };
    case sequenceDetailsActionTypes.UPDATE_USER_GROUP_SUCCESS:
      return {
        ...state,
        sequenceUserGroup: (<UpdateUserGroupSuccess> action).payload
      };
    case sequenceDetailsActionTypes.CLEAR_SEQUENCE_DETAILS_DATA:
      return {
        ...state,
        sequenceDetails: sequenceDetailsDefaultState.sequenceDetails
      };
    case sequenceDetailsActionTypes.CHECK_PARENT_SEQUENCE_SUCCESS:
      return {
        ...state,
        getParentSequences$: (<CheckForParentSequenceSuccess>action).sequence,
        loader: false
      };
    case sequenceDetailsActionTypes.GET_SEQUENCE_DETAILS:
    case sequenceDetailsActionTypes.CREATE_SEQUENCE:
    case sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS:
    case sequenceDetailsActionTypes.GET_TRACK_LIST:
    case sequenceDetailsActionTypes.DELETE_SEQUENCE:
    case sequenceDetailsActionTypes.DELETE_SEQUENCE_LINES:
      return {
        ...state,
        loader: true
      };
    case sequenceDetailsActionTypes.GET_SEQUENCE_DETAILS_FAILURE:
    case sequenceDetailsActionTypes.CREATE_SEQUENCE_FAILURE:
    case sequenceDetailsActionTypes.UPDATE_SEQUENCE_DETAILS_FAILURE:
    case sequenceDetailsActionTypes.DELETE_SEQUENCE_FAILURE:
    case sequenceDetailsActionTypes.DELETE_SEQUENCE_SUCCESS:
    case sequenceDetailsActionTypes.DELETE_SEQUENCE_ITEM:
      return {
        ...state,
        loader: false
      };
    default:
      return state;
  }
}


export const getTrackList = (state: SequenceDetailsState) => state.trackList;
export const getSequenceDetails = (state: SequenceDetailsState) => state.sequenceDetails;
export const getFilters = (state: SequenceDetailsState) => state.filters;
export const updateUserSite = (state: SequenceDetailsState) => state.sequenceUserSite;
export const updateUserGroup = (state: SequenceDetailsState) => state.sequenceUserGroup;
export const getParentSequence = (state: SequenceDetailsState) => state.getParentSequences$;
export const loader = (state: SequenceDetailsState) => state.loader;

export const stateSelector = createFeatureSelector<SequenceDetailsState>(sequenceDetailsFeatureName);
export const sequenceTrackSelector = createSelector(stateSelector, getTrackList);
export const sequenceDetailsSelector = createSelector(stateSelector, getSequenceDetails);
export const filtersSelector = createSelector(stateSelector, getFilters);
export const updateUserSiteSelector = createSelector(stateSelector, updateUserSite);
export const updateUserGroupSelector = createSelector(stateSelector, updateUserGroup);
export const getParentSequenceSelector = createSelector(stateSelector, getParentSequence);
export const loaderSelector = createSelector(stateSelector, loader);

