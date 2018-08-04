import { MainMenuActions, MainMenuActionTypes } from './main-menu.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MainMenuState {
  menuOpen: boolean;
}

export const mainMenuDefaultState: MainMenuState = {
  menuOpen: false
};

export function mainMenuReducer(state: MainMenuState = mainMenuDefaultState,
                                action: MainMenuActions.Any) {

  switch (action.type) {
    case MainMenuActionTypes.TOGGLE:
      return {
        ...state,
        menuOpen: !state.menuOpen
      };
    default:
      return state;
  }
}

export const getMenuOpen = (state: MainMenuState) => state.menuOpen;

export const stateSelector = createFeatureSelector<MainMenuState>('MainMenu');
export const menuOpenSelector = createSelector(stateSelector, getMenuOpen);
