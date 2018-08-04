import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutineOverviewComponent } from './routine-overview.component';
import { RoutineDetailsComponent } from '../routine-details/routine-details.component';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';

const routes: Routes = [
  {
    path: '',
    component: RoutineOverviewComponent
  },
  {
    path: 'details/:id',
    component: RoutineDetailsComponent,
    data: {
      breadcrumb: 'Routine Details'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'create',
    component: RoutineDetailsComponent,
    data: {
      breadcrumb: 'Create Routine'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RoutineOverviewRoutingModule {}
