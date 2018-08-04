import {
  GetTestStepDetails,
  GetTestStepDetailsSuccess,
  GetTestStepDetailsFailure,
  CreateTestStep,
  CreateTestStepSuccess,
  CreateTestStepFailure,
  UpdateTestStep,
  UpdateTestStepSuccess,
  UpdateTestStepFailure,
  UpdateTestStepDetailsForm,
  DeleteTestStep,
  DeleteTestStepSuccess,
  DeleteTestStepFailure,
  GetResultTypeTestStep,
  GetResultTypeTestStepSuccess,
  GetResultTypTestStepFailure,
  UpdateUserGroup,
  UpdateUserGroupSuccess,
  UpdateUserSite,
  UpdateUserSiteSuccess,
  ClearTestStepDetails,
  CreateTestStepCopy,
  CreateTestStepCopySuccess, TestStepDetailsActions
} from './test-step-detail-actions';
import { TestCaseStepDetails, CurrentTestCaseStepVersion, ResultType } from '../test-case-detail/test-case-detail.model';
import { TestStepDetailsState, testStepDetailsReducer, testStepDetailsDefaultState  } from './test-step-detail.reducer';

describe('TestStepDetailsReducer', () => {
  const emptyAction = {} as TestStepDetailsActions;
  const initialState = testStepDetailsReducer(undefined, emptyAction);
  const testStepDetails: TestCaseStepDetails = {
    'id': 1,
    'testCaseStepType': '',
    'level': '',
    'testCaseStepSite': {},
    'testCaseStepUserGroup': {},
    'testCaseStepVersion': '',
    'currentTestCaseStepVersion': {}
  };

  // const resultType: ResultType  = {
  //   'name': ''
  // };

  let state: TestStepDetailsState;

  it('should return a default state', () => {
    expect(initialState).toBe(testStepDetailsDefaultState);
  });

  describe('Load Test Step Details Object action', () => {
    it('should get Test Step Details Objects', () => {
      const testStepDetailsObject = { id: 1, testCaseStepType: '', level: '', testCaseStepSite: {},
        testCaseStepUserGroup: {}, testCaseStepVersion: '', currentTestCaseStepVersion: {}};
      state = testStepDetailsReducer(initialState, new GetTestStepDetailsSuccess(testStepDetailsObject));
      expect(state.testStepDetails).toEqual(testStepDetailsObject);
    });
  });

  // describe('Get Result Type Test Step action', () => {
  //   it('should get result type test step', () => {
  //     const testStepResultType = resultType;
  //     state = testStepDetailsReducer(initialState, new GetResultTypeTestStepSuccess(testStepResultType));
  //     expect(state.testCaseStepResultType).toEqual(testStepResultType);
  //   });
  // });

  describe('Load Test Step Details action', () => {
    it('should get test details by Id', () => {
      state = testStepDetailsReducer(initialState, new GetTestStepDetailsSuccess(testStepDetails));
      expect(state.testStepDetails).toEqual(testStepDetails);
    });
  });

  describe('Test Step Details create copy', () => {
    it('should copy test details by Id', () => {
      state = testStepDetailsReducer(initialState, new CreateTestStepCopySuccess(testStepDetails));
      expect(state.testStepDetails).toEqual(testStepDetails);
    });
  });

  describe('Test Step Details delete', () => {
    it('should delete test step details by Id', () => {
      state = testStepDetailsReducer(initialState, new CreateTestStepCopySuccess(testStepDetails));
      expect(state.testStepDetails).toEqual(testStepDetails);
    });
  });

  describe('Update Test Step Details', () => {
    it('should update test step details by Id', () => {
      state = testStepDetailsReducer(initialState, new UpdateTestStepSuccess(testStepDetails));
      expect(state.testStepDetails).toEqual(testStepDetails);
    });
  });

  describe('Create Test Step Details', () => {
    it('should create test step details with new Id', () => {
      state = testStepDetailsReducer(initialState, new CreateTestStepCopySuccess(testStepDetails));
      expect(state.testStepDetails).toEqual(testStepDetails);
    });
  });

});
