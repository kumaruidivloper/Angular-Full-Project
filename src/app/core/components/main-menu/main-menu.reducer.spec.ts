import { getMenuOpen, mainMenuDefaultState, mainMenuReducer } from './main-menu.reducer';
import { MainMenuActions } from './main-menu.actions';

describe('mainMenuReducer', () => {
  const emptyAction = {} as MainMenuActions.Any;

  it('should return default state', () => {
    expect(mainMenuReducer(undefined, emptyAction)).toBe(mainMenuDefaultState);
  });

  it('should toggle the menuOpen boolean when the Toggle action is called', () => {
    const initialState = mainMenuReducer(undefined, emptyAction);
    const toggledState = mainMenuReducer(initialState, new MainMenuActions.Toggle());
    const toggledTwiceState = mainMenuReducer(toggledState, new MainMenuActions.Toggle());

    expect(initialState.menuOpen).toBe(false);
    expect(toggledState.menuOpen).toBe(true);
    expect(toggledTwiceState).toEqual(initialState);
  });

  describe('getMenuOpen function', () => {
    it('should get menuOpen from the state', () => {
      const menuOpen = getMenuOpen({menuOpen: true});

      expect(menuOpen).toBe(true);
    });
  });
});
