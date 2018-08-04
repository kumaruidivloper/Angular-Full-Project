import { ClearFilters, Paginate, ProcedureOverviewActions, UpdateProcedureFilters } from './procedure-overview.actions';
import {
  procedureOverviewDefaultState,
  procedureOverviewReducer,
  ProcedureOverviewState
} from './procedure-overview.reducer';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import { Filter } from '../../../core/interfaces/filter.model';

describe('ProcedureOverview Reducer', () => {
  const emptyAction = {} as ProcedureOverviewActions;
  const initialState = procedureOverviewReducer(undefined, emptyAction);

  it('should return a default state', () => {
    expect(initialState).toBe(procedureOverviewDefaultState);
  });

  describe('UpdateProcedureFilters action', () => {
    const filter: Filter = {
      field: 'name',
      value: 'String'
    };
    let state: ProcedureOverviewState;

    beforeEach(() => {
      state = procedureOverviewReducer(initialState, new UpdateProcedureFilters(filter));
    });

    // @todo fix tests and check that filtering works
    // it('should add a filter when the filter doesn\'t exist', () => {
    //   const newFilter: Filter = {
    //     field: 'category',
    //     value: 'STANDARD'
    //   };
    //
    //   const newState: ProcedureOverviewState = procedureOverviewReducer(state, new UpdateProcedureFilters(newFilter));
    //   expect(newState.filters).toEqual({name: filter.value, category: newFilter.value});
    // });
    //
    // it('should update the filter if the filter already exists', () => {
    //   const updateFilter: Filter = {
    //     field: 'name',
    //     value: 'STANDARD'
    //   };
    //
    //   const newState: ProcedureOverviewState = procedureOverviewReducer(state, new UpdateProcedureFilters(updateFilter));
    //   expect(newState.filters).toEqual({name: updateFilter.value});
    // });
    //
    // it('should remove a filter if the value is blank', () => {
    //   const removeFilter = {
    //     field: 'name',
    //     value: ''
    //   };
    //
    //   const newState: ProcedureOverviewState = procedureOverviewReducer(state, new UpdateProcedureFilters(removeFilter));
    //   expect(newState.filters).toEqual({});
    // });

    it('should clear Filter on ClearFilter Action', () => {
      const newState: ProcedureOverviewState = procedureOverviewReducer(state, new ClearFilters());
      expect(newState.filters).toEqual({});
    });
  });

  describe('SortProcedure action', () => {
    const sort: SortOptions = {
      field: 'name',
      direction: SortDirection.ASC
    };

    let state: ProcedureOverviewState;

    beforeEach(() => {
      state = Object.assign({}, initialState, { sort: sort });
    });

    it('should sort ascending by default if no sort defined', () => {
      expect(state.sort).toEqual(sort);
    });

    // @todo add tests back in when sort is implemented
    // it('should sort ascending by default if different field sorted', () => {
    //   const newSort = {
    //     field: 'category',
    //     direction: SortDirection.ASC
    //   };
    //
    //   const newState: ProcedureOverviewState = procedureOverviewReducer(state, new Sort(newSort.field));
    //   expect(newState.sort).toEqual(newSort);
    // });

    // it('should sort DESC if the current sort is ASC on the same field', () => {
    //   const newSort = {
    //     field: 'name',
    //     direction: SortDirection.DESC
    //   };
    //
    //   const newState: ProcedureOverviewState = procedureOverviewReducer(state, new Sort(newSort.field));
    //   expect(newState.sort).toEqual(newSort);
    // });

    // it('should clear sort if the current sort is DESC on the same field', () => {
    //   const sortDesc: SortOptions = {
    //     field: 'name',
    //     direction: SortDirection.DESC
    //   };
    //
    //   state = Object.assign({}, initialState, { sort: sortDesc });
    //
    //   const newState: ProcedureOverviewState = procedureOverviewReducer(state, new Sort(sortDesc.field));
    //   expect(newState.sort).not.toBeDefined();
    // });
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

      const newState = procedureOverviewReducer(initialState, new Paginate(newPagination));
      expect(newState.pagination).toEqual(newPagination);
    });
  });
});
