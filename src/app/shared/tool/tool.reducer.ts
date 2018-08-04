import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep, omitBy } from 'lodash';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import { SortDirection, SortOptions } from '../../core/interfaces/sort.i';

import { Tool, ToolFilters } from './tool.model';
import {
  LoadToolsSuccess,
  PaginateTools,
  ToolActions,
  toolActionTypes,
  UpdateSelectedTools,
  UpdateToolFilters
} from './tool.actions';
import { Filter } from '../../core/interfaces/filter.model';

export const toolComponentFeatureName = 'ToolComponent';

export interface ToolComponentState {
  tools: Tool[];
  selectedTools: Tool[];
  toolsFilters: ToolFilters;
  toolsPagination: PaginationParameters;
  toolsSort?: SortOptions;
}

export const toolComponentDefaultState: ToolComponentState = {
  tools: [],
  selectedTools: [],
  toolsPagination: {
    page: 1,
    pageSize: 5
  },
  toolsFilters: {}
};

export function toolComponentReducer(
  state: ToolComponentState = toolComponentDefaultState,
  action: ToolActions): ToolComponentState {

  switch (action.type) {
    // case toolActionTypes.LOAD_TOOLS_FAILURE:
    //   return <ToolComponentState>{
    //     ...state,
    //     tools: toolComponentDefaultState.tools,
    //     toolsPagination: toolComponentDefaultState.toolsPagination
    //   };
    case toolActionTypes.LOAD_TOOLS_SUCCESS:
      return <ToolComponentState>{
        ...state,
        tools: (<LoadToolsSuccess> action).payload.data,
        toolsPagination: (<LoadToolsSuccess> action).payload.pagination
      };
    case toolActionTypes.PAGINATE_TOOLS:
      return <ToolComponentState>{
        ...state,
        toolsPagination: (<PaginateTools>action).payload
      };
    case toolActionTypes.UPDATE_TOOL_FILTER:
      const filterToUpdate: Filter = (<UpdateToolFilters>action).payload;

      const updatedFilters: ToolFilters = cloneDeep(state.toolsFilters);

      updatedFilters[filterToUpdate.field] = filterToUpdate.value;

      return <ToolComponentState>{
        ...state,
        toolsFilters: omitBy(updatedFilters, value => value === '')
      };
    case toolActionTypes.CLEAR_TABLE_FILTERS:
      return <ToolComponentState>{
        ...state,
        toolsFilters: {}
      };
  case toolActionTypes.UPDATE_SELECTED_TOOLS:
    return {
      ...state,
      selectedTools: (<UpdateSelectedTools>action).tools
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

export const getTools = (state: ToolComponentState) => state.tools;
export const getToolsSort = (state: ToolComponentState) => state.toolsSort;
export const getToolsFilters = (state: ToolComponentState) => state.toolsFilters;
export const getToolsPagination = (state: ToolComponentState) => state.toolsPagination;
export const getSelectedTools = (state: ToolComponentState) => state.selectedTools;

export const toolsStateSelector = createFeatureSelector<ToolComponentState>(toolComponentFeatureName);
export const toolsSelector = createSelector(toolsStateSelector, getTools);
export const toolsSortSelector = createSelector(toolsStateSelector, getToolsSort);
export const toolsFiltersSelector = createSelector(toolsStateSelector, getToolsFilters);
export const toolsPaginationSelector = createSelector(toolsStateSelector, getToolsPagination);
export const toolsSelectedSelector = createSelector(toolsStateSelector, getSelectedTools);


