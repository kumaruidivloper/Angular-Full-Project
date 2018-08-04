import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineOverviewActionMenuComponent } from './routine-overview-action-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RoutineOverviewActionMenuComponent],
  exports: [RoutineOverviewActionMenuComponent]
})

export class RoutineOverviewActionMenuModule {}


