import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TestCaseStep } from './test-case-step.model';
import { PaginationParameters } from '../../../../../core/interfaces/pagination-params.i';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  paginationTestCaseListSelector,
  paginationTestStepListSelector,
  selectedTestCaseSelector,
  selectedTestStepSelector,
  tagsForSequenceSelector,
  tcTruckFunctionAreaSelector,
  testCaseFiltersSelector,
  testCaseListSelector,
  TestCaseStepListState,
  testStepFiltersSelector,
  testStepListSelector
} from './test-case-step.reducer';
import {
  DeSelectTestCaseList,
  DeSelectTestStepList,
  GetTestCaseList,
  GetTestStepList,
  GetTruckFunctionArea,
  LoadAllTestCases,
  LoadAllTestSteps,
  LoadTags,
  PaginateTestCaseList,
  PaginateTestStepList,
  SelectTestCaseList,
  SelectTestStepList,
  UpdateTestCaseList,
  UpdateTestCaseListFilters,
  UpdateTestStepList,
  UpdateTestStepListFilters
} from './test-case-step.actions';
import { sequenceDetailsSelector } from '../../sequence-details.reducer';
import { SequenceDetails } from '../../sequence-details.model';
import { UpdateSequenceDetailsForm } from '../../sequence-details.actions';
import { Tag } from '../../../../../shared/tag/tag.model';
import { TruckFunctionArea } from '../../../../test-case-step/test-case-detail/test-case-detail.model';
import { Filter } from '../../../../../core/interfaces/filter.model';


@Component({
  selector: 'tm-test-case-step-lists',
  templateUrl: './test-case-step.component.html'
})
export class TestCaseStepListComponent implements OnInit {
  @Output() testCaseStepAdded: EventEmitter<boolean> = new EventEmitter();
  @Input() isDisableCaseStep: boolean ;

  private addTestCaseListModal: NgbModalRef;
  public testCaseList$: Observable<TestCaseStep[]>;
  public testStepList$: Observable<TestCaseStep[]>;
  public selectedTestCases$: Observable<TestCaseStep[]>;
  public selectedTestSteps$: Observable<TestCaseStep[]>;
  public paginationTestCase: Observable<PaginationParameters>;
  public paginationTestStep: Observable<PaginationParameters>;
  public testCaseFilters$: Observable<any>;
  public testStepFilters$: Observable<any>;
  public sequenceDetails$: Observable<SequenceDetails>;
  public tags$: Observable<Tag[]>;
  private selectAll: string = 'ALL';
  public itemsPerPage = [5, 10, 15];
  public levelSelector = [this.selectAll, 1, 2, 3];
  public categorySelection = [this.selectAll, 'STANDARD', 'DEVELOPMENT'];
  public isPrivateSelector = [{id: this.selectAll, value: this.selectAll}, { id: 'YES', value: true}, {id: 'NO', value: false}];
  public testCaseFilters = {};
  public testStepFilters = {};
  public defaultSelectionLevel: string = this.selectAll;
  public defaultSelectionCategory: string = this.selectAll;
  public defaultSelectionPrivate: string = this.selectAll;
  public defaultSelectionTag: string = '';
  public defaultSelectTag: string = '';
  public truckFunctionAreaList$: Observable<TruckFunctionArea[]>;
  public truckFunctionList = [];
  public selectedTruckArea: string;
  public selectedTruckFunction: string;
  public isTruckFunction: boolean;
  constructor(private store: Store<TestCaseStepListState>,
              public router: Router,
              private ngModal: NgbModal) { }


  onTestCasePaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateTestCaseList(paginationParameters));
    this.store.dispatch(new UpdateTestCaseListFilters( this.testCaseFilters));
  }

  onTestCaseFilterChange(filter: Filter): void {
    this.testCaseFilters[filter.field] = filter.value !== this.selectAll ? filter.value : '';
    this.store.dispatch(new UpdateTestCaseListFilters(this.testCaseFilters));
  }

  onTestCaseFilterSelect(value: string, fromSelector: string): void {
    this.testCaseFilters[fromSelector] = value !== this.selectAll ? value : '';
    this.store.dispatch(new UpdateTestCaseListFilters( this.testCaseFilters));
  }

  onTestCaseClearFilterDropDown(event: string): void {
    if (event) {
      this.defaultSelectionCategory =
      this.defaultSelectionPrivate =
      this.defaultSelectionLevel = this.selectAll;
      this.defaultSelectTag = '';
      this.selectedTruckArea = '';
      this.selectedTruckFunction = '';
      this.testCaseFilters = {};
      this.isTruckFunction = true;
      this.store.dispatch(new UpdateTestCaseListFilters( this.testCaseFilters));
    }
  }

  onTestStepPaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateTestStepList(paginationParameters));
    this.store.dispatch(new UpdateTestStepListFilters( this.testCaseFilters));
  }

  onTestStepFilterChange(filter: Filter): void {
    this.testStepFilters[filter.field] = filter.value !== this.selectAll ? filter.value : '';
    this.store.dispatch(new UpdateTestStepListFilters(this.testStepFilters));
  }

  onTestStepFilterSelect(value: string, fromSelector: string): void {
    this.testStepFilters[fromSelector] = value !== this.selectAll ? value : '';
    this.store.dispatch(new UpdateTestStepListFilters( this.testStepFilters));
  }

  onTestStepClearFilterDropDown(event: string): void {
    if (event) {
      this.defaultSelectionCategory =
        this.defaultSelectionPrivate =
          this.defaultSelectionLevel = this.selectAll;
      this.defaultSelectionTag = '';
      this.testStepFilters = {};
      this.store.dispatch(new UpdateTestStepListFilters( this.testStepFilters));
    }
  }

  onTestCaseSelectChange(fromPage, data, event) {
    if (event.target.checked) {
      if ( fromPage === 'testCase') {
        this.store.dispatch(new SelectTestCaseList(data));
      } else {
        this.store.dispatch(new SelectTestStepList(data));
      }
    } else {
      if ( fromPage === 'testCase') {
        this.store.dispatch(new DeSelectTestCaseList(data.id));
      } else {
        this.store.dispatch(new DeSelectTestStepList(data.id));
      }
    }
  }

  ngOnInit() {
    this.truckFunctionAreaList$ = this.store.select(tcTruckFunctionAreaSelector);
    this.testCaseList$ = this.store.select(testCaseListSelector);
    this.paginationTestCase = this.store.select(paginationTestCaseListSelector);
    this.testCaseFilters$ = this.store.select(testCaseFiltersSelector);
    this.selectedTestCases$ = this.store.select(selectedTestCaseSelector);
    this.store.dispatch(new GetTestCaseList());

    this.testStepList$ = this.store.select(testStepListSelector);
    this.paginationTestStep = this.store.select(paginationTestStepListSelector);
    this.testStepFilters$ = this.store.select(testStepFiltersSelector);
    this.selectedTestSteps$ = this.store.select(selectedTestStepSelector);
    this.store.dispatch(new GetTestStepList());

    this.sequenceDetails$ = this.store.select(sequenceDetailsSelector);
    this.tags$ = this.store.select(tagsForSequenceSelector);
    this.store.dispatch( new LoadTags());
    this.store.dispatch(new GetTruckFunctionArea());
    this.selectedTruckArea = '';
    this.selectedTruckFunction = '';
    this.isTruckFunction = true;
  }

  open(template) {
    this.addTestCaseListModal = this.ngModal.open(template, {
      size: 'lg',
      windowClass: 'testCaseStepModal'
    });
    this.store.dispatch( new UpdateTestStepList([]));
    this.store.dispatch( new UpdateTestCaseList([]));
  }

  addTestCase() {
    this.selectedTestCases$
      .first()
      .withLatestFrom(this.sequenceDetails$)
      .subscribe(([selectedTestCases, sequenceDetails]) => {
        const testCaseArray = [];
        const getSequenceLineLength = sequenceDetails.sequenceLines ? sequenceDetails.sequenceLines.length : 0;
        for ( const item of selectedTestCases){
          const testCase =  {
            id: 0,
            lineNo: getSequenceLineLength > 0 ? getSequenceLineLength + 1 : 0,
            versionNoOfType: 0,
            sequenceLineType: 'TEST_CASE',
            testCase: {
              id: item.id,
              name: item.currentTestCaseStepVersion.name,
              level: item.level,
              speed: {
                speedValue: item.currentTestCaseStepVersion.speedValue || null,
                speedUnit: item.currentTestCaseStepVersion.speedUnit || null
              },
            }
          };
          testCaseArray.push(testCase);
        }
        const updateFormValue = {
          ...sequenceDetails,
          sequenceLines : [
            ...( sequenceDetails.sequenceLines || []),
            ...testCaseArray
          ]
        };
        this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
        this.testCaseStepAdded.emit(true);
      });
  }

  addTestStep() {
    this.selectedTestSteps$
      .first()
      .withLatestFrom(this.sequenceDetails$)
      .subscribe(([selectedTestSteps, sequenceDetails]) => {
        const testStepArray = [];
        for ( const item of selectedTestSteps){
          const testStep =  {
            id: 0,
            lineNo: 0,
            versionNoOfType: 0,
            sequenceLineType: 'TEST_STEP',
            testCase: {
              id: item.id,
              name: item.currentTestCaseStepVersion.name,
              level: item.level,
              speed: {
                speedValue: item.currentTestCaseStepVersion.speedValue || null,
                speedUnit: item.currentTestCaseStepVersion.speedUnit || null
              },
            }
          };
          testStepArray.push(testStep);
        }
        const updateFormValue = {
          ...sequenceDetails,
          sequenceLines : [
            ...( sequenceDetails.sequenceLines || []),
            ...testStepArray
          ]
        };
        this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
      });
    this.testCaseStepAdded.emit(true);
   }

  addAllTestStep() {
    this.testStepList$
      .first()
      .withLatestFrom(this.sequenceDetails$)
      .subscribe(([testStepList, sequenceDetails]) => {
        const testStepArray = [];
        for ( const item of testStepList){
          const testStep =  {
            id: 0,
            lineNo: 0,
            versionNoOfType: 0,
            sequenceLineType: 'TEST_STEP',
            testCase: {
              id: item.id,
              name: item.currentTestCaseStepVersion.name,
              level: item.level,
              speed: {
                speedValue: item.currentTestCaseStepVersion.speedValue || null,
                speedUnit: item.currentTestCaseStepVersion.speedUnit || null
              },
            }
          };
          testStepArray.push(testStep);
        }
        const updateFormValue = {
          ...sequenceDetails,
          sequenceLines : [
            ...( sequenceDetails.sequenceLines || []),
            ...testStepArray
          ]
        };
        this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
        this.testCaseStepAdded.emit(true);
      });
  }

  addAllTestCase() {
    this.testCaseList$
      .first()
      .withLatestFrom(this.sequenceDetails$)
      .subscribe(([testCaseList, sequenceDetails]) => {
        const testCaseArray = [];
        const getSequenceLineLength = sequenceDetails.sequenceLines ? sequenceDetails.sequenceLines.length : 0;
        for ( const item of testCaseList){
          const testCase =  {
            id: 0,
            lineNo: getSequenceLineLength > 0 ? getSequenceLineLength + 1 : 0,
            versionNoOfType: 0,
            sequenceLineType: 'TEST_CASE',
            testCase: {
              id: item.id,
              name: item.currentTestCaseStepVersion.name,
              level: item.level,
              speed: {
                speedValue: item.currentTestCaseStepVersion.speedValue || null,
                speedUnit: item.currentTestCaseStepVersion.speedUnit || null
              },
            }
          };
          testCaseArray.push(testCase);
        }
        const updateFormValue = {
          ...sequenceDetails,
          sequenceLines : [
            ...( sequenceDetails.sequenceLines || []),
            ...testCaseArray
          ]
        };
        this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
        this.testCaseStepAdded.emit(true);
      });
  }

  onSelectTruckFunctionArea(value: string, fromSelector: string): void {
     if ( this.selectedTruckArea !== '' ) {
      this.truckFunctionAreaList$.subscribe(truckFunctionArea => {
        truckFunctionArea.filter( area => {
          if ( area.id === this.selectedTruckArea) {
            this.truckFunctionList = area['truckFunction'];
            this.isTruckFunction = false;
            this.testCaseFilters[fromSelector] = value !== '' ? area.name : '';
            this.store.dispatch(new UpdateTestCaseListFilters(this.testCaseFilters));
          }
        });
      });
    } else {
       this.truckFunctionList = [];
       this.selectedTruckFunction = '';
       this.testCaseFilters[fromSelector] = value !== '' ? value : '';
       this.isTruckFunction = true;
       this.store.dispatch(new UpdateTestCaseListFilters(this.testCaseFilters));
     }
  }

  onSelectTruckFunction(value: string, fromSelector: string) {
    this.testCaseFilters[fromSelector] = value !== '' ? value : '';
    this.store.dispatch(new UpdateTestCaseListFilters( this.testCaseFilters));
  }
}
