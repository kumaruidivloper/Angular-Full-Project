import { RoutineDetails } from '../../routine/routine-details/routine-details.model';
import { SequenceDetails } from '../../sequence/sequence-details/sequence-details.model';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';
import { EntityType } from '../../../shared/entity-type-badge/entity-type-badge.model';

export interface ProcedureDetailsRouteData {
  isCreate: boolean;
  breadcrumb: string;
}

export interface ProcedureDetails {
  id: number;
  basedOn: ProcedureBase;
  category: ProcedureCategory;
  changeInfo: ChangeInfo;
  changed: ProcedureChanged;
  description: string;
  lines: ProcedureLine[];
  name: string;
  procedureSite: UserSite;
  procedureUserGroup: UserGroup;
  testOverView: string; // @todo confirm this is string
  type: ProcedureType;
}

export enum ProcedureCategory {
  STANDARD = 'STANDARD',
  DEVELOPMENT = 'DEVELOPMENT'
}

export enum ProcedureType {
  STANDARD = 'STANDARD',
  NONSTANDARD = 'NONSTANDARD'
}

export interface ProcedureBase {
  id: number;
  name: string;
}

// @todo move this somewhere shared
export interface ChangeInfo {
  changedByFirstName: string;
  changedByLastName: string;
  changedByUserId: string;
  created: number;
  lestChanged: number;
}

export enum ProcedureChanged {
  YES = 'YES',
  NO = 'NO'
}

export interface ProcedureLine {
  id?: number;
  lineNo?: number;
  procedureLineType: EntityType;
  routine?: RoutineDetails | null;
  sequence?: SequenceDetails | null;
  testCase?: TestCaseDetails | null;
}

export interface SequenceLine {
  id: number;
  lineNo: number;
  sequenceLineType: EntityType;
  routine: RoutineDetails | null;
  sequence: SequenceDetails | null;
  testCase: TestCaseDetails | null;
}

// @todo figure out where to move this interface
export interface TestCaseDetails {
  id: number;
  level: string;
  name: string;
  site: UserSite;
  speed: Speed;
  changeInfo: ChangeInfo;
  testCaseStepType: string; // @todo confirm this is a string
  userGroup: UserGroup;
}


// @todo move this somewhere shared
export interface Speed {
  speedUnit: string;
  speedValue: string;
}
