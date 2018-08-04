import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestOverviewActionMenuComponent } from './test-overview-action-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [TestOverviewActionMenuComponent],
  exports: [TestOverviewActionMenuComponent]
})
export class TestOverviewActionMenuModule { }
