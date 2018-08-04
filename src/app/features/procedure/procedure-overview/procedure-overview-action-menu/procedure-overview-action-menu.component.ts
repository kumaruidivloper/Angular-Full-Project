import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClearProcedureTableFilters, LoadAllProcedure, LoadTypeOfProcedure } from '../procedure-overview.actions';

import { ProcedureOverviewState } from '../procedure-overview.reducer';
import { Filter } from '../../../../core/interfaces/filter.model';

@Component({
  selector: 'tm-procedure-overview-action-menu',
  templateUrl: './procedure-overview-action-menu.component.html',
  styleUrls: ['./procedure-overview-action-menu.component.scss']
})
export class ProcedureOverviewActionMenuComponent {
  filters: Observable<Filter[]>;
  @Input() disableUpdateOverview: Boolean;
  @Input() disableCreateProcedure: Boolean;
  @Output() clearFilterDropDown: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store<ProcedureOverviewState>) {}

  clearFilters(): void {
    this.store.dispatch(new ClearProcedureTableFilters());
    this.clearFilterDropDown.emit(true);
  }

  // @todo rename, it's confusing what this function actually does.
  // Something like "onIncludeCustomProceduresChange".
  // Don't be afraid to use long names, reading a long name is faster than reading the whole function
  // to work out what it's for :)
  customizedTest(event) {
    // @todo why not name this customProceduresIncluded, then we have:
    // if (customProceduresIncluded), it reads like a book
    const checkBoxSelected: boolean = event.target.checked;
    if (checkBoxSelected) {
      this.store.dispatch(new LoadAllProcedure());
    } else {
      // @todo the action name LoadTypeOfProcedure is confusing, what type? do i pass the type in? no?
      // maybe LoadNonCustomProcedures?
      this.store.dispatch(new LoadTypeOfProcedure());
    }
  }
}
