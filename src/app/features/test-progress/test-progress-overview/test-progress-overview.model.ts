export interface TestProgress {
  testId: string;
  name: string;
  project: string;
  progress: number;
  unhandledFaultReports: number;
  deviation: number;
  privateTest: boolean;
  testObjectField: string;
  testRequester: any;
  testObjectPhaseView: any;
  testStatusLog: TestStatusLog[];
  testLeader: string;
  site: string;
  userGroup: string;
}

export enum TestStatusLog {
  ALL = 'ALL',
  AVAILABLE = 'AVAILABLE',
  RUNNING = 'RUNNING',
  STANDSTILL = 'STANDSTILL',
  COMPLETED = 'COMPLETED',
}

export enum CauseOrRunningBy {
  ALL = 'ALL',
  UPDATE_SW_OR_HW = 'UPDATE_SW_OR_HW',
  REPAIR_WORKS = 'REPAIR_WORKS',
  WAITING_FOR_PARTS = ' WAITING_FOR_PARTS ',
  WAITING_FOR_DECISION = 'WAITING_FOR_DECISION',
  LACK_OF_MECHANICS = 'LACK_OF_MECHANICS',
  LACK_OF_DRIVERS = 'LACK_OF_DRIVERS',
  LACK_OF_TEST_ENGINEERS = 'LACK_OF_TEST_ENGINEERS',
  LACK_OF_ENGINEERING = 'LACK_OF_ENGINEERING',
  SUPPORT = 'SUPPORT',
  COMPLETED = 'COMPLETED'
}

export interface TestProgressOverviewFilters {
  userGroup?: string;
  userSite?: string;
  testObject?: string;
  name?: string;
  project?: string;
  testLeader?: string;
  testStatusLog?: TestStatusLog;
  privateTest?: string;
}
