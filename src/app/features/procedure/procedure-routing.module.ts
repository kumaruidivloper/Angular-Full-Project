import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './procedure-overview/procedure-overview.module#ProcedureOverviewModule'
  },
  {
    path: 'details',
    loadChildren: './procedure-details/procedure-details.module#ProcedureDetailsModule'
  },
  {
    path: 'create',
    loadChildren: './create-procedure/create-procedure.module#CreateProcedureModule'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule {
}
