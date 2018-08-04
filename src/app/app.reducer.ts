import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { TestOverviewState } from './features/test/test-overview/test-overview.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  routerReducer: RouterReducerState;
  TestOverview?: TestOverviewState;
}

export const appReducer: ActionReducerMap<AppState> = {
  routerReducer: routerReducer
};
