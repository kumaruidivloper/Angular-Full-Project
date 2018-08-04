import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, } from '@ngrx/store';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { TableModule } from '../../../core/components/table/table.module';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ReportsComponent } from './reports.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ReportsActionMenuComponent } from './reports-action-menu/reports-action-menu.component';
import { ReportsActionMenuModule } from './reports-action-menu/reports-action-menu.module';
import { ReportsService } from './reports.service';
import { ReportsEffects } from './reports.effects';
import { reportsFeatureName, reportsReducer } from './reports.reducer';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { TestDetailsService } from '../../test/test-details/test-details.service';
import { TestDetailsEffects } from '../../test/test-details/test-details.effects';
import { testDetailsFeatureName, testDetailsReducer } from '../../test/test-details/test-details.reducer';
import { DateHandlerService } from '../../../core/services/date/date-handler.service';
import {
  testCaseDetailsFeatureName,
  testCaseDetailsReducer
} from '../../test-case-step/test-case-detail/test-case-detail.reducer';
import { TestCaseDetailsEffects } from '../../test-case-step/test-case-detail/test-case-detail.effect';
import { RoutineDetailsEffects } from '../../routine/routine-details/routine-details.effects';
import {
  routineDetailsFeatureName,
  routineDetailsReducer
} from '../../routine/routine-details/routine-details.reducer';
import { TestStepDetailService } from '../../test-case-step/test-step-detail/test-step-detail.service';
import { TestCaseDetailService } from '../../test-case-step/test-case-detail/test-case-detail.service';
import { RoutineDetailsService } from '../../routine/routine-details/routine-details.service';
import {
  testStepDetailsFeatureName,
  testStepDetailsReducer
} from '../../test-case-step/test-step-detail/test-step-detail.reducer';
import { TestStepDetailsEffects } from '../../test-case-step/test-step-detail/test-step-detail.effect';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    BreadcrumbsModule,
    MainMenuModule,
    FormsModule,
    TranslateModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgxMyDatePickerModule.forRoot(),
    MyDateRangePickerModule,
    StoreModule.forFeature(reportsFeatureName, reportsReducer),
    EffectsModule.forFeature([
      ReportsEffects,
      TestDetailsEffects,
      TestCaseDetailsEffects,
      RoutineDetailsEffects,
      TestStepDetailsEffects
    ]),
    StoreModule.forFeature(testDetailsFeatureName, testDetailsReducer),
    StoreModule.forFeature(testCaseDetailsFeatureName, testCaseDetailsReducer),
    StoreModule.forFeature(testStepDetailsFeatureName, testStepDetailsReducer),
    StoreModule.forFeature(routineDetailsFeatureName, routineDetailsReducer),
    UserSiteModule,
    UserGroupModule,
    ReportsActionMenuModule,
    UserGroupModule,
    LoadingModule
  ],
  declarations: [ ReportsComponent, ReportsActionMenuComponent ],
  providers: [
    PreventUnsavedChangesGuard,
    ReportsService,
    TestDetailsService,
    DateHandlerService,
    TestStepDetailService,
    TestCaseDetailService,
    RoutineDetailsService
  ],
})

export class ReportsModule {

}
