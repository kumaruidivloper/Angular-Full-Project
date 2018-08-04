import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Tool, ToolFilters } from './tool.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import { differenceBy } from 'lodash';
import { testCaseDetailsSelector } from '../../features/test-case-step/test-case-detail/test-case-detail.reducer';
import { UpdateTestCaseDetailsForm } from '../../features/test-case-step/test-case-detail/test-case-detail.actions';
import { testStepDetailsSelector } from '../../features/test-case-step/test-step-detail/test-step-detail.reducer';
import { UpdateTestStepDetailsForm } from '../../features/test-case-step/test-step-detail/test-step-detail-actions';
import {
  ToolComponentState,
  toolsFiltersSelector,
  toolsPaginationSelector,
  toolsSelectedSelector,
  toolsSelector
} from './tool.reducer';
import {
  ClearToolTableFilters,
  DeleteTestCaseTools,
  DeleteTestStepTools,
  DeSelectTools,
  LoadTools,
  PaginateTools,
  ReorderTestCaseTools,
  ReorderTestStepTools,
  SelectTools,
  UpdateSelectedTools,
  UpdateToolFilters
} from './tool.actions';
import { Filter } from '../../core/interfaces/filter.model';


@Component({
  selector: 'tm-add-tool-modal',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolsComponent implements OnInit, AfterViewInit {
  @Input() data: string;
  @Output() addedTool: EventEmitter<boolean> = new EventEmitter<boolean>();

  private addToolModal: NgbModalRef;
  public tools$: Observable<Tool[]>;
  public toolsPaginationParameters$: Observable<PaginationParameters>;
  public selectedTools$: Observable<Tool[]>;
  public toolsFilters$: Observable<ToolFilters>;
  public itemsPerPage = [5, 10, 15, 20];
  public asyncDataDetails$: Observable<any>;

  constructor(private store: Store<ToolComponentState>, private ngModal: NgbModal) { }

  ngOnInit() {
    this.addedTool.emit(false);
    this.tools$ = this.store.select(toolsSelector);
    this.toolsPaginationParameters$ = this.store.select(toolsPaginationSelector);
    this.toolsFilters$ = this.store.select(toolsFiltersSelector);
    this.selectedTools$ = this.store.select(toolsSelectedSelector);
    if ( this.data === 'testCase') {
      this.asyncDataDetails$ = this.store.select(testCaseDetailsSelector);
    } else {
      this.asyncDataDetails$ = this.store.select(testStepDetailsSelector);
    }
    this.store.dispatch(new LoadTools());
  }
  ngAfterViewInit() {
    if ( this.data === 'testCase') {
      this.asyncDataDetails$ = this.store.select(testCaseDetailsSelector);
    } else {
      this.asyncDataDetails$ = this.store.select(testStepDetailsSelector);
    }
  }
  onPaginationChange(paginationParameters) {
    this.store.dispatch(new PaginateTools(paginationParameters));
  }
  onClearTableFilter() {
    this.store.dispatch(new ClearToolTableFilters());
  }
  onToolRowSelect(tools, event) {
    if (event.target.checked) {
      this.store.dispatch(new SelectTools(tools));
    } else {
      this.store.dispatch(new DeSelectTools(tools.name));
    }
  }


  onFilterChange(filter: Filter) {
    let filteredVal;
      filteredVal = {
        field: filter.field,
        value: filter.value
      };
    this.store.dispatch(new UpdateToolFilters(filteredVal));
  }
  onMoveToolsUp(index) {
    if ( this.data === 'testCase') {
      this.store.dispatch(new ReorderTestCaseTools(index, index - 1));
    } else {
      this.store.dispatch(new ReorderTestStepTools(index, index - 1));
    }
    this.addedTool.emit(true);
  }

  onMoveToolsDown(index) {
    if ( this.data === 'testCase') {
      this.store.dispatch(new ReorderTestCaseTools(index, index + 1));
    } else {
      this.store.dispatch(new ReorderTestStepTools(index, index + 1));
    }
    this.addedTool.emit(true);
  }

  onDeleteTools(index) {
    if ( this.data === 'testCase') {
      this.store.dispatch(new DeleteTestCaseTools(index));
    } else {
      this.store.dispatch(new DeleteTestStepTools(index));
    }
    this.addedTool.emit(true);
  }
  addTools() {
    this.selectedTools$
      .first()
      .withLatestFrom(this.asyncDataDetails$)
      .subscribe(([selectedTools, testCaseStepDetails]) => {
        const testCaseTools = testCaseStepDetails.currentTestCaseStepVersion.testCaseStepTools;
        const uniqueTool = differenceBy(selectedTools, testCaseTools, 'name');
        const updateFormValue = {
          ...testCaseStepDetails,
          currentTestCaseStepVersion: {
            ...testCaseStepDetails.currentTestCaseStepVersion || {},
            testCaseStepTools : [
              ...( testCaseStepDetails.currentTestCaseStepVersion.testCaseStepTools || []),
              ...uniqueTool
            ]
          }
        };
        if ( this.data === 'testCase') {
          this.store.dispatch(new UpdateTestCaseDetailsForm(updateFormValue));
        } else {
          this.store.dispatch(new UpdateTestStepDetailsForm(updateFormValue));
        }
        this.addedTool.emit(true);
        this.addToolModal.close();
      });
  }
  open(template) {
    this.addToolModal = this.ngModal.open(template, {
      size: 'sm',
    });
    this.store.dispatch(new UpdateSelectedTools([]));
  }
}
