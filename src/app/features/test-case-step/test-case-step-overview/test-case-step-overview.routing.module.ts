import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { TestCaseDetailComponent } from '../test-case-detail/test-case-detail.component';
import { TestCaseStepOverviewComponent } from './test-case-step-overview.component';
import { TestStepDetailComponent } from '../test-step-detail/test-step-detail.component';

const routes: Routes = [
  {    path: '',    component: TestCaseStepOverviewComponent  },
  {
    path: 'testCaseDetails/:id',
    component: TestCaseDetailComponent,
    data: {
      breadcrumb: 'Test Case Details'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'createTestCase',
    component: TestCaseDetailComponent,
    data: {
      breadcrumb: 'Create Test Case'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'testStepDetails/:id',
    component: TestStepDetailComponent,
    data: {
      breadcrumb: 'Test Step Details'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'createTestStep',
    component: TestStepDetailComponent,
    data: {
      breadcrumb: 'Create Test Step'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TestCaseStepOverviewRoutingModule {}
