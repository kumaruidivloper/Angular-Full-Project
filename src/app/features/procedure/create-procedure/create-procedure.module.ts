import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProcedureRoutingModule } from './create-procedure-routing.module';
import { CreateProcedureComponent } from './create-procedure.component';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { ProcedureDetailsActionMenuModule } from '../procedure-details/procedure-details-action-menu/procedure-details-action-menu.module';
import {ProcedureFormModule} from '../components/procedure-form/procedure-form.module';
import {procedureDetailsFeatureName, procedureDetailsReducer} from '../procedure-details/procedure-details.reducer';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ProcedureDetailsEffects} from '../procedure-details/procedure-details.effects';

@NgModule({
  imports: [
    CommonModule,
    CreateProcedureRoutingModule,
    MainMenuModule,
    BreadcrumbsModule,
    ProcedureDetailsActionMenuModule,
    ProcedureFormModule,
    StoreModule.forFeature(procedureDetailsFeatureName, procedureDetailsReducer),
    EffectsModule.forFeature([ProcedureDetailsEffects]),
  ],
  declarations: [
    CreateProcedureComponent
  ],
  providers: [
    PreventUnsavedChangesGuard
  ]
})
export class CreateProcedureModule { }
