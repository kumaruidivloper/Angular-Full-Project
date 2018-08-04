import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableColumnModule } from './table-column/table-column.module';
import { TableCellTemplateModule } from './table-cell-template/table-cell-template.module';
import { TableFilterTemplateModule } from './table-filter-template/table-filter-template.module';
import { TableTextFilterModule } from './table-text-filter/table-text-filter.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultFillPipe } from '../../pipes/defaultFill/default-fill.pipe';
@NgModule({
  imports: [
    CommonModule,
    TableColumnModule,
    TableCellTemplateModule,
    TableFilterTemplateModule,
    TableTextFilterModule,
    NgbPaginationModule
  ],
  declarations: [
    TableComponent, DefaultFillPipe
  ],
  exports: [
    TableComponent,
    TableColumnModule,
    TableCellTemplateModule,
    TableFilterTemplateModule
  ]
})
export class TableModule { }
