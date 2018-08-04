import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestProgressOverviewActionMenuComponent } from './test-progress-overview-action-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [TestProgressOverviewActionMenuComponent],
  exports: [TestProgressOverviewActionMenuComponent]
})
export class TestProgressOverviewActionMenuModule { }
