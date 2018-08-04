import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureTreeComponent } from './procedure-tree.component';
import { TreeviewModule } from 'ngx-treeview';
import { CreateProcedureTreeViewPipe } from './create-procedure-treeview.pipe';
import { EntityTypeBadgeModule } from '../../../../shared/entity-type-badge/entity-type-badge.module';

@NgModule({
  imports: [
    CommonModule,
    TreeviewModule.forRoot(),
    EntityTypeBadgeModule
  ],
  declarations: [ProcedureTreeComponent, CreateProcedureTreeViewPipe],
  exports: [ProcedureTreeComponent]
})
export class ProcedureTreeModule { }
