import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AddRoutineButtonFilters, PrivateSelectorOptions, RoutineCategoryOptions } from './add-routine-button.model';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import {
  filtersSelector,
  paginationSelector
} from '../../features/sequence/sequence-overview/sequence-overview.reducer';
import { Filter } from '../../core/interfaces/filter.model';
import { Routine } from '../../features/routine/routine-overview/routine-overview.model';
import {
  ClearFilters,
  LoadRoutines,
  SelectRoutine,
  UpdateRoutineFilters
} from '../../features/routine/routine-overview/routine-overview.action';
import {
  RoutineOverviewState,
  routineSelector,
  selectedRoutineSelector
} from '../../features/routine/routine-overview/routine-overview.reducer';

@Component({
  selector: 'tm-add-routine-button',
  templateUrl: './add-routine-button.component.html',
  styleUrls: ['./add-routine-button.component.scss']
})
export class AddRoutineButtonComponent implements OnInit {
  @Output() addRoutine: EventEmitter<Routine> = new EventEmitter<Routine>();

  public selectedRoutine$: Observable<Routine>;
  public routines$: Observable<Routine[]>;
  public filters$: Observable<AddRoutineButtonFilters>;
  public paginationParameters$: Observable<PaginationParameters>;
  public itemsPerPage: number[] = [10, 20, 50];
  public categoryOptions = RoutineCategoryOptions;
  public privateSelectorOptions = PrivateSelectorOptions;
  private modalWindow: NgbModalRef;

  constructor(private modal: NgbModal, private store: Store<RoutineOverviewState>) { }

  ngOnInit() {
    this.routines$ = this.store.select(routineSelector);
    this.selectedRoutine$ = this.store.select(selectedRoutineSelector);
    this.paginationParameters$ = this.store.select(paginationSelector);
    this.filters$ = this.store.select(filtersSelector);
  }

  open(template: TemplateRef<any>) {
    this.modalWindow = this.modal.open(template, {
      size: 'lg'
    });

    this.modalWindow.result
      .then((routine: Routine) => {
        this.addRoutine.emit(routine);
      });

    this.store.dispatch(new ClearFilters());
    this.store.dispatch(new LoadRoutines());
  }

  onFilterChange (filter: Filter) {
    this.store.dispatch(new UpdateRoutineFilters(filter));
  }

  onPaginationChange (paginationParameters: PaginationParameters) {

  }

  onFilterSelect (value: string, filter: string) {

  }

  onRowSelect(routine: Routine) {
    this.store.dispatch(new SelectRoutine(routine));
  }

  addSelectedRoutine() {
    this.selectedRoutine$
      .take(1)
      .subscribe((routine: Routine) => {
        this.modalWindow.close(routine);
      });
  }

  dismiss(): void {
    this.modalWindow.dismiss();
  }
}
