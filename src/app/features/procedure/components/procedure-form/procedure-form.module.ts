import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureFormComponent } from './procedure-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgrxFormConnectModule } from '../../../../core/util/ngrx-form-connect/ngrx-form-connect.module';
import { OptionsFromEnumModule } from '../../../../core/pipes/options-from-enum/options-from-enum.module';
import { BooleanToYesNoModule } from '../../../../core/pipes/boolean-to-yes-no/boolean-to-yes-no.pipe.module';
import { ProcedureTreeModule } from '../procedure-tree/procedure-tree.module';
import { ProcedureListModule } from '../procedure-list/procedure-list.module';
import { AddSequenceButtonModule } from '../../../../shared/add-sequence-button/add-sequence-button.module';
import { RoutineListModule } from '../../../sequence/sequence-details/add-sequence-preconditions/routines/routine-list.module';
import { TestCaseStepListModule } from '../../../sequence/sequence-details/add-sequence-preconditions/test-case-step/test-case-step.module';
import { AddRoutineButtonModule } from '../../../../shared/add-routine-button/add-routine-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgrxFormConnectModule,
    ReactiveFormsModule,
    OptionsFromEnumModule,
    BooleanToYesNoModule,
    ProcedureTreeModule,
    ProcedureListModule,
    AddSequenceButtonModule,
    AddRoutineButtonModule,
    RoutineListModule,
    TestCaseStepListModule
  ],
  declarations: [ProcedureFormComponent],
  exports: [ProcedureFormComponent]
})
export class ProcedureFormModule {}
