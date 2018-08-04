import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ChangeLanguage, ChangeLanguageSuccess, RegisterModule, translationActions } from './translation.actions';
import { TranslationService } from './translation.service';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Injectable()
export class TranslationEffects {
  @Effect()
  changeLanguage$ = this.actions$
    .ofType(translationActions.CHANGE_LANGUAGE)
    .switchMap((action: ChangeLanguage) => this.translationService.changeLanguage(action.language))
    .distinctUntilChanged()
    .map(language => new ChangeLanguageSuccess(language));

  @Effect({dispatch: false})
  registerModule$ = this.actions$
    .ofType(translationActions.REGISTER_MODULE)
    .map((action: RegisterModule) => action.modulePath)
    .do(modulePath => this.translationService.registerFor(modulePath));

  constructor(private actions$: Actions,
    private translationService: TranslationService
  ) {}
}
