export interface Test {
  testId: string;
  testObjectField: string;
  name: string;
  project: string;
  wbs: string;
  testLeader: string;
  status: string;
  site: string;
  userGroup: string;
}

export enum TestStatus {
  ALL = 'ALL',
  INITIATED = 'INITIATED',
  DEPLOYED = 'DEPLOYED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}


export interface TestOverviewFilters {
  userGroup?: string;
  userSite?: string;
  testObject?: string;
  name?: string;
  project?: string;
  description?: string;
  wbs?: string;
  testLeader?: string;
  status?: TestStatus;
}

