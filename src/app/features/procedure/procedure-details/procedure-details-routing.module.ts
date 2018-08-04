import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { ProcedureDetailsComponent } from './procedure-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProcedureDetailsComponent,
    data: {
      breadcrumb: 'Procedure Details',
      isCreate: false
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureDetailsRoutingModule { }
