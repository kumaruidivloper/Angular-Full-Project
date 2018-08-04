import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { CreateProcedureComponent } from './create-procedure.component';

const routes: Routes = [
  {
    path: '',
    component: CreateProcedureComponent,
    data: {
      breadcrumb: 'Create Procedure'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProcedureRoutingModule { }
