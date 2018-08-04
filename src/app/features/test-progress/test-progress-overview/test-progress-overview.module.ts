import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { LoginModule } from '../../login/login.module';
import { TableModule } from '../../../core/components/table/table.module';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { OptionsFromEnumModule } from '../../../core/pipes/options-from-enum/options-from-enum.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { TestProgressOverviewRoutingModule } from './test-progress-overview-routing.module';
import { TestProgressOverviewActionMenuModule } from './test-progress-overview-action-menu/test-progress-overview-action-menu.module';
import { TestProgressOverviewComponent } from './test-progress-overview.component';
import { MessageBoardModule } from '../message-board/message-board.module';
import { TestProgressDetailsModule } from '../test-progress-details/test-progress-details.module';
import { ReportsModule } from '../reports/reports.module';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import { TestProgressOverviewService } from './test-progress-overview.service';
import { testProgressOverviewFeatureName, testProgressOverviewReducer } from './test-progress-overview.reducer';
import { TestProgressOverviewEffects } from './test-progress-overview.effects';
import {MyDateRangePickerModule} from 'mydaterangepicker';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    TestProgressOverviewRoutingModule,
    BreadcrumbsModule,
    TestProgressOverviewActionMenuModule,
    LoginModule,
    MainMenuModule,
    StoreModule.forFeature(testProgressOverviewFeatureName, testProgressOverviewReducer),
    EffectsModule.forFeature([TestProgressOverviewEffects]),
    ReactiveFormsModule,
    OptionsFromEnumModule,
    UserSiteModule,
    UserGroupModule,
    FormsModule,
    MessageBoardModule,
    TestProgressDetailsModule,
    ReportsModule
  ],
  declarations: [TestProgressOverviewComponent],
  providers: [PreventUnsavedChangesGuard, TestProgressOverviewService, FileUploadService]
})
export class TestProgressOverviewModule { }
