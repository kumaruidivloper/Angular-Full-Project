import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { SequenceListService } from './sequence-list.service';
import { PaginationParameters } from '../../../../../core/interfaces/pagination-params.i';
import {
  DeSelectSequenceList,
  LoadAntiClockwiseSequenceList,
  LoadClockwiseSequenceList,
  LoadSequenceList,
  PaginateAntiClockwiseSequenceList,
  PaginateClockwiseSequenceList,
  PaginateSequenceList,
  SelectSequenceList,
  UpdateSelectedSequence,
  UpdateSequenceListFilters
} from './sequence-list.actions';
import {
  antiClockWiseFilterSelector,
  antiClockWiseSequenceListSelector,
  clockWiseFilterSelector,
  clockWiseSequenceListSelector,
  filtersSequenceListSelector,
  paginationAntiClockwiseSequenceListSelector,
  paginationClockwiseSequenceListSelector,
  paginationSequenceListSelector,
  selectedSequenceListSelector,
  SequenceListingState,
  sequenceListSelector
} from './sequence-list.reducer';

import { Sequence } from '../../../sequence-overview/sequence-overview.model';
import { UpdateSequenceDetailsForm } from '../../sequence-details.actions';
import { SequenceDetails } from '../../sequence-details.model';
import { sequenceDetailsSelector } from '../../sequence-details.reducer';
import { NgForm } from '@angular/forms';
import { Filter } from '../../../../../core/interfaces/filter.model';

@Component({
  selector: 'tm-add-sequence-modal',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.scss']
})
export class SequenceListComponent implements  OnInit {
  @Input() isDisableSequence: boolean ;
  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  @Output() sequenceAdded: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('frm') public userFrm: NgForm;

  private addSequencePreConditionsModal: NgbModalRef;
  public sequence$: Observable<Sequence[]>;
  public clockwiseSequence$: Observable<Sequence[]>;
  public antiClockwiseSequence$: Observable<Sequence[]>;
  public selectedSequence$: Observable<Sequence[]>;
  public paginationParameters$: Observable<PaginationParameters>;
  public clockwisePaginationParameters$: Observable<PaginationParameters>;
  public antiClockwisePaginationParameters$: Observable<PaginationParameters>;
  public filters$: Observable<any>;
  public clockwiseFilters$: Observable<any>;
  public antiClockwiseFilters$: Observable<any>;
  public sequenceDetails$: Observable<SequenceDetails>;
  private selectAll: string = 'ALL';
  public defaultClockwiseCategory: string = this.selectAll;
  public defaultAntiClockwiseCategory: string = this.selectAll;
  public defaultSelectionCategory: string = this.selectAll;
  public defaultClockwisePrivate: string = this.selectAll;
  public defaultAntiClockwisePrivate: string = this.selectAll;
  public defaultSelectionPrivate: string = this.selectAll;
  public defaultSelectionDirection: string = this.selectAll;
  public isSequenceDisable: boolean = false;
  public addSequenceGroup: any;
  public addSequenceFilters$: any;
  public itemsPerPage = [6, 12, 18, 24];
  public selectedData = [];
  public disableMakeGroupBtn: boolean = true;
  public selectedClockwise: boolean = false;
  public selectedAntiClockwise: boolean = false;
  private clockWiseSequenceObj = {};
  private antiClockWiseSequenceObj = {};
  public selectedGroup = [];
  public trackDirection = ['CLOCKWISE', 'ANTICLOCKWISE'];
  public categorySelection = [this.selectAll, 'STANDARD', 'DEVELOPMENT'];
  public isPrivateSelector = [{id: this.selectAll, value: this.selectAll}, { id: 'YES', value: 'true'}, {id: 'NO', value: 'false'}];
  private  updatedFilters: {[key: string]: string} = {};
  private filterObj = {};
  constructor(private ngModal: NgbModal,
              private sequenceListService: SequenceListService,
              private store: Store<SequenceListingState>) { }

  ngOnInit() {
    this.sequence$ = this.store.select(sequenceListSelector);
    this.paginationParameters$ = this.store.select(paginationSequenceListSelector);
    this.clockwisePaginationParameters$ = this.store.select(paginationClockwiseSequenceListSelector);
    this.antiClockwisePaginationParameters$ = this.store.select(paginationAntiClockwiseSequenceListSelector);
    this.filters$ = this.store.select(filtersSequenceListSelector);
    this.antiClockwiseFilters$ = this.store.select(antiClockWiseFilterSelector);
    this.clockwiseFilters$ = this.store.select(clockWiseFilterSelector);
    this.store.dispatch(new LoadSequenceList());
    this.store.dispatch(new LoadClockwiseSequenceList());
    this.store.dispatch(new LoadAntiClockwiseSequenceList());
    this.addSequenceFilters$ = {};
    this.selectedSequence$ = this.store.select(selectedSequenceListSelector);
    this.sequenceDetails$ = this.store.select(sequenceDetailsSelector);
    this.clockwiseSequence$ = this.store.select(clockWiseSequenceListSelector);
    this.antiClockwiseSequence$ = this.store.select(antiClockWiseSequenceListSelector);
  }

  onDelete(index) {
    this.selectedData.splice(index, 1);
    this.data.emit(this.selectedData);
  }

  onPaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateSequenceList(paginationParameters));
  }

  onClockWisePaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateClockwiseSequenceList(paginationParameters));
  }

  onAntiClockWisePaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateAntiClockwiseSequenceList(paginationParameters));
  }

  onFilterChange(filter: Filter, fromPage: string ): void {
    this.updatedFilters[filter.field] = filter.value;
    this.store.dispatch(new UpdateSequenceListFilters(this.updatedFilters, fromPage));
  }

  onFilterSelect(value: string, filterType: string, fromPage: string): void {
    this.filterObj[filterType] = (value === 'ALL') ? '' : value;
    this.store.dispatch(new UpdateSequenceListFilters(this.filterObj, fromPage));
  }

  onSequenceSelectChange(sequence, event) {
    if (event.target.checked) {
      this.store.dispatch(new SelectSequenceList(sequence));
    } else {
      this.store.dispatch(new DeSelectSequenceList(sequence.id));
    }
  }

  open(template) {
    this.addSequencePreConditionsModal = this.ngModal.open(template, {
      size: 'lg',
      windowClass: 'sequenceGroup'
    });
    this.store.dispatch(new UpdateSelectedSequence([]));
    this.selectedGroup = [];
    this.selectedClockwise = this.selectedAntiClockwise = false;
  }

  addSelectedSequence(type) {
    if ( type === 'groups') {
      this.sequenceDetails$
        .take(1)
        .subscribe(sequenceDetails => {
          const getSequenceLineLength =  sequenceDetails.sequenceLines ? sequenceDetails.sequenceLines.length : 0;
          const sequenceGroupArray = [];
          for ( const item of this.selectedGroup){
            const sequenceGroup =  {
              id: 0,
              lineNo: getSequenceLineLength > 0 ? getSequenceLineLength + 1 : 0,
              versionNoOfType: 0,
              sequenceLineType: 'SEQUENCE_GROUP',
              sequenceGroupID : {
                id : 0,
                sequenceGroupLines : [
                  {
                    id : 0,
                    lineNo : 0,
                    sequence : {
                      id : item[0].id,
                      name :  item[0].name ,
                      trackDirection :  item[0].trackDirection ,
                      noOfTestCases : item[0].noOfTestCases,
                      level :  item[0].level
                    }
                  } ,
                  {
                    id : 0,
                    lineNo : 0,
                    sequence : {
                      id : item[1].id,
                      name :  item[1].name ,
                      trackDirection :  item[1].trackDirection ,
                      noOfTestCases : item[1].noOfTestCases,
                      level :  item[1].level
                    }
                  }
                ]
              },
            };
            sequenceGroupArray.push(sequenceGroup);
          }
          const updateFormValue = {
            ...sequenceDetails,
            sequenceLines : [
              ...( sequenceDetails.sequenceLines || []),
              ...sequenceGroupArray
            ]
          };
          this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
      });

    } else {
    this.selectedSequence$
      .first()
      .withLatestFrom(this.sequenceDetails$)
      .subscribe(([selectedSequence, sequenceDetails]) => {
        const getSequenceLineLength = sequenceDetails.sequenceLines.length || 0;
        const sequenceArray = [];
        for ( const item of selectedSequence){
          const sequence =  {
            id: 0,
            lineNo: getSequenceLineLength > 0 ? getSequenceLineLength + 1 : 0,
            versionNoOfType: 0,
            sequenceLineType: 'SEQUENCE',
            sequence: {
              id: item.id,
              name: item.name,
              trackDirection: item.trackDirection,
              noOfTestCases: item.noOfTestCases,
              level: item.level
            },
          };
          sequenceArray.push(sequence);
        }
        const updateFormValue = {
          ...sequenceDetails,
          sequenceLines : [
            ...( sequenceDetails.sequenceLines || []),
            ...sequenceArray
          ]
        };
        this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
      });
    }
    this.sequenceAdded.emit(true);
  }

  addToGroup( sequence, event, direction) {
    if (event.target.checked && direction === 'clockwise') {
        this.selectedClockwise = true;
        this.clockWiseSequenceObj = sequence;
    } else if (event.target.checked && direction === 'anti-clockwise') {
        this.selectedAntiClockwise = true;
        this.antiClockWiseSequenceObj = sequence;
    }
    if ( this.selectedClockwise && this.selectedAntiClockwise) {
      this.disableMakeGroupBtn = false;
    }
  }

  groupSelectedSequence(form) {
    const group = {0: this.clockWiseSequenceObj , 1: this.antiClockWiseSequenceObj};
    this.selectedGroup.push(group);
  }

  removeGroup(index) {
    this.selectedGroup.splice(index, 1);
  }

  onClearFilterDropDown(event: string, clearFrom: string): void {
    if (event) {
      if ( clearFrom !== '') {
        this.defaultAntiClockwiseCategory =
          this.defaultClockwiseCategory =
            this.defaultAntiClockwisePrivate =
              this.defaultClockwisePrivate = this.selectAll;
        this.store.dispatch(new UpdateSequenceListFilters({}, 'clockwise'));
        this.store.dispatch(new UpdateSequenceListFilters({}, 'anti-clockwise'));
      } else {
        this.defaultSelectionCategory = this.defaultSelectionPrivate = this.defaultSelectionDirection = this.selectAll;
        this.store.dispatch(new UpdateSequenceListFilters({}, ''));
      }
      this.filterObj = {};
      this.updatedFilters = {};
    }
  }
}
