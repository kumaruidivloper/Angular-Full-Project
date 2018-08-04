import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { cloneDeep } from 'lodash';
import { TagComponentService } from './tag.service';
import { PaginatedResponse } from '../../core/interfaces/paginated-response.i';
import {Tag} from './tag.model';
import {TagComponentState, tagSelectedSelector} from './tag.reducer';
import {UpdateTestCaseDetailsForm} from '../../features/test-case-step/test-case-detail/test-case-detail.actions';
import {testCaseDetailsSelector} from '../../features/test-case-step/test-case-detail/test-case-detail.reducer';
import {
  DeleteTestCaseTags, DeleteTestStepTags,
  DeSelectTags,
  LoadTags,
  LoadTagsFailure,
  LoadTagsSuccess, ReorderTestCaseTags, ReorderTestStepTags,
  SelectTags,
  tagsActionTypes,
  UpdateSelectedTags
} from './tag.actions';
import {testStepDetailsSelector} from '../../features/test-case-step/test-step-detail/test-step-detail.reducer';


@Injectable()
export class TagComponentEffects {
  constructor(
    private actions$: Actions,
    public tagService: TagComponentService,
    private store: Store<TagComponentState>) {
  }

  @Effect() getTagsList$: Observable<Action> = this.actions$
    .ofType(tagsActionTypes.LOAD_TAGS)
    .mergeMap(() => {
      return this.tagService.getTagList()
        .map((result: PaginatedResponse<Tag[]>) => {
         return new LoadTagsSuccess(result);
        })
        .catch(() => {
          return Observable.of(new LoadTagsFailure());
        });
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      tagsActionTypes.PAGINATE_TAGS,
      tagsActionTypes.UPDATE_TAG_FILTER,
      tagsActionTypes.CLEAR_TABLE_FILTERS
    ]).map(() => new LoadTags());

  @Effect() selectTags$: Observable<Action> = this.actions$
    .ofType( tagsActionTypes.SELECT_TAGS)
    .withLatestFrom(this.store.select(tagSelectedSelector))
    .map(([action, selectedTags]) => {
      const tags = cloneDeep(selectedTags);
      tags.push((<SelectTags>action).tag);
      return new UpdateSelectedTags(tags);
    });

  @Effect() deselectTags$: Observable<Action> = this.actions$
    .ofType( tagsActionTypes.DESELECT_TAGS)
    .withLatestFrom(this.store.select(tagSelectedSelector))
    .map(([action, selectedTags]) => {
      const tagsName = (<DeSelectTags>action).name;
      const tags = selectedTags.filter(tag => tag.name !== tagsName);
      return new UpdateSelectedTags(tags);
    });
  // @todo remove if not necessary - (hema) its needed
  // @Effect() clearFilters$: Observable<Action> = this.actions$
  //   .ofType()
  //   .map(() => {
  //     return new EmptyFilters();
  //   });


  @Effect() reorderTestCaseTags$: Observable<Action> = this.actions$
    .ofType(tagsActionTypes.REORDER_TEST_CASE_TAGS)
    .withLatestFrom(this.store.select(testCaseDetailsSelector))
    .map(([action, testCaseDetails]) => {
      const { from, to } = <ReorderTestCaseTags>action;
      const tags: Tag[] = testCaseDetails.currentTestCaseStepVersion['testCaseStepTags'];
      tags.splice(to, 0, tags.splice(from, 1)[0]);
      return new UpdateTestCaseDetailsForm({
        ...testCaseDetails,
        currentTestCaseStepVersion : {
          ...testCaseDetails.currentTestCaseStepVersion,
          testCaseStepTags: [
            ...(testCaseDetails.currentTestCaseStepVersion.testCaseStepTags || []),
          ]
        }
      });
    });
  @Effect() reorderTestStepTags$: Observable<Action> = this.actions$
    .ofType(tagsActionTypes.REORDER_TEST_STEP_TAGS)
    .withLatestFrom(this.store.select(testStepDetailsSelector))
    .map(([action, testStepDetails]) => {
      const { from, to } = <ReorderTestStepTags>action;
      const tags: Tag[] = testStepDetails.currentTestCaseStepVersion['testCaseStepTags'];
      tags.splice(to, 0, tags.splice(from, 1)[0]);
      return new UpdateTestCaseDetailsForm({
        ...testStepDetails,
        currentTestCaseStepVersion : {
          ...testStepDetails.currentTestCaseStepVersion,
          testCaseStepTags: [
            ...(testStepDetails.currentTestCaseStepVersion.testCaseStepTags || []),
          ]
        }
      });
    });

  @Effect() deleteTestCaseTags$: Observable<Action> = this.actions$
    .ofType(tagsActionTypes.DELETE_TEST_CASE_TAGS)
    .withLatestFrom(this.store.select(testCaseDetailsSelector))
    .map(([action, testCaseDetails]) => {
      const tags: Tag[] = testCaseDetails.currentTestCaseStepVersion['testCaseStepTags'];
      tags.splice((<DeleteTestCaseTags>action).tag, 1);
      return new UpdateTestCaseDetailsForm({
        ...testCaseDetails,
        currentTestCaseStepVersion : {
          ...testCaseDetails.currentTestCaseStepVersion,
          testCaseStepTags: [
            ...(testCaseDetails.currentTestCaseStepVersion.testCaseStepTags || []),
          ]
        }
      });
    });

  @Effect() deleteTestStepTags$: Observable<Action> = this.actions$
    .ofType(tagsActionTypes.DELETE_TEST_STEP_TAGS)
    .withLatestFrom(this.store.select(testStepDetailsSelector))
    .map(([action, testStepDetails]) => {
      const tags: Tag[] = testStepDetails.currentTestCaseStepVersion['testCaseStepTags'];
      tags.splice((<DeleteTestStepTags>action).tag, 1);
      return new UpdateTestCaseDetailsForm({
        ...testStepDetails,
        currentTestCaseStepVersion : {
          ...testStepDetails.currentTestCaseStepVersion,
          testCaseStepTags: [
            ...(testStepDetails.currentTestCaseStepVersion.testCaseStepTags || []),
          ]
        }
      });
    });

}
