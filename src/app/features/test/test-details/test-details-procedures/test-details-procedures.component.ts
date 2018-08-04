import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { differenceBy } from 'lodash';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import { PaginationParameters } from '../../../../core/interfaces/pagination-params.i';
import {
  ClearProcedureFilters,
  ProcedurePaginate,
  UpdateDetailsForm,
  UpdateProcedureFilters
} from '../test-details.actions';
import { TestDetails, TestDetailsFilters, TestProcedure } from '../test-details.model';
import { filtersSelector, testDetailsSelector } from '../test-details.reducer';
import {
  DeleteProcedure,
  DeselectProcedure,
  LoadProcedure,
  ReorderProcedures,
  SelectProcedure,
  UpdateSelectedTestProcedures
} from './test-details-procedures.actions';
import {
  selectedTestProceduresSelector,
  TestDetailsProceduresState,
  testProceduresPaginationSelector,
  testProceduresSelector
} from './test-details-procedures.reducer';
import { Filter } from '../../../../core/interfaces/filter.model';

@Component({
  selector: 'tm-test-details-procedures',
  templateUrl: './test-details-procedures.component.html',
  styleUrls: ['./test-details-procedures.component.scss']
})
export class TestDetailsProceduresComponent implements OnInit {
  @Output() enableSave = new EventEmitter<boolean>();

  public testDetails$: Observable<TestDetails>;
  public testProcedures$: Observable<TestProcedure[]>;
  public selectedTestProcedures$: Observable<TestProcedure[]>;
  public paginationParameters$: Observable<PaginationParameters>;
  public filters$: Observable<TestDetailsFilters>;
  private addProceduresModal: NgbModalRef;
  public resetSelection = 'ALL';
  public categorySelection = ['ALL', 'STANDARD', 'DEVELOPMENT'];
  public itemsPerPage = [5, 10, 15, 20];
  constructor(private store: Store<TestDetailsProceduresState>,
              private ngModal: NgbModal) { }

  ngOnInit() {
    this.testDetails$ = this.store.select(testDetailsSelector);
    this.testProcedures$ = this.store.select(testProceduresSelector);
    this.selectedTestProcedures$ = this.store.select(selectedTestProceduresSelector);
    this.paginationParameters$ = this.store.select(testProceduresPaginationSelector);
    this.filters$ = this.store.select(filtersSelector);

    this.store.dispatch(new LoadProcedure());
  }

  onProcedureRowSelect(procedure, event) {
    if (event.target.checked) {
      this.store.dispatch(new SelectProcedure(procedure));
    } else {
      this.store.dispatch(new DeselectProcedure(procedure.id));
    }
  }

  onEnableSave() {
    this.enableSave.emit();
  }

  addProcedures() {
    this.selectedTestProcedures$
      .first()
      .withLatestFrom(this.testDetails$)
      .subscribe(([selectedProcedures, testDetails]) => {
        const testProcedure = testDetails.testProcedure || [];
        const uniqueProcedures = differenceBy(selectedProcedures, testProcedure, 'name');
        this.store.dispatch(new UpdateDetailsForm({
          ...testDetails,
          testProcedure: [
            ...(testDetails.testProcedure || []),
            ...uniqueProcedures
          ]
        }));

        this.addProceduresModal.close();
      });
  }

  open(template) {
    this.addProceduresModal = this.ngModal.open(template, {
      size: 'lg',
    });
    this.store.dispatch(new UpdateSelectedTestProcedures([]));
  }

  onPaginationChange(paginationParameters) {
    this.store.dispatch(new ProcedurePaginate(paginationParameters));
  }


  onFilterChange(filter: Filter) {
    let filteredVal;
    if (filter.field === 'category' && filter.value === 'ALL') {
      filteredVal = {
        field: filter.field,
        value: ''
      };
    } else {
      filteredVal = {
        field: filter.field,
        value: filter.value
      };
    }
    this.store.dispatch(new UpdateProcedureFilters(filteredVal));
  }

  clearProcedureFilters(): void {
    this.store.dispatch(new ClearProcedureFilters());
    this.resetSelection = 'ALL';
  }

  moveProcedureUp(index) {
    this.store.dispatch(new ReorderProcedures(index, index - 1));
  }

  moveProcedureDown(index) {
    this.store.dispatch(new ReorderProcedures(index, index + 1));
  }

  deleteProcedure(index) {
    this.store.dispatch(new DeleteProcedure(index));
  }
}
