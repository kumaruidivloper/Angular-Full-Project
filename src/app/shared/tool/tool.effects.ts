import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { ToolComponentService } from './tool.service';
import { PaginatedResponse } from '../../core/interfaces/paginated-response.i';
import {Tool} from './tool.model';
import { cloneDeep } from 'lodash';
import {
  DeleteTestCaseTools,
  DeleteTestStepTools,
  DeSelectTools, LoadTools,
  LoadToolsFailure,
  LoadToolsSuccess, ReorderTestCaseTools, ReorderTestStepTools,
  SelectTools, toolActionTypes,
  UpdateSelectedTools
} from './tool.actions';
import {ToolComponentState, toolsSelectedSelector} from './tool.reducer';
import {UpdateTestCaseDetailsForm} from '../../features/test-case-step/test-case-detail/test-case-detail.actions';
import {testCaseDetailsSelector} from '../../features/test-case-step/test-case-detail/test-case-detail.reducer';
import {testStepDetailsSelector} from '../../features/test-case-step/test-step-detail/test-step-detail.reducer';

@Injectable()
export class ToolComponentEffects {
  private asyncSelector: string;
  constructor(
    private actions$: Actions,
    public toolService: ToolComponentService,
    private store: Store<ToolComponentState>) {
  }

  @Effect() getToolList$: Observable<Action> = this.actions$
    .ofType(toolActionTypes.LOAD_TOOLS)
    .mergeMap(() => {
      return this.toolService.getToolList()
        .map((result: PaginatedResponse<Tool[]>) => {
         return new LoadToolsSuccess(result);
        })
        .catch(() => {
          return Observable.of(new LoadToolsFailure());
        });
    });

  @Effect() changeParameters$: Observable<Action> = this.actions$
    .ofType(...[
      toolActionTypes.PAGINATE_TOOLS,
      toolActionTypes.UPDATE_TOOL_FILTER,
      toolActionTypes.CLEAR_TABLE_FILTERS
    ]).map(() => new LoadTools());

    @Effect() selectTools$: Observable<Action> = this.actions$
    .ofType( toolActionTypes.SELECT_TOOLS)
    .withLatestFrom(this.store.select(toolsSelectedSelector))
    .map(([action, selectedTools]) => {
      const tools = cloneDeep(selectedTools);
      tools.push((<SelectTools>action).tool);
      return new UpdateSelectedTools(tools);
    });

  @Effect() deselectTools$: Observable<Action> = this.actions$
    .ofType( toolActionTypes.DESELECT_TOOLS)
    .withLatestFrom(this.store.select(toolsSelectedSelector))
    .map(([action, selectedTools]) => {
      const toolsName = (<DeSelectTools>action).name;
      const tools = selectedTools.filter(tool => tool.name !== toolsName);
      return new UpdateSelectedTools(tools);
    });

  // @Effect() clearFilters$: Observable<Action> = this.actions$
  //   .ofType(CLEAR_FILTERS)
  //   .map(() => {
  //     return new EmptyFilters();
  //   });

  @Effect() reorderTestCaseTools$: Observable<Action> = this.actions$
    .ofType(toolActionTypes.REORDER_TEST_CASE_TOOLS)
    .withLatestFrom(this.store.select(testCaseDetailsSelector))
    .map(([action, testCaseDetails]) => {
      const { from, to } = <ReorderTestCaseTools>action;
      const tools: Tool[] = testCaseDetails.currentTestCaseStepVersion['testCaseStepTools'];
      tools.splice(to, 0, tools.splice(from, 1)[0]);
      return new UpdateTestCaseDetailsForm({
        ...testCaseDetails,
        currentTestCaseStepVersion : {
          ...testCaseDetails.currentTestCaseStepVersion,
          testCaseStepTools: [
            ...(testCaseDetails.currentTestCaseStepVersion.testCaseStepTools || []),
          ]
        }
      });
    });
  @Effect() reorderTestStepTools$: Observable<Action> = this.actions$
    .ofType(toolActionTypes.REORDER_TEST_STEP_TOOLS)
    .withLatestFrom(this.store.select(testStepDetailsSelector))
    .map(([action, testStepDetails]) => {
      const { from, to } = <ReorderTestStepTools>action;
      const tools: Tool[] = testStepDetails.currentTestCaseStepVersion['testCaseStepTools'];
      tools.splice(to, 0, tools.splice(from, 1)[0]);
      return new UpdateTestCaseDetailsForm({
        ...testStepDetails,
        currentTestCaseStepVersion : {
          ...testStepDetails.currentTestCaseStepVersion,
          testCaseStepTools: [
            ...(testStepDetails.currentTestCaseStepVersion.testCaseStepTools || []),
          ]
        }
      });
    });

  @Effect() deleteTestCaseTools$: Observable<Action> = this.actions$
    .ofType(toolActionTypes.DELETE_TEST_CASE_TOOLS)
    .withLatestFrom(this.store.select(testCaseDetailsSelector))
    .map(([action, testCaseDetails]) => {
      const tools: Tool[] = testCaseDetails.currentTestCaseStepVersion['testCaseStepTools'];
      tools.splice((<DeleteTestCaseTools>action).tool, 1);
      return new UpdateTestCaseDetailsForm({
        ...testCaseDetails,
        currentTestCaseStepVersion : {
          ...testCaseDetails.currentTestCaseStepVersion,
          testCaseStepTools: [
            ...(testCaseDetails.currentTestCaseStepVersion.testCaseStepTools || []),
          ]
        }
      });
    });
  @Effect() deleteTestStepTools$: Observable<Action> = this.actions$
    .ofType(toolActionTypes.DELETE_TEST_STEP_TOOLS)
    .withLatestFrom(this.store.select(testStepDetailsSelector))
    .map(([action, testStepDetails]) => {
      const tools: Tool[] = testStepDetails.currentTestCaseStepVersion['testCaseStepTools'];
      tools.splice((<DeleteTestStepTools>action).tool, 1);
      return new UpdateTestCaseDetailsForm({
        ...testStepDetails,
        currentTestCaseStepVersion : {
          ...testStepDetails.currentTestCaseStepVersion,
          testCaseStepTools: [
            ...(testStepDetails.currentTestCaseStepVersion.testCaseStepTools || []),
          ]
        }
      });
    });

}
