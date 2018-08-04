import { Action } from '@ngrx/store';
import { translationFeatureName } from './translation.reducer';

export const translationActions = {
  REGISTER_MODULE: `[${translationFeatureName}] Register module`,
  CHANGE_LANGUAGE: `[${translationFeatureName}] Change language`,
  CHANGE_LANGUAGE_SUCCESS: `[${translationFeatureName}] Change language success`,
};

export class RegisterModule implements Action {
  readonly type = translationActions.REGISTER_MODULE;
  constructor(public modulePath: string) {
  }
}

export class ChangeLanguage implements Action {
  readonly type = translationActions.CHANGE_LANGUAGE;
  constructor(public language: string) {
  }
}

export class ChangeLanguageSuccess implements Action {
  readonly type = translationActions.CHANGE_LANGUAGE_SUCCESS;
  constructor(public language: string) {
  }
}

export type AnyAction = RegisterModule | ChangeLanguage | ChangeLanguageSuccess;
