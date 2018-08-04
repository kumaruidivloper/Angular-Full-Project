import { Action } from '@ngrx/store';
import { PaginationParameters } from '../../core/interfaces/pagination-params.i';
import { PaginatedResponse } from '../../core/interfaces/paginated-response.i';
import { Tool } from './tool.model';
import { Filter } from '../../core/interfaces/filter.model';

export const toolActionTypes = {
  UPDATE_TOOL_FILTER: '[ToolList] Update Tools Filters',
  CLEAR_TABLE_FILTERS: '[ToolList] Clear Filters of Tools Table',
  EMPTY_FILTERS: '[ToolList] Empty Tools Filters',
  LOAD_TOOLS: '[ToolList] Load Tools',
  LOAD_TOOLS_SUCCESS: '[ToolList] Load Tools Successfully',
  LOAD_TOOLS_FAILURE: '[ToolList] Load Tools Failure',
  SORT_TOOLS: '[ToolList] Sort Tools',
  PAGINATE_TOOLS: '[ToolList] Pages of Tools',
  SELECT_TOOLS: '[ToolList] Select Tools',
  DESELECT_TOOLS: '[ToolList] Deselect Tools',
  REORDER_TEST_CASE_TOOLS: '[ToolList] Reorder Test Case Tools',
  REORDER_TEST_STEP_TOOLS: '[ToolList] Reorder Test Step Tools',
  DELETE_TEST_CASE_TOOLS: '[ToolList] Delete Test Case Tools',
  DELETE_TEST_STEP_TOOLS: '[ToolList] Delete Test Step Tools',
  UPDATE_SELECTED_TOOLS: '[ToolList] Update Selected Tools'
};

export class UpdateToolFilters implements Action {
  readonly type: string = toolActionTypes.UPDATE_TOOL_FILTER;
  constructor(public payload: Filter) {}
}

export class ClearToolTableFilters implements Action {
  readonly type: string = toolActionTypes.CLEAR_TABLE_FILTERS;
}

export class LoadTools implements Action {
  readonly type: string = toolActionTypes.LOAD_TOOLS;
}

export class LoadToolsSuccess implements Action {
  readonly type: string = toolActionTypes.LOAD_TOOLS_SUCCESS;
  constructor(public payload: PaginatedResponse<Tool[]>) {}
}

export class LoadToolsFailure implements Action {
  readonly type: string = toolActionTypes.LOAD_TOOLS_FAILURE;
}

export class SortTools implements Action {
  readonly type: string = toolActionTypes.SORT_TOOLS;
  constructor(public payload: string) {}
}

export class PaginateTools implements Action {
  readonly type: string = toolActionTypes.PAGINATE_TOOLS;
  constructor(public payload: PaginationParameters) {}
}
export class SelectTools implements Action {
  readonly type: string = toolActionTypes.SELECT_TOOLS;
  constructor(public tool: Tool) {}
}

export class DeSelectTools implements Action {
  readonly type: string = toolActionTypes.DESELECT_TOOLS;
  constructor(public name: string) {}
}

export class ReorderTestCaseTools implements Action {
  readonly type: string = toolActionTypes.REORDER_TEST_CASE_TOOLS;
  constructor(public from: number, public to: number) {}
}
export class ReorderTestStepTools implements Action {
  readonly type: string = toolActionTypes.REORDER_TEST_STEP_TOOLS;
  constructor(public from: number, public to: number) {}
}

export class DeleteTestCaseTools implements Action {
  readonly type: string = toolActionTypes.DELETE_TEST_CASE_TOOLS;
  constructor(public tool: number) {}
}
export class DeleteTestStepTools implements Action {
  readonly type: string = toolActionTypes.DELETE_TEST_STEP_TOOLS;
  constructor(public tool: number) {}
}
export class UpdateSelectedTools implements Action {
  readonly type: string = toolActionTypes.UPDATE_SELECTED_TOOLS;
  constructor(public tools: Tool[]) {}
}
export type ToolActions = UpdateToolFilters | ClearToolTableFilters | LoadTools
  | LoadToolsSuccess | LoadToolsFailure | SortTools | PaginateTools | SelectTools | DeSelectTools
  | ReorderTestCaseTools | ReorderTestStepTools | DeleteTestCaseTools | DeleteTestStepTools | UpdateSelectedTools;


