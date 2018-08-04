import {
  GetRoutineDetailsSuccess,
  RoutineDetailsAction,
  ActivitiesPaginate,
  UpdateActivitiesFilters,
  ClearActivitiesFilters
} from './routine-details.action';
import {
  RoutineDetails
} from './routine-details.model';
import {
  routineDetailsDefaultState,
  routineDetailsReducer,
  RoutineDetailsState
} from './routine-details.reducer';
import { Filter } from '../../../core/interfaces/filter.model';

describe('RoutineDetailsReducer', () => {
  const emptyAction = {} as RoutineDetailsAction;
  const initialState = routineDetailsReducer(undefined, emptyAction);
  const routineDetails: RoutineDetails = {};

  let state: RoutineDetailsState;
  it('should return a default state', () => {
    expect(initialState).toBe(routineDetailsDefaultState);
  });

  describe('Load Routine Details action', () => {
    it('should get Routine details by Id', () => {
      state = routineDetailsReducer(initialState, new GetRoutineDetailsSuccess(routineDetails));
      expect(state.routineDetails).toEqual(routineDetails);
    });
  });

  describe('activity Update Filters action', () => {
    const filter: Filter = {
      field: 'name',
      value: 'String'
    };

    beforeEach(() => {
      state = routineDetailsReducer(initialState, new UpdateActivitiesFilters(filter));
    });

    // it('should add a filter when the filter doesn\'t exist', () => {
    //   const newFilter: Filter = {
    //     field: 'category',
    //     value: 'STANDARD'
    //   };
    //   const newState: RoutineDetailsState = routineDetailsReducer(state, new UpdateActivitiesFilters(newFilter));
    //   expect(newState.filters).toEqual({name: filter.value, category: newFilter.value});
    // });

    it('should update the filter if the filter already exists', () => {
      const updateFilter: Filter = {
        field: 'name',
        value: 'PVT_GOT'
      };
      const newState: RoutineDetailsState = routineDetailsReducer(state, new UpdateActivitiesFilters(updateFilter));
      expect(newState.filters).toEqual({name: updateFilter.value});
    });

    it('should remove a filter if the value is blank', () => {
      const removeFilter = {
        field: 'name',
        value: ''
      };
      const newState: RoutineDetailsState = routineDetailsReducer(state, new UpdateActivitiesFilters(removeFilter));
      expect(newState.filters).toEqual({});
    });

    it('should clear filter', () => {
      const newState: RoutineDetailsState = routineDetailsReducer(state, new ClearActivitiesFilters());
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
      const newState = routineDetailsReducer(initialState, new ActivitiesPaginate(newPagination));
      expect(newState.pagination).toEqual(newPagination);
    });
  });
});
