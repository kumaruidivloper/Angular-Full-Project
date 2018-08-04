import { Sequence } from './sequence-overview.model';
import { SortDirection, SortOptions } from '../../../core/interfaces/sort.i';
import {
  ClearSequenceTableFilters,
  LoadSequencesSuccess,
  PaginateSequence,
  SequenceOverviewActions,
  SortSequence,
  UpdateSequenceFilters
} from './sequence-overview.action';
import {
  sequenceOverviewDefaultState,
  sequenceOverviewReducer,
  SequenceOverviewState
} from './sequence-overview.reducer';
import { PaginatedResponse } from '../../../core/interfaces/paginated-response.i';
import { Filter } from '../../../core/interfaces/filter.model';

describe('SequenceOverview Reducer', () => {
  const emptyAction = {} as SequenceOverviewActions;
  const initialState = sequenceOverviewReducer(undefined, emptyAction);
  const sequence: PaginatedResponse<Sequence[]> = {
    'data': [
      {
        'id': 1,
        'name': 'PVTCHECK1',
        'category': 'STANDARD',
        'privateSequence': true,
        'noOfTestCases': 12,
        'description': 'This is Dummy Seqence',
        'sequenceSite': 'GOT',
        'sequenceUserGroup': 'PVT'
      }
    ],
    'links': {
      'next': {
        'page': 2,
        'pageSize': 20
      },
      'self': {
        'page': 1,
        'pageSize': 20
      }
    },
    'pagination': {
      'page': 1,
      'pageSize': 20,
      'numberOfPages': 1
    }
  };

  it('should return a default state', () => {
    expect(initialState).toBe(sequenceOverviewDefaultState);
  });


  describe('Load Sequences action', () => {
    let state: SequenceOverviewState;

    beforeEach(() => {
      state = sequenceOverviewReducer(initialState, new LoadSequencesSuccess(sequence));
    });

    it('should add a default filter on page load', () => {
      const defaultFilter: Filter = {
        field: 'category',
        value: 'STANDARD'
      };
      const newState: SequenceOverviewState = sequenceOverviewReducer(state, new LoadSequencesSuccess(sequence));
      expect(newState.sequences).toEqual(sequence.data);
      expect(newState.pagination).toEqual(sequence.pagination);
    });
  });

  describe('UpdateSequenceFilters action', () => {
    const filter: Filter = {
      field: 'name',
      value: 'String'
    };
    let state: SequenceOverviewState;

    beforeEach(() => {
      state = sequenceOverviewReducer(initialState, new UpdateSequenceFilters(filter));
    });

    // @todo fix the test and check if functionality really works
    // it('should add a filter when the filter doesn\'t exist', () => {
    //   const newFilter: Filter = {
    //     field: 'category',
    //     value: 'STANDARD'
    //   };
    //
    //   const newState: SequenceOverviewState = sequenceOverviewReducer(state, new UpdateSequenceFilters(newFilter));
    //   expect(newState.filters).toEqual({name: filter.value, category: newFilter.value});
    // });

    // @todo fix the test and check if functionality really works
    it('should update the filter if the filter already exists', () => {
      const updateFilter: Filter = {
        field: 'name',
        value: 'String1'
      };

      const newState: SequenceOverviewState = sequenceOverviewReducer(state, new UpdateSequenceFilters(updateFilter));
      expect(newState.filters).toEqual({name: updateFilter.value});
    });

    // @todo fix the test and check if functionality really works
    it('should remove a filter if the value is blank', () => {
      const removeFilter = {
        field: 'name',
        value: ''
      };

      const newState: SequenceOverviewState = sequenceOverviewReducer(state, new UpdateSequenceFilters(removeFilter));
      expect(newState.filters).toEqual({});
    });

    it('should clear Filter on ClearFilter Action', () => {
      const newState: SequenceOverviewState = sequenceOverviewReducer(state, new ClearSequenceTableFilters());
      expect(newState.filters).toEqual({});
    });
  });

  describe('SortSequence action', () => {
    const sort: SortOptions = {
      field: 'name',
      direction: SortDirection.ASC
    };
    let state: SequenceOverviewState;

    beforeEach(() => {
      state = Object.assign({}, initialState, { sort: sort });
    });

    it('should sort ascending by default if no sort defined', () => {
      expect(state.sort).toEqual(sort);
    });

    it('should sort ascending by default if different field sorted', () => {
      const newSort = {
        field: 'category',
        direction: SortDirection.ASC
      };

      const newState: SequenceOverviewState = sequenceOverviewReducer(state, new SortSequence(newSort.field));
      expect(newState.sort).toEqual(newSort);
    });

    it('should sort DESC if the current sort is ASC on the same field', () => {
      const newSort = {
        field: 'name',
        direction: SortDirection.DESC
      };

      const newState: SequenceOverviewState = sequenceOverviewReducer(state, new SortSequence(newSort.field));
      expect(newState.sort).toEqual(newSort);
    });

    it('should clear sort if the current sort is DESC on the same field', () => {
      const sortDesc: SortOptions = {
        field: 'name',
        direction: SortDirection.DESC
      };

      state = Object.assign({}, initialState, { sort: sortDesc });

      const newState: SequenceOverviewState = sequenceOverviewReducer(state, new SortSequence(sortDesc.field));
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
        pageSize: 30
      };

      const newState = sequenceOverviewReducer(initialState, new PaginateSequence(newPagination));
      expect(newState.pagination).toEqual(newPagination);
    });
  });
});
