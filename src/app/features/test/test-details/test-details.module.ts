import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestDetailsComponent } from './test-details.component';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from '../../../core/components/table/table.module';
import { TestDetailsService } from './test-details.service';
import { StoreModule } from '@ngrx/store';
import { testDetailsFeatureName, testDetailsReducer } from './test-details.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestDetailsEffects } from './test-details.effects';
import { TestDetailsActionMenuComponent } from './test-details-action-menu/test-details-action-menu.component';
import { TestDetailsProceduresModule } from './test-details-procedures/test-details-procedures.module';
import { OptionsFromEnumModule } from '../../../core/pipes/options-from-enum/options-from-enum.module';
import { PreventUnsavedChangesGuard} from '../../../core/guards/prevent-unsaved-changes-guard';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DateHandlerService} from '../../../core/services/date/date-handler.service';
import {UserGroupModule} from '../../../core/components/test-team/user-group/user-group.module';
import {UserSiteModule} from '../../../core/components/test-team/user-site/user-site.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainMenuModule,
    NgbModule.forRoot(),
    BreadcrumbsModule,
    TableModule,
    StoreModule.forFeature(testDetailsFeatureName, testDetailsReducer),
    EffectsModule.forFeature([TestDetailsEffects]),
    TestDetailsProceduresModule,
    OptionsFromEnumModule,
    NgxMyDatePickerModule.forRoot(),
    UserSiteModule,
    UserGroupModule
  ],
  declarations: [TestDetailsComponent, TestDetailsActionMenuComponent],
  providers: [
    TestDetailsService,
    PreventUnsavedChangesGuard,
    DateHandlerService
  ]
})
export class TestDetailsModule { }
