import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TableModule} from '../../../../../core/components/table/table.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TestCaseStepListService} from './test-case-step.service';
import {TestCaseStepListEffects} from './test-case-step.effects';
import {TestCaseStepListFeatureName, TestCaseStepListReducer} from './test-case-step.reducer';
import {TestCaseStepListComponent} from './test-case-step.component';
import {BooleanToYesNoModule} from '../../../../../core/pipes/boolean-to-yes-no/boolean-to-yes-no.pipe.module';
import {TestCaseDetailService} from '../../../../test-case-step/test-case-detail/test-case-detail.service';
const components = [TestCaseStepListComponent];
@NgModule({
  imports: [
    CommonModule,
    TableModule,
    StoreModule.forFeature(TestCaseStepListFeatureName, TestCaseStepListReducer),
    EffectsModule.forFeature([TestCaseStepListEffects]),
    FormsModule,
    BooleanToYesNoModule
  ],
  declarations: components,
  exports: components,
  providers: [TestCaseStepListService, TestCaseDetailService]
})
export class TestCaseStepListModule { }
