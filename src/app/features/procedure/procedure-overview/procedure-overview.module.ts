import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureOverviewRoutingModule } from './procedure-overview-routing.module';
import { ProcedureOverviewComponent } from './procedure-overview.component';
import { ProcedureOverviewService } from './procedure-overview.service';
import { procedureOverviewFeatureName, procedureOverviewReducer } from './procedure-overview.reducer';
import { StoreModule } from '@ngrx/store';
import { ProcedureOverviewEffects } from './procedure-overview.effects';
import { EffectsModule } from '@ngrx/effects';
import { TableModule } from '../../../core/components/table/table.module';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { OptionsFromEnumModule } from '../../../core/pipes/options-from-enum/options-from-enum.module';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { ProcedureOverviewActionMenuModule } from './procedure-overview-action-menu/procedure-overview-action-menu.module';

@NgModule({
  imports: [
    CommonModule,
    ProcedureOverviewRoutingModule,
    TableModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    OptionsFromEnumModule,
    MainMenuModule,
    UserGroupModule,
    UserSiteModule,
    NgbModule,
    StoreModule.forFeature(procedureOverviewFeatureName, procedureOverviewReducer),
    EffectsModule.forFeature([ProcedureOverviewEffects]),
    FormsModule,
    UserGroupModule,
    UserSiteModule,
    OptionsFromEnumModule,
    ReactiveFormsModule,
    ProcedureOverviewActionMenuModule

  ],
  declarations: [
    ProcedureOverviewComponent
  ],
  providers: [
    ProcedureOverviewService,
    PreventUnsavedChangesGuard
  ]
})
export class ProcedureOverviewModule { }
