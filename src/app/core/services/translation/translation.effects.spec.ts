import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { mockService } from '../../../../testing/mocks/mock-service';
import { TranslationEffects } from './translation.effects';
import { TranslationService } from './translation.service';
import { AnyAction, ChangeLanguage, ChangeLanguageSuccess, RegisterModule } from './translation.actions';

describe('TranslationEffects', () => {

  let effects: TranslationEffects,
      actions: ReplaySubject<AnyAction>,
      translationService: TranslationService;

  const language: string = 'en_GB',
        modulePath: string = 'features/parts';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslationEffects,
        provideMockActions(() => actions),
        mockService(TranslationService)
      ]
    });

    translationService = TestBed.get(TranslationService);
    effects = TestBed.get(TranslationEffects);
  }));

  it('should catch ChangeLanguage action, call service and dispatch ChangeLanguageSuccess', async(() => {
    (<jasmine.Spy>translationService.changeLanguage).and.returnValue(Observable.of(language));
    actions = new ReplaySubject(1);
    actions.next(new ChangeLanguage(language));
    effects.changeLanguage$.subscribe(result => {
      expect(translationService.changeLanguage).toHaveBeenCalledWith(language);
      expect(result).toEqual(new ChangeLanguageSuccess(language));
    });
  }));

  it('should catch RegisterModule action and call service', async(() => {
    actions = new ReplaySubject(1);
    actions.next(new RegisterModule(modulePath));
    effects.registerModule$.subscribe(result => {
      expect(translationService.registerFor).toHaveBeenCalledWith(result);
    });
  }));

});
