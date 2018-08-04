export interface TestCaseStep {
  id: number;
  status: string;
  level: number;
  testCaseStepSite: any;
  testCaseStepUserGroup: any;
  testCaseStepVersion: string;
  currentTestCaseStepVersion: any;
  testCaseStepType?: string;
}

export interface TestStep {
  id: number;
  status: string;
  level: number;
  testCaseStepSite: any;
  testCaseStepUserGroup: any;
  testCaseStepVersion: string;
  currentTestCaseStepVersion: any;
}
