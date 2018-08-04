
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddSequencePreconditionsComponent} from './add-sequence-preconditions.component';
import {RoutineListModule} from './routines/routine-list.module';
import {SequenceListModule} from './sequences/sequence-list.module';
import {TestCaseStepListModule} from './test-case-step/test-case-step.module';
import {TableModule} from '../../../../core/components/table/table.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const components = [AddSequencePreconditionsComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RoutineListModule,
    SequenceListModule,
    TestCaseStepListModule,
    TableModule,
    NgbModule.forRoot()
  ]
})

export class AddSequencePreconditionsModule { }
