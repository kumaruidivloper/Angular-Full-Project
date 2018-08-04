import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { differenceBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { testCaseDetailsSelector } from '../../features/test-case-step/test-case-detail/test-case-detail.reducer';
import { UpdateTestCaseDetailsForm } from '../../features/test-case-step/test-case-detail/test-case-detail.actions';
import { testStepDetailsSelector } from '../../features/test-case-step/test-step-detail/test-step-detail.reducer';
import { UpdateTestStepDetailsForm } from '../../features/test-case-step/test-step-detail/test-step-detail-actions';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import { Tag, TagFilters } from './tag.model';
import {
  TagComponentState,
  tagFiltersSelector,
  tagPaginationSelector,
  tagSelectedSelector,
  tagsSelector
} from './tag.reducer';
import {
  ClearTagTableFilters,
  DeleteTestCaseTags,
  DeleteTestStepTags,
  DeSelectTags,
  LoadTags,
  PaginateTags,
  ReorderTestCaseTags,
  ReorderTestStepTags,
  SelectTags,
  UpdateSelectedTags,
  UpdateTagFilters
} from './tag.actions';
import { Filter } from '../../core/interfaces/filter.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tm-add-tag-modal',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, AfterViewInit {
  @Input() data: string;
  @Output() addedTag: EventEmitter<boolean> = new EventEmitter<boolean>();

  private addTagModal: NgbModalRef;
  public tags$: Observable<Tag[]>;
  public tagPaginationParameters$: Observable<PaginationParameters>;
  public tagFilters$: Observable<TagFilters>;
  public itemsPerPage = [5, 10, 15, 20];
  public selectedTags$: Observable<Tag[]>;
  public asyncDataDetails$: Observable<any>;

  constructor(private store: Store<TagComponentState>, private ngModal: NgbModal) {
  }

  ngOnInit() {
    this.addedTag.emit(false);
    this.tags$ = this.store.select(tagsSelector);
    this.tagPaginationParameters$ = this.store.select(tagPaginationSelector);
    this.tagFilters$ = this.store.select(tagFiltersSelector);
    this.selectedTags$ = this.store.select(tagSelectedSelector);
    this.store.dispatch(new LoadTags());
    if (this.data === 'testCase') {
      this.asyncDataDetails$ = this.store.select(testCaseDetailsSelector);
    } else {
      this.asyncDataDetails$ = this.store.select(testStepDetailsSelector);
    }
  }

  ngAfterViewInit() {
    // if ( this.data === 'testCase') {
    //   this.asyncDataDetails$ = this.store.select(testCaseDetailsSelector);
    // } else {
    //   this.asyncDataDetails$ = this.store.select(testStepDetailsSelector);
    // }
  }

  onPaginationChange(paginationParameters) {
    this.store.dispatch(new PaginateTags(paginationParameters));
  }

  onTagRowSelect(tag, event) {
    if (event.target.checked) {
      this.store.dispatch(new SelectTags(tag));
    } else {
      this.store.dispatch(new DeSelectTags(tag.name));
    }
  }

  onMoveTagsUp(index) {
    if (this.data === 'testCase') {
      this.store.dispatch(new ReorderTestCaseTags(index, index - 1));
    } else {
      this.store.dispatch(new ReorderTestStepTags(index, index - 1));
    }
    // this.addedTag.emit(true);
  }

  onMoveTagsDown(index) {
    if (this.data === 'testCase') {
      this.store.dispatch(new ReorderTestCaseTags(index, index + 1));
    } else {
      this.store.dispatch(new ReorderTestStepTags(index, index + 1));
    }
    // this.addedTag.emit(true);
  }

  onDeleteTags(index) {
    if (this.data === 'testCase') {
      this.store.dispatch(new DeleteTestCaseTags(index));
    } else {
      this.store.dispatch(new DeleteTestStepTags(index));
    }
    // this.addedTag.emit(true);
  }

  onFilterChange(filter: Filter) {
    let filteredVal;
    filteredVal = {
      field: filter.field,
      value: filter.value
    };
    this.store.dispatch(new UpdateTagFilters(filteredVal));
  }

  onClearTableFilter() {
    this.store.dispatch(new ClearTagTableFilters());
  }

  open(template) {
    this.addTagModal = this.ngModal.open(template, {
      size: 'sm',
    });
    this.store.dispatch(new UpdateSelectedTags([]));
  }

  addTags() {
    this.selectedTags$
      .first()
      .withLatestFrom(this.asyncDataDetails$)
      .subscribe(([selectedTags, testCaseStepDetails]) => {
        const testCaseStepTags = testCaseStepDetails.currentTestCaseStepVersion
          ? testCaseStepDetails.currentTestCaseStepVersion.testCaseStepTags
          : [];
        const uniqueTag = differenceBy(selectedTags, testCaseStepTags, 'name');
        const updateFormValue = {
          ...testCaseStepDetails,
          currentTestCaseStepVersion: {
            ...testCaseStepDetails.currentTestCaseStepVersion,
            testCaseStepTags: [
              ...(testCaseStepDetails.currentTestCaseStepVersion.testCaseStepTags || []),
              ...uniqueTag
            ]
          }
        };
        if (this.data === 'testCase') {
          this.store.dispatch(new UpdateTestCaseDetailsForm(updateFormValue));
        } else {
          this.store.dispatch(new UpdateTestStepDetailsForm(updateFormValue));
        }
        this.addedTag.emit(true);
        this.addTagModal.close();
      });
  }
}
