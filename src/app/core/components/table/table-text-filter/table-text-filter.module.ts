import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTextFilterComponent } from './table-text-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [TableTextFilterComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports: components
})
export class TableTextFilterModule { }
