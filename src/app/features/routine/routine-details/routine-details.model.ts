import { UserGroup, UserSite} from '../../../core/services/user/user.model';


export interface RoutineDetails {
  id?: any;
  name?: string;
  routineSite?: UserSite;
  routineUserGroup?: UserGroup;
  objectRoutineVersion?: any;
  objectCurrentRoutineVersion?: CurrentRoutine;
  category?: string;
  level?: string;
}

export interface RoutineResultType {
  name: string;
}

export interface CurrentRoutine {
  attachmentRequired?: boolean;
  category?: string;
  changeInfo?: Object;
  description?: string;
  id?: number;
  routineUploadFile?: any;
  name?: string;
  privateRoutine?: boolean;
  routineActivity?: RoutineActivity[];
  routineResultTypeRoutine?: string;
  status?: string;
  versionNo?: string;
}

export interface RoutineActivity {
   name?: string;
}

export interface RoutineDetailsFilters {
  name?: string;
}

export enum RoutineCategoryOptions {
  STANDARD = 'STANDARD',
  DEVELOPMENT = 'DEVELOPMENT'
}
export enum RoutineStatusOptions {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum RoutineAttachmentOptions {
  false = 'NO',
  true = 'YES'

}

export  enum RoutinePrivateOptions {
  true = 'YES',
  false = 'NO'
}

export enum DefaultRoutineCategoryOption {
  STANDARD = 'STANDARD'
}

export enum DefaultRoutineStatusOption {
  ACTIVE = 'ACTIVE'
}

export enum DefaultAttachmentOption {
  false = 'NO'
}

export enum DefaultResultOption {
  DONE = 'DONE'
}

export enum DefaultPrivateOption {
  NO = 'NO'
}
