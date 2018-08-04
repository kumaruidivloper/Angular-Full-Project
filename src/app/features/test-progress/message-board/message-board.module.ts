import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { TableModule } from '../../../core/components/table/table.module';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import {MessageBoardComponent} from './message-board.component';
import {MessageBoardService} from './message-board.service';
import {FormsModule} from '@angular/forms';
import {TranslationState} from '../../../core/services/translation/translation.reducer';
import {RegisterModule} from '../../../core/services/translation/translation.actions';
import {TranslationService} from '../../../core/services/translation/translation.service';
import {LocalStorageService} from '../../../core/services/local-storage/local-storage.service';
import {TranslateModule} from '@ngx-translate/core';
import {MessageBoardEffects} from './message-board.effects';
import {messageBoardFeatureName, messageBoardReducer} from './message-board.reducer';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {MyDateRangePickerModule} from 'mydaterangepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserGroupModule} from '../../../core/components/test-team/user-group/user-group.module';
import {UserSiteModule} from '../../../core/components/test-team/user-site/user-site.module';
@NgModule({
  imports: [
    CommonModule,
    TableModule,
    BreadcrumbsModule,
    MainMenuModule,
    FormsModule,
    TranslateModule,
    StoreModule.forFeature(messageBoardFeatureName, messageBoardReducer),
    EffectsModule.forFeature([MessageBoardEffects]),
    NgxMyDatePickerModule.forRoot(),
    MyDateRangePickerModule,
    NgbModule.forRoot(),
    UserSiteModule,
    UserGroupModule
  ],
  declarations: [MessageBoardComponent],
  providers: [
    PreventUnsavedChangesGuard,
    MessageBoardService,
    TranslationService,
    LocalStorageService]
})
export class MessageBoardModule {
  constructor(private store: Store<TranslationState>) {
    store.dispatch(new RegisterModule('features/test-progress/message-board'));
  }
}
