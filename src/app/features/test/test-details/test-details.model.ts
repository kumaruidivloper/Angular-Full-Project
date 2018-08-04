import { User } from '../../../core/services/user/user.model';

export interface TestDetails {
  actualStartDate?: any;
  description?: string;
  name?: string;
  plannedStartDate?: any;
  plannedEndDate?: any;
  privateTest?: boolean;
  productClass?: string;
  project?: string;
  testId?: string;
  testObjectField?: string;
  testProcedure?: TestProcedure[];
  testRequestId?: string;
  testSite?: string;
  testStatus?: string;
  testSwVersion?: {name: string};
  testUser?: User;
  testUserGroup?: string;
  wbs?: string;
  changeInfo?: {};
}

export interface TestProcedure {
  id: number;
  type: string;
  name: string;
  description: string;
  basedOn: string;
  changeInfo: object;
  changed: string;
  category: string;
  site: string;
  userGroup: string;
  testOverView: string;
}

export interface TestObject {
  testObjectFieldData?: string;
  productClass?: string;
  testObjectId?: string;
}

export interface TestDetailsFilters {
  name?: string;
  category?: string;
}

export interface SoftwareVersion {
  name: string;
}

export enum TestPrivateOptions {
  true = 'Yes',
  false = 'No'
}

export enum TestStatusOptions {
  INITIATED = 'INITIATED',
  DEPLOYED = 'DEPLOYED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}
export enum DefaultTestStatusOptions {
  INITIATED = 'INITIATED'
}

