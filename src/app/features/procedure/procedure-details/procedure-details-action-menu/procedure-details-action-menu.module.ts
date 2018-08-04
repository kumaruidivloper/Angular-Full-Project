import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcedureDetailsActionMenuComponent } from './procedure-details-action-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ProcedureDetailsActionMenuComponent],
  exports: [ProcedureDetailsActionMenuComponent]
})

export class ProcedureDetailsActionMenuModule {

}
