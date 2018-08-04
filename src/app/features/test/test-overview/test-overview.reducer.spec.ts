import { Paginate, Sort, TestOverviewActions, UpdateFilters } from './test-overview.actions';
import { testOverviewDefaultState, testOverviewReducer, TestOverviewState } from './test-overview.reducer';
import { SortOptions, SortDirection } from '../../../core/interfaces/sort.i';
import { Filter } from '../../../core/interfaces/filter.model';

describe('TestOverviewReducer', () => {
  const emptyAction = {} as TestOverviewActions;
  const initialState = testOverviewReducer(undefined, emptyAction);

  it('should return a default state', () => {
    expect(initialState).toBe(testOverviewDefaultState);
  });

  describe('UpdateFilters action', () => {
    const filter: Filter = {
      field: 'testObject',
      value: 'test'
    };
    let state: TestOverviewState;

    beforeEach(() => {
      state = testOverviewReducer(initialState, new UpdateFilters(filter));
    });

    it('should add a filter when the filter doesn\'t exist', () => {
      const newFilter: Filter = {
        field: 'name',
        value: 'test2'
      };

      const newState: TestOverviewState = testOverviewReducer(state, new UpdateFilters(newFilter));

      expect(newState.filters).toEqual({testObject: filter.value, name: newFilter.value});
    });

    it('should update the filter if the filter already exists', () => {
      const updateFilter: Filter = {
        field: 'testObject',
        value: 'test2'
      };

      const newState: TestOverviewState = testOverviewReducer(state, new UpdateFilters(updateFilter));

      expect(newState.filters).toEqual({testObject: updateFilter.value});
    });

    it('should remove a filter if the value is blank', () => {
      const removeFilter = {
        field: 'testObject',
        value: ''
      };

      const newState: TestOverviewState = testOverviewReducer(state, new UpdateFilters(removeFilter));
      expect(newState.filters).toEqual({});
    });
  });

  describe('SortTests action', () => {
    const sort: SortOptions = {
      field: 'name',
      direction: SortDirection.ASC
    };
    let state: TestOverviewState;

    beforeEach(() => {
      state = Object.assign({}, initialState, { sort: sort });
    });

    it('should sort ascending by default if no sort defined', () => {
      expect(state.sort).toEqual(sort);
    });

    it('should sort ascending by default if different field sorted', () => {
      const newSort = {
        field: 'testObject',
        direction: SortDirection.ASC
      };

      const newState: TestOverviewState = testOverviewReducer(state, new Sort(newSort.field));

      expect(newState.sort).toEqual(newSort);
    });

    it('should sort DESC if the current sort is ASC on the same field', () => {
      const newSort = {
        field: 'name',
        direction: SortDirection.DESC
      };

      const newState: TestOverviewState = testOverviewReducer(state, new Sort(newSort.field));

      expect(newState.sort).toEqual(newSort);
    });

    it('should clear sort if the current sort is DESC on the same field', () => {
      const sortDesc: SortOptions = {
        field: 'name',
        direction: SortDirection.DESC
      };

      state = Object.assign({}, initialState, { sort: sortDesc });

      const newState: TestOverviewState = testOverviewReducer(state, new Sort(sortDesc.field));

      expect(newState.sort).not.toBeDefined();
    });
  });

  describe('Paginate action', () => {
    it('should have default pagination', () => {
      expect(initialState.pagination).toBeDefined();
      expect(initialState.pagination.page).toEqual(1);
      expect(initialState.pagination.pageSize).toEqual(20);
    });

    it('should update pagination', () => {
      const newPagination = {
        page: 2,
        pageSize: 50
      };

      const newState = testOverviewReducer(initialState, new Paginate(newPagination));

      expect(newState.pagination).toEqual(newPagination);
    });
  });
});
