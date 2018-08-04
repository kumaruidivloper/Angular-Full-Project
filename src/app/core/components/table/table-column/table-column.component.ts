import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { TableCellTemplateDirective } from '../table-cell-template/table-cell-template.directive';
import { TableFilterTemplateDirective } from '../table-filter-template/table-filter-template.directive';

@Component({
  selector: 'tm-table-column',
  template: '',
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent {
  @Input() name: string;
  @Input() field?: string;
  @Input() searchable: boolean;
  @ContentChild(TableCellTemplateDirective, {read: TemplateRef}) cellTemplate;
  @ContentChild(TableFilterTemplateDirective, {read: TemplateRef}) filterTemplate;
}
