import {
  ClearProcedureFilters,
  GetTestDetailsSuccess,
  GetTestSoftwareVersionSuccess,
  GetTestObjectSuccess,
  ProcedurePaginate,
  TestDetailsActions,
  UpdateProcedureFilters
} from './test-details.actions';

import { TestDetails } from './test-details.model';
import { testDetailsDefaultState, testDetailsReducer, TestDetailsState } from './test-details.reducer';
import { Filter } from '../../../core/interfaces/filter.model';

describe('TestDetailsReducer', () => {
  const emptyAction = {} as TestDetailsActions;
  const initialState = testDetailsReducer(undefined, emptyAction);
  const testDetails: TestDetails = {
    'testId': '1',
    'name': 'PVT BASE-P2952',
    'description': 'PVT BASE-P2951',
    'testStatus': 'INITIATED',
    'plannedStartDate': 1509474600000,
    'actualStartDate': 1535740200000,
    'productClass': '04',
    'wbs': 'A2211-GM-00000001-01',
    'project': 'P2951',
    'privateTest': true,
    'testObjectField': 'FH-1683 11659',
    'testRequestId': '',
    'testSite': 'GOT',
    'testUserGroup': '',
    'testUser': { 'userId': 'GOT'},
    'testSwVersion': {name: 'test'},
    'testProcedure': []
  };

  let state: TestDetailsState;
  it('should return a default state', () => {
    expect(initialState).toBe(testDetailsDefaultState);
  });

  describe('Load Test Object action', () => {
   it('should get test Objects', () => {
      const testObject = [{testObjectFieldData: 'FH-1683 1', productClass: '04', testObjectId: 'FH-1683'}];
      state = testDetailsReducer(initialState, new GetTestObjectSuccess(testObject));
      expect(state.testObjects).toEqual(testObject);
    });
  });

  describe('Load Test Software Version action', () => {
    it('should get test Software Versions', () => {
      const testSoftwareVersion = [{'name': 'ZO11'}];
      state = testDetailsReducer(initialState, new GetTestSoftwareVersionSuccess(testSoftwareVersion));
      expect(state.testSoftwareVersions).toEqual(testSoftwareVersion);
    });
  });

  describe('Load Test Details action', () => {
    it('should get test details by Id', () => {
      state = testDetailsReducer(initialState, new GetTestDetailsSuccess(testDetails));
      expect(state.testDetails).toEqual(testDetails);
    });
  });

  describe('procedure Update Filters action', () => {
    const filter: Filter = {
      field: 'name',
      value: 'String'
    };

    beforeEach(() => {
      state = testDetailsReducer(initialState, new UpdateProcedureFilters(filter));
    });

    it('should add a filter when the filter doesn\'t exist', () => {
      const newFilter: Filter = {
        field: 'category',
        value: 'STANDARD'
      };
      const newState: TestDetailsState = testDetailsReducer(state, new UpdateProcedureFilters(newFilter));
      expect(newState.filters).toEqual({name: filter.value, category: newFilter.value});
    });

    it('should update the filter if the filter already exists', () => {
      const updateFilter: Filter = {
        field: 'name',
        value: 'PVT_GOT'
      };
      const newState: TestDetailsState = testDetailsReducer(state, new UpdateProcedureFilters(updateFilter));
      expect(newState.filters).toEqual({name: updateFilter.value});
    });

    it('should remove a filter if the value is blank', () => {
      const removeFilter = {
        field: 'name',
        value: ''
      };
      const newState: TestDetailsState = testDetailsReducer(state, new UpdateProcedureFilters(removeFilter));
      expect(newState.filters).toEqual({});
    });

    it('should clear filter', () => {
      const newState: TestDetailsState = testDetailsReducer(state, new ClearProcedureFilters());
      expect(newState.filters).toEqual({});
    });
  });

  describe('Paginate action', () => {
    it('should have default pagination', () => {
      expect(initialState.pagination).toBeDefined();
      expect(initialState.pagination.page).toEqual(1);
      expect(initialState.pagination.pageSize).toEqual(5);
    });

    it('should update pagination', () => {
      const newPagination = {
        page: 2,
        pageSize: 10
      };
      const newState = testDetailsReducer(initialState, new ProcedurePaginate(newPagination));
      expect(newState.pagination).toEqual(newPagination);
    });
  });


//  @TODO missing test coverage

});
