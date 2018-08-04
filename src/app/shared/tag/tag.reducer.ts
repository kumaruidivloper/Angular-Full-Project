import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep, omitBy } from 'lodash';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import { SortDirection, SortOptions } from '../../core/interfaces/sort.i';
import { Tag, TagFilters } from './tag.model';
import {
  LoadTagsSuccess,
  PaginateTags,
  TagActions,
  tagsActionTypes,
  UpdateSelectedTags,
  UpdateTagFilters
} from './tag.actions';
import { Filter } from '../../core/interfaces/filter.model';

export const tagComponentFeatureName = 'TagComponent';

export interface TagComponentState {
  tags: Tag[];
  tagFilters: TagFilters;
  tagPagination: PaginationParameters;
  tagSort?: SortOptions;
  selectedTags: Tag[];
}

export const tagComponentDefaultState: TagComponentState = {
  tags: [],
  selectedTags: [],
  tagPagination: {
    page: 1,
    pageSize: 5
  },
  tagFilters: {}
};

export function tagComponentReducer(
  state: TagComponentState = tagComponentDefaultState,
  action: TagActions): TagComponentState {


  switch (action.type) {
    // case tagsActionTypes.LOAD_TAGS_FAILURE:
    //   return <TagComponentState>{
    //     ...state,
    //     tags: tagComponentDefaultState.tags,
    //     tagPagination: tagComponentDefaultState.tagPagination
    //   };
    case tagsActionTypes.LOAD_TAGS_SUCCESS:
      return <TagComponentState>{
        ...state,
        tags: (<LoadTagsSuccess> action).payload.data,
        tagPagination: (<LoadTagsSuccess> action).payload.pagination
      };
    case tagsActionTypes.PAGINATE_TAGS:
      return <TagComponentState>{
        ...state,
        tagPagination: (<PaginateTags> action).payload
      };
    case tagsActionTypes.UPDATE_TAG_FILTER:
      const filterToUpdate: Filter = (<UpdateTagFilters>action).payload;

      const updatedFilters: TagFilters = cloneDeep(state.tagFilters);

      updatedFilters[filterToUpdate.field] = filterToUpdate.value;

      return <TagComponentState>{
        ...state,
        tagFilters: omitBy(updatedFilters, value => value === '')
      };
    case tagsActionTypes.CLEAR_TABLE_FILTERS:
      return <TagComponentState>{
        ...state,
        tagFilters: {}
      };
    case tagsActionTypes.UPDATE_SELECTED_TAGS:
      return {
        ...state,
        selectedTags: (<UpdateSelectedTags>action).tags
      };
    default:
      return state;
  }
}

export function getNextSort(field: string, sort: SortOptions): SortOptions | undefined {
  if (sort && sort.field === field) {
    const nextSort: SortDirection = (sort.direction + 1) % 3;
    return SortDirection[nextSort] && {
      field: field,
      direction: nextSort
    };
  }

  return {
    field: field,
    direction: SortDirection.ASC
  };
}

export const getTags = (state: TagComponentState) => state.tags;
export const getTagSort = (state: TagComponentState) => state.tagSort;
export const getTagFilters = (state: TagComponentState) => state.tagFilters;
export const getTagPagination = (state: TagComponentState) => state.tagPagination;
export const getSelectedTags = (state: TagComponentState) => state.selectedTags;

export const tagStateSelector = createFeatureSelector<TagComponentState>(tagComponentFeatureName);
export const tagsSelector = createSelector(tagStateSelector, getTags);
export const tagSortSelector = createSelector(tagStateSelector, getTagSort);
export const tagFiltersSelector = createSelector(tagStateSelector, getTagFilters);
export const
  tagPaginationSelector = createSelector(tagStateSelector, getTagPagination);
export const tagSelectedSelector = createSelector(tagStateSelector, getSelectedTags);


