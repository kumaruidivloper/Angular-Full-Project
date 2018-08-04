import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SequenceOverviewComponent} from './sequence-overview.component';
import {SequenceDetailsComponent} from '../sequence-details/sequence-details.component';
import {PreventUnsavedChangesGuard} from '../../../core/guards/prevent-unsaved-changes-guard';

const routes: Routes = [
  {
    path: '',
    component: SequenceOverviewComponent
  },
  {
    path: 'details/:id',
    component: SequenceDetailsComponent,
    data: {
      breadcrumb: 'Sequence Details'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'create',
    component: SequenceDetailsComponent,
    data: {
      breadcrumb: 'Create Sequence'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SequenceOverviewRoutingModule {}
