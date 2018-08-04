export interface Routine {
  id?: any;
  routineSite?: any;
  name?: string;
  category?: string;
  status?: string;
  privateRoutine?: string;
  description?: string;
}

export interface RoutineOverviewFilters {
  name?: string;
  category?: string;
  status?: string;
  privateRoutine?: string;
}
