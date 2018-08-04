import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuComponent } from './main-menu.component';
import { RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { mainMenuReducer } from './main-menu.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation/translation.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { TranslationState } from '../../services/translation/translation.reducer';
import { RegisterModule } from '../../services/translation/translation.actions';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    StoreModule.forFeature('MainMenu', mainMenuReducer)
  ],
  declarations: [MainMenuComponent],
  providers: [
    TranslationService,
    LocalStorageService
  ],
  exports: [MainMenuComponent]
})
export class MainMenuModule {
  constructor(private store: Store<TranslationState>) {
    store.dispatch(new RegisterModule('core/components/main-menu'));
  }
}
