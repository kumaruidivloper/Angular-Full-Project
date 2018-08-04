import { Action } from '@ngrx/store';

export module MainMenuActionTypes {
  export const TOGGLE = '[MainMenu] Toggle';
}

export module MainMenuActions {
  export class Toggle implements Action {
    readonly type = MainMenuActionTypes.TOGGLE;
  }

  export type Any = Toggle;
}

