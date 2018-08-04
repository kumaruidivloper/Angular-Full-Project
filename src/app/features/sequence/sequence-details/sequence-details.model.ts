import {UserGroup, UserSite} from '../../../core/services/user/user.model';

export interface SequenceDetails {
  id?: number;
  name?: string;
  category?: string;
  privateSequence?: boolean;
  noOfTestCases?: number;
  description?: string;
  level?: number;
  strict?: string;
  sequenceSite?: UserSite;
  sequenceUserGroup?: UserGroup;
  sequenceType?: string;
  testCaseCategory?: string;
  sequenceLines?: any;
  changeInfo?: object;
  trackDirection?: string;
  sequenceTrack?: object;
}
 export interface TrackList {
   id?: string;
   name?: string;
   trackSite?: object;
 }

 export interface SequenceLines {
   id?: number;
   lineNo?: number;
   versionNoOfType?: number;
   sequenceLineType?: string;
   routine?: object;
   testCase?: object;
   sequence?: object;
 }

