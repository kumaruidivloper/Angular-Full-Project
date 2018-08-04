import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventUnsavedChangesGuard } from '../../core/guards/prevent-unsaved-changes-guard';
import { ProcedureRoutingModule } from './procedure-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProcedureRoutingModule
  ],
  providers: [PreventUnsavedChangesGuard]
})

export class ProcedureModule { }
