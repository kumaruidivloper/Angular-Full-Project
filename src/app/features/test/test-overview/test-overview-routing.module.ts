import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestOverviewComponent } from './test-overview.component';
import { TestDetailsComponent } from '../test-details/test-details.component';
import {PreventUnsavedChangesGuard} from '../../../core/guards/prevent-unsaved-changes-guard';

const routes: Routes = [
  { path: '', component: TestOverviewComponent },
  {
    path: 'details/:id',
    component: TestDetailsComponent,
    data: {
      breadcrumb: 'Test Details'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'create',
    component: TestDetailsComponent,
    data: {
      breadcrumb: 'Create Test'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestOverviewRoutingModule { }
