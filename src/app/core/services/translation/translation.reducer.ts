import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnyAction, ChangeLanguageSuccess, translationActions } from './translation.actions';

export const translationFeatureName: string = 'translations';

export interface TranslationState {
  currentLang: string;
}

export const initialState: TranslationState = {
  currentLang: 'en_GB'
};

export function translationReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case translationActions.CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        currentLang: (<ChangeLanguageSuccess>action).language
      };

    default:
      return state;
  }
}

export const getCurrentLang = (state: TranslationState) => state.currentLang;

const translationStateSelector = createFeatureSelector<TranslationState>(translationFeatureName);
export const currentLangSelector = createSelector(translationStateSelector, getCurrentLang);
