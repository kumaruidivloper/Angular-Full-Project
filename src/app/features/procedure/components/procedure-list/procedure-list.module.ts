import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureListComponent } from './procedure-list.component';
import { CreateProcedureListPipe } from './create-procedure-list.pipe';
import { EntityTypeBadgeModule } from '../../../../shared/entity-type-badge/entity-type-badge.module';

@NgModule({
  imports: [
    CommonModule,
    EntityTypeBadgeModule
  ],
  declarations: [ProcedureListComponent, CreateProcedureListPipe],
  exports: [ProcedureListComponent]
})
export class ProcedureListModule { }
