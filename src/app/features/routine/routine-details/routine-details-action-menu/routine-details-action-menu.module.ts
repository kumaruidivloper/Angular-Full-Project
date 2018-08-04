import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineDetailsActionMenuComponent } from './routine-details-action-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RoutineDetailsActionMenuComponent],
  exports: [RoutineDetailsActionMenuComponent]
})

export class RoutineDetailsActionMenuModule {}
