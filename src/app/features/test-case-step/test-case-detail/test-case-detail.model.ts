import {UserGroup, UserSite} from '../../../core/services/user/user.model';

export interface TestCaseStepDetails {
  id?: number;
  testCaseStepType?: string;
  testCaseStepSite?: UserSite;
  testCaseStepUserGroup?: UserGroup;
  testCaseStepVersion?: string;
  currentTestCaseStepVersion?: CurrentTestCaseStepVersion;
}

export interface ResultType {
  name?: string;
}
export interface TruckFunctionArea {
  id?: string;
  name?: string;
}
export interface TruckFunction {
  id?: string;
  name?: string;
}

export interface CurrentTestCaseStepVersion {
  category?: string;
  level?: number;
  changeInfo?: object;
  description?: string;
  expectedResult?: string;
  id?: number;
  testCaseStepUploadFile?: any;
  name?: string;
  notes?: string;
  privateTestCaseStep?: string;
  reqId?: string;
  reqVersion?: string;
  speed?: any;
  status?: string;
  testCaseStepProductClassFilter?: Array<object>;
  testCaseStepResultTypeTC?: any;
  versionNo?: number;
  testCaseStepTags?: any;
  testCaseStepTools?: any;
  testCaseStepTruckFunction?: object;
}
