import { Component, ContentChildren, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumnComponent } from './table-column/table-column.component';
import { PaginationParameters } from '../../interfaces/pagination-params.i';
import { Router } from '@angular/router';
import { SortDirection, SortOptions } from '../../interfaces/sort.i';
import { Filter } from '../../interfaces/filter.model';

@Component({
  selector: 'tm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent<T> implements OnInit {
  @ContentChildren(TableColumnComponent) columns: TableColumnComponent[];

  @Input() data: T[];
  @Input() paginationParameters: PaginationParameters = null;
  @Input() sort: SortOptions = null;
  @Input() filters: {[key: string]: string};
  @Input() selectable: boolean = true;
  @Input() itemsPerPage: number[];
  @Input() disableSelectedRow: Boolean;
  @Input() headerHiddenForActivitiesList: Boolean;

  @Output() sortChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() paginationChange: EventEmitter<PaginationParameters> = new EventEmitter<PaginationParameters>();
  @Output() filterChange: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() rowSelect: EventEmitter<T> = new EventEmitter<T>();
  @Output() rowAction: EventEmitter<T> = new EventEmitter<T>();
  @Output() resetSelection: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() disableUpdateButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  public SortDirection = SortDirection;
  public pageSize = [10, 20, 30];

  private selectedRow: number;

  constructor(public router: Router) {}

  ngOnInit() {}

  sortData(event, field: string) {
    event.preventDefault();
    this.sortChange.emit(field);
  }

  onFilterChange(filter) {
    this.disableUpdateButton.emit(true);
    this.selectedRow = null;
    this.filterChange.emit(filter);
  }

  goToPage(pageNumber: number) {
    this.paginate({
      page: pageNumber,
      pageSize: this.paginationParameters.pageSize,
      numberOfPages: this.paginationParameters.numberOfPages
    });
  }

  selectItemsPerPage(numberOfItem: number) {
    this.paginate({
      page: 1,
      pageSize: numberOfItem
    });
  }

  onRowClick(row: T, index) {
    this.resetSelection.emit(false);
    if (this.selectable) {
      this.selectedRow = index;
      this.rowSelect.emit(row);
    }
  }

  onRowAction (row: T) {
    this.rowAction.emit(row);
  }

  private paginate(paginationParameters: PaginationParameters) {
    this.clearSelection();
    this.paginationChange.emit(paginationParameters);
  }

  private clearSelection() {
    this.rowSelect.emit(null);
    this.selectedRow = null;
  }
}
