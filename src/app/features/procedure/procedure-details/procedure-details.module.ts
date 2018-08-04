import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from '../../../core/components/table/table.module';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { ProcedureDetailsComponent } from './procedure-details.component';
import { OptionsFromEnumModule } from '../../../core/pipes/options-from-enum/options-from-enum.module';
import { ProcedureDetailsActionMenuModule } from './procedure-details-action-menu/procedure-details-action-menu.module';
import { LoadingModule } from 'ngx-loading';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { StoreModule } from '@ngrx/store';
import { procedureDetailsFeatureName, procedureDetailsReducer } from './procedure-details.reducer';
import { ProcedureDetailsRoutingModule } from './procedure-details-routing.module';
import { ProcedureFormModule } from '../components/procedure-form/procedure-form.module';
import { EffectsModule } from '@ngrx/effects';
import { ProcedureDetailsEffects } from './procedure-details.effects';
import { ProceduresService } from '../procedures.service';
import { SequenceDetailsService } from '../../sequence/sequence-details/sequence-details.service';
import { RoutineDetailsService } from '../../routine/routine-details/routine-details.service';


@NgModule({
  imports: [
    CommonModule,
    BreadcrumbsModule,
    TableModule,
    MainMenuModule,
    NgbModule.forRoot(),
    ProcedureDetailsActionMenuModule,
    OptionsFromEnumModule,
    UserGroupModule,
    UserSiteModule,
    LoadingModule,
    StoreModule.forFeature(procedureDetailsFeatureName, procedureDetailsReducer),
    EffectsModule.forFeature([ProcedureDetailsEffects]),
    ProcedureDetailsRoutingModule,
    ProcedureFormModule
  ],
  declarations: [ProcedureDetailsComponent],
  providers: [
    PreventUnsavedChangesGuard,
    ProceduresService,
    SequenceDetailsService,
    RoutineDetailsService
  ]
})
export class ProcedureDetailsModule {

}


