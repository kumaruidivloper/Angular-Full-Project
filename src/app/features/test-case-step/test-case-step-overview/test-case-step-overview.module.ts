import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { TableModule } from '../../../core/components/table/table.module';
import { TestCaseDetailsModule } from '../test-case-detail/test-case-detail.module';
import { TestStepDetailsModule } from '../test-step-detail/test-step-detail.module';
// import {
//   TestCaseStepOverviewActionMenuComponent
// } from './test-case-step-overview-action-menu/test-case-step-overview-action-menu.component';
import { TestCaseStepOverviewComponent } from './test-case-step-overview.component';
import { TestCaseStepOverviewEffects } from './test-case-step-overview.effects';
import { testCaseStepOverviewFeatureName, testCaseStepOverviewReducer } from './test-case-step-overview.reducer';
import { TestCaseStepOverviewRoutingModule } from './test-case-step-overview.routing.module';
import { TestCaseStepOverviewService } from './test-case-step-overview.service';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { BooleanToYesNoModule } from '../../../core/pipes/boolean-to-yes-no/boolean-to-yes-no.pipe.module';
import { TestCaseStepOverviewActionMenuModule } from './test-case-step-overview-action-menu/test-case-step-overview-action-menu.module';

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbsModule,
    TableModule,
    MainMenuModule,
    StoreModule.forFeature(testCaseStepOverviewFeatureName, testCaseStepOverviewReducer),
    EffectsModule.forFeature([TestCaseStepOverviewEffects]),
    FormsModule,
    UserGroupModule,
    UserSiteModule,
    TestCaseStepOverviewRoutingModule,
    TestCaseDetailsModule,
    TestStepDetailsModule,
    BooleanToYesNoModule,
    TestCaseStepOverviewActionMenuModule
  ],
  declarations: [TestCaseStepOverviewComponent],
  providers: [TestCaseStepOverviewService, PreventUnsavedChangesGuard]
})
export class TestCaseStepOverviewModule { }
