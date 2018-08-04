import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCellTemplateDirective } from './table-cell-template.directive';

const components = [TableCellTemplateDirective];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: components,
  exports: components
})
export class TableCellTemplateModule { }
