import { async } from '@angular/core/testing';
import { getCurrentLang, initialState, translationReducer } from './translation.reducer';
import { ChangeLanguage, ChangeLanguageSuccess } from './translation.actions';

describe('TranslationReducer', () => {

  const testLanguage: string = 'en_EN';

  it('should return state with currentLang on ChangeLanguageSuccess', async(() => {
    const state = translationReducer(initialState, new ChangeLanguageSuccess(testLanguage));
    expect(state.currentLang).toEqual(testLanguage);
  }));

  it('should return state with initial currentLang when other action', async(() => {
    const state = translationReducer(initialState, new ChangeLanguage(testLanguage));
    expect(state.currentLang).toEqual(initialState.currentLang);
  }));

  describe('getter methods', () => {
    it('should get currentLang', () => {
      expect(getCurrentLang(initialState)).toBe(initialState.currentLang);
    });
  });

});
