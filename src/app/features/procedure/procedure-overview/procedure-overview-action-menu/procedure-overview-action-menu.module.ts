import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureOverviewActionMenuComponent } from './procedure-overview-action-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ProcedureOverviewActionMenuComponent],
  exports: [ProcedureOverviewActionMenuComponent]

})
export class ProcedureOverviewActionMenuModule { }
