import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sequence } from '../../features/sequence/sequence-overview/sequence-overview.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  AddSequenceButtonFilters,
  PrivateSelectorOptions,
  SequenceCategoryOptions,
  TrackDirectionOptions
} from './add-sequence-button.model';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import {
  filtersSelector,
  paginationSelector,
  selectedSequenceSelector,
  SequenceOverviewState,
  sequenceSelector
} from '../../features/sequence/sequence-overview/sequence-overview.reducer';
import {
  ClearSequenceFilters,
  LoadSequences, SelectSequence, UpdateSequenceFilters
} from '../../features/sequence/sequence-overview/sequence-overview.action';
import { Filter } from '../../core/interfaces/filter.model';

@Component({
  selector: 'tm-add-sequence-button',
  templateUrl: './add-sequence-button.component.html',
  styleUrls: ['./add-sequence-button.component.scss']
})
export class AddSequenceButtonComponent implements OnInit {
  @Output() addSequence: EventEmitter<Sequence> = new EventEmitter<Sequence>();

  public selectedSequence$: Observable<Sequence>;
  public sequences$: Observable<Sequence[]>;
  public filters$: Observable<AddSequenceButtonFilters>;
  public paginationParameters$: Observable<PaginationParameters>;
  public itemsPerPage: number[] = [10, 20, 50];
  public categoryOptions = SequenceCategoryOptions;
  public trackDirectionOptions = TrackDirectionOptions;
  public privateSelectorOptions = PrivateSelectorOptions;
  private modalWindow: NgbModalRef;

  constructor(private modal: NgbModal, private store: Store<SequenceOverviewState>) { }

  ngOnInit() {
    this.sequences$ = this.store.select(sequenceSelector);
    this.selectedSequence$ = this.store.select(selectedSequenceSelector);
    this.paginationParameters$ = this.store.select(paginationSelector);
    this.filters$ = this.store.select(filtersSelector);
  }

  open(template: TemplateRef<any>) {
    this.modalWindow = this.modal.open(template, {
      size: 'lg'
    });

    this.modalWindow.result
      .then((sequence: Sequence) => {
        this.addSequence.emit(sequence);
      });

    this.store.dispatch(new ClearSequenceFilters());
    this.store.dispatch(new LoadSequences());
  }

  onFilterChange (filter: Filter) {
    this.store.dispatch(new UpdateSequenceFilters(filter));
  }

  onPaginationChange (paginationParameters: PaginationParameters) {

  }

  onFilterSelect (value: string, filter: string) {

  }

  onSequenceSelectChange(sequence: Sequence, value) {}

  onRowSelect(sequence: Sequence) {
    this.store.dispatch(new SelectSequence(sequence));
  }

  addSelectedSequence() {
    this.selectedSequence$
      .take(1)
      .subscribe((sequence: Sequence) => {
        this.modalWindow.close(sequence);
      });
  }

  dismiss(): void {
    this.modalWindow.dismiss();
  }
}
