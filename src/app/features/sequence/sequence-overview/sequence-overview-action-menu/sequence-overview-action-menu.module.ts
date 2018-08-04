import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SequenceOverviewActionMenuComponent} from './sequence-overview-action-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SequenceOverviewActionMenuComponent],
  exports: [SequenceOverviewActionMenuComponent]
})

export class SequenceOverviewActionMenuModule {}


