import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';
import { Routine } from './routine-list.model';
import { PaginationParameters } from '../../../../../core/interfaces/pagination-params.i';
import {
  ClearRoutineListFilters,
  DeSelectRoutineList,
  LoadRoutineList,
  PaginateRoutineList,
  SelectRoutineList,
  UpdateRoutineListFilters,
  UpdateSelectedRoutine
} from './routine-list.action';
import {
  filtersRoutineListSelector,
  paginationRoutineListSelector,
  routineListSelector,
  RoutineListState,
  selectedRoutineListSelector
} from './routine-list.reducer';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SequenceDetails } from '../../sequence-details.model';
import { sequenceDetailsSelector } from '../../sequence-details.reducer';
import { UpdateSequenceDetailsForm } from '../../sequence-details.actions';
import { Filter } from '../../../../../core/interfaces/filter.model';


@Component({
  selector: 'tm-routine-lists',
  templateUrl: './routine-list.component.html'
})
export class RoutineListComponent implements OnInit, OnDestroy {
  @Output() routineAdded: EventEmitter<boolean> = new EventEmitter();
  @Input() isDisableRoutine: boolean ;

  private addRoutineListModal: NgbModalRef;
  public routine$: Observable<Routine[]>;
  public selectedRoutine$: Observable<Routine[]>;
  public sequenceDetails$: Observable<SequenceDetails>;
  public paginationParameters$: Observable<PaginationParameters>;
  public filters$: Observable<any>;
  public selectAll = 'ALL';
  public pagination  =  {'numberOfPages': 1, 'page': 1, 'pageSize': 5};
  public categorySelection = [this.selectAll, 'STANDARD', 'DEVELOPMENT'];
  public privateSelector = [{id: this.selectAll, value: this.selectAll},
                            {id : 'YES', value: true},
                            {id: 'NO', value: false}];
  public statusSelector = [this.selectAll, 'ACTIVE', 'INACTIVE'];
  public defaultSelectionCategory = this.selectAll;
  public defaultSelectionPrivate = this.selectAll;
  public itemsPerPage = [5, 10, 15];
  private filterData = {};

  constructor(private store: Store<RoutineListState>, private ngModal: NgbModal) { }

  onPaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateRoutineList(paginationParameters));
    // this.store.dispatch(new UpdateRoutineListFilters(this.selectedTeamData));
  }

  onFilterChange(filter: Filter): void {
    const updatedFilters: {[key: string]: string} = {};
    this.filterData[filter.field] = filter.value;
    this.store.dispatch(new UpdateRoutineListFilters(this.filterData));
  }

  onFilterSelect(value: string, field: string): void {
      // this.testTeamFilterChanged = true;
      // this.disabledUpdate = true;
        this.filterData[field] = value !== this.selectAll ? value : '';
        this.store.dispatch(new UpdateRoutineListFilters( this.filterData));
  }

  onClearFilterDropDown(event: string): void {
    if (event) {
      this.defaultSelectionCategory = this.defaultSelectionPrivate  = this.selectAll;
      this.filterData = {};
      this.store.dispatch(new UpdateRoutineListFilters( this.filterData));
    }
  }

  onRoutineChange(routine, event) {
    if (event.target.checked) {
      this.store.dispatch(new SelectRoutineList(routine));
    } else {
      this.store.dispatch(new DeSelectRoutineList(routine.id));
    }
  }

  addRoutineToSequence() {
    this.selectedRoutine$
      .first()
      .withLatestFrom(this.sequenceDetails$)
      .subscribe(([selectedRoutine, sequenceDetails]) => {
      const getSequenceLineLength = sequenceDetails.sequenceLines ? sequenceDetails.sequenceLines.length : 0;
        const routineArray = [];
          for ( const item of selectedRoutine){
            const routine =  {
                id: 0,
                lineNo: getSequenceLineLength > 0 ? getSequenceLineLength + 1 : 0,
                versionNoOfType: 0,
                sequenceLineType: 'ROUTINE',
                routine: {
                  id: item.id,
                  name: item.objectCurrentRoutineVersion.name
                }
              };
            routineArray.push(routine);
          }
          const updateFormValue = {
          ...sequenceDetails,
            sequenceLines : [
              ...( sequenceDetails.sequenceLines || []),
              ...routineArray
            ]
          };
          this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
          this.routineAdded.emit(true);
        });
  }

  ngOnInit(): void {
    this.routine$ = this.store.select(routineListSelector);
    this.paginationParameters$ = this.store.select(paginationRoutineListSelector);
    this.filters$ = this.store.select(filtersRoutineListSelector);
    this.selectedRoutine$ =  this.store.select(selectedRoutineListSelector);
    this.sequenceDetails$ = this.store.select(sequenceDetailsSelector);
    this.store.dispatch( new LoadRoutineList());
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearRoutineListFilters());
  }

  open(template) {
    this.addRoutineListModal = this.ngModal.open(template, {
      size: 'lg',
    });
    this.store.dispatch( new UpdateSelectedRoutine([]));
  }

}
