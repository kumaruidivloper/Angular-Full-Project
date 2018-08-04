import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { LoginModule } from '../../login/login.module';
import { TableModule } from '../../../core/components/table/table.module';
import { TestDetailsModule } from '../test-details/test-details.module';
import { TestOverviewActionMenuModule } from './test-overview-action-menu/test-overview-action-menu.module';
import { TestOverviewRoutingModule } from './test-overview-routing.module';
import { TestOverviewComponent } from './test-overview.component';
import { TestOverviewEffects } from './test-overview.effects';
import { testOverviewFeatureName, testOverviewReducer } from './test-overview.reducer';
import { TestOverviewService } from './test-overview.service';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { OptionsFromEnumModule } from '../../../core/pipes/options-from-enum/options-from-enum.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
@NgModule({
  imports: [
    CommonModule,
    TableModule,
    TestOverviewRoutingModule,
    BreadcrumbsModule,
    TestOverviewActionMenuModule,
    LoginModule,
    TestDetailsModule,
    MainMenuModule,
    StoreModule.forFeature(testOverviewFeatureName, testOverviewReducer),
    EffectsModule.forFeature([TestOverviewEffects]),
    ReactiveFormsModule,
    OptionsFromEnumModule,
    UserSiteModule,
    UserGroupModule
  ],
  declarations: [TestOverviewComponent],
  providers: [TestOverviewService, PreventUnsavedChangesGuard]
})
export class TestOverviewModule { }
