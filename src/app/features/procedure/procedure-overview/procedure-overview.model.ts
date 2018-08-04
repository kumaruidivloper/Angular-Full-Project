export interface Procedure {
  id?: number;
  type?: string;
  name?: string;
  basedOn?: string;
  description?: string;
  category?: string;
  changed?: any;
  totalTestCases?: number;
  procedureId?: number;
  procedureUserGroup?: any;
  noOfCycles?: number;
  changeInfo?: any;
  testOverView?: string;
  procedureSite?: any;
}

export enum ProcedureStatus {
  ALL = 'ALL',
  STANDARD = 'STANDARD',
  DEVELOPMENT = 'DEVELOPMENT'
}

export enum ChangeStatus {
  ALL = 'ALL',
  true = 'YES',
  false = 'NO'
}

export interface ProcedureOverviewFilters {
  procedureUserGroup?: string;
  procedureSite?: string;
  name?: string;
  category?: string;
  basedOn?: string;
  changed?: string;
}
