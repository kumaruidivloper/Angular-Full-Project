import {UserGroup, UserSite} from '../../../../../core/services/user/user.model';

export interface Routine {
  id?: any;
  routineSite?: UserSite;
  routineUserGroup?: UserGroup;
  objectRoutineVersion?: ObjectCurrentRoutineVersion[];
  objectCurrentRoutineVersion?: ObjectCurrentRoutineVersion;
}

export interface ObjectCurrentRoutineVersion {
  name?: string;
  category?: string;
  status?: string;
  privateRoutine?: string;
  description?: string;
}

export interface RoutineListFilters {
  name?: string;
  category?: string;
  status?: string;
  privateRoutine?: string;
}
