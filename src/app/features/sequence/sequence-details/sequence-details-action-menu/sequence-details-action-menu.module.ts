import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SequenceDetailsActionMenuComponent} from './sequence-details-action-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SequenceDetailsActionMenuComponent],
  exports: [SequenceDetailsActionMenuComponent]
})
export class SequenceDetailsActionMenuComponentModule { }
