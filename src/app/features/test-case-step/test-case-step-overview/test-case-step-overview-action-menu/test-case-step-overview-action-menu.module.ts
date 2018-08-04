import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TestCaseStepOverviewActionMenuComponent} from './test-case-step-overview-action-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [TestCaseStepOverviewActionMenuComponent],
  exports: [TestCaseStepOverviewActionMenuComponent]
})
export class TestCaseStepOverviewActionMenuModule { }
