import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestProgressOverviewComponent } from './test-progress-overview.component';
import { MessageBoardComponent } from '../message-board/message-board.component';
import { TestProgressDetailsComponent } from '../test-progress-details/test-progress-details.component';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { ReportsComponent } from '../reports/reports.component';

const routes: Routes = [
  { path: '', component: TestProgressOverviewComponent },
  {
    path: 'details',
    component: TestProgressDetailsComponent,
    data: {
      breadcrumb: 'Test Progress Details'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  {
    path: 'reports/:testId',
    component: ReportsComponent,
    data: {
      breadcrumb: 'Reports'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  },
  // {
  //   path: 'create',
  //   component: TestDetailsComponent,
  //   data: {
  //     breadcrumb: 'Create Test'
  //   },
  //   canDeactivate: [PreventUnsavedChangesGuard]
  // }
  {
    path: 'message-board/:testId',
    component: MessageBoardComponent,
    data: {
      breadcrumb: 'Message Board'
    },
    canDeactivate: [PreventUnsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestProgressOverviewRoutingModule { }
