import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Store} from '@ngrx/store';
import {ReportsState} from '../reports.reducer';
import {UpdateReportsFilters} from '../reports.actions';

@Component({
  selector: 'tm-reports-action-menu',
  templateUrl: './reports-action-menu.component.html',
  styleUrls: ['./reports-action-menu.component.scss']
})
export class ReportsActionMenuComponent {
  @Input() hideNewReportBtn: boolean;
  @Output() createNewReport = new EventEmitter<boolean>();
  @Output() clearFilter = new EventEmitter<boolean>();

  constructor(  private store: Store<ReportsState>) {}

  openNewReport() {
    this.createNewReport.emit();
    this.hideNewReportBtn = true;
  }
  onClearFilters() {
    this.clearFilter.emit(true);
  }
}
