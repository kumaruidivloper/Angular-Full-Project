import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterTemplateDirective } from './table-filter-template.directive';

const components = [TableFilterTemplateDirective];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: components,
  exports: components
})
export class TableFilterTemplateModule { }
