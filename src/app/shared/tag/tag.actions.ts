import { Action } from '@ngrx/store';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import { PaginatedResponse } from '../../core/interfaces/paginated-response.i';
import { Tag } from './tag.model';
import { Filter } from '../../core/interfaces/filter.model';

export const tagsActionTypes = {
  UPDATE_TAG_FILTER: '[TagList] Update Tag Filters',
  CLEAR_TABLE_FILTERS: '[TagList] Clear Filters of Tag Table',
  EMPTY_FILTERS: '[TagList] Empty Tag Filters',
  LOAD_TAGS: '[TagList] Load Tags in TestCaseStep',
  LOAD_TAGS_SUCCESS: '[TagList] Load Tags in TestCaseStep Successfully',
  LOAD_TAGS_FAILURE: '[TagList] Load Tags in TestCaseStep Failure',
  SORT_TAGS: '[TagList] Sort Tags',
  PAGINATE_TAGS: '[TagList] Pages of Tag',
  SELECT_TAGS: '[TagList] Select Tags',
  DESELECT_TAGS: '[TagList] Deselect Tags',
  REORDER_TEST_CASE_TAGS: '[TagList] Reorder Test Case Tags',
  REORDER_TEST_STEP_TAGS: '[TagList] Reorder Test Step Tags',
  DELETE_TEST_CASE_TAGS: '[TagList] Delete Test Case Tags',
  DELETE_TEST_STEP_TAGS: '[TagList] Delete Test Step Tags',
  UPDATE_SELECTED_TAGS: '[TagList] Update Selected Tags'
};

export class UpdateTagFilters implements Action {
  readonly type: string = tagsActionTypes.UPDATE_TAG_FILTER;
  constructor(public payload: Filter) {}
}

export class ClearTagTableFilters implements Action {
  readonly type: string = tagsActionTypes.CLEAR_TABLE_FILTERS;
}

export class LoadTags implements Action {
  readonly type: string = tagsActionTypes.LOAD_TAGS;
}

export class LoadTagsSuccess implements Action {
  readonly type: string = tagsActionTypes.LOAD_TAGS_SUCCESS;
  constructor(public payload: PaginatedResponse<Tag[]>) {}
}

export class LoadTagsFailure implements Action {
  readonly type: string = tagsActionTypes.LOAD_TAGS_FAILURE;
}

export class SortTags implements Action {
  readonly type: string = tagsActionTypes.SORT_TAGS;
  constructor(public payload: string) {}
}

export class PaginateTags implements Action {
  readonly type: string = tagsActionTypes.PAGINATE_TAGS;
  constructor(public payload: PaginationParameters) {}
}
export class SelectTags implements Action {
  readonly type: string = tagsActionTypes.SELECT_TAGS;
  constructor(public tag: Tag) {}
}

export class DeSelectTags implements Action {
  readonly type: string = tagsActionTypes.DESELECT_TAGS;
  constructor(public name: string) {}
}

export class ReorderTestCaseTags implements Action {
  readonly type: string = tagsActionTypes.REORDER_TEST_CASE_TAGS;
  constructor(public from: number, public to: number) {}
}

export class ReorderTestStepTags implements Action {
  readonly type: string = tagsActionTypes.REORDER_TEST_STEP_TAGS;
  constructor(public from: number, public to: number) {}
}

export class DeleteTestCaseTags implements Action {
  readonly type: string = tagsActionTypes.DELETE_TEST_CASE_TAGS;
  constructor(public tag: number) {}
}
export class DeleteTestStepTags implements Action {
  readonly type: string = tagsActionTypes.DELETE_TEST_STEP_TAGS;
  constructor(public tag: number) {}
}
export class UpdateSelectedTags implements Action {
  readonly type: string = tagsActionTypes.UPDATE_SELECTED_TAGS;
  constructor(public tags: Tag[]) {}
}

export type TagActions = UpdateTagFilters | ClearTagTableFilters | LoadTags | LoadTagsSuccess | LoadTagsFailure
  | SortTags | PaginateTags | SelectTags | DeSelectTags | ReorderTestCaseTags | ReorderTestStepTags
  | DeleteTestCaseTags | DeleteTestStepTags  | UpdateSelectedTags;


