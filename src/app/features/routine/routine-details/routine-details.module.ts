import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { routineDetailsFeatureName, routineDetailsReducer } from './routine-details.reducer';
import { RoutineDetailsComponent } from './routine-details.component';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { TableModule } from '../../../core/components/table/table.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { RoutineDetailsEffects } from './routine-details.effects';
import { EffectsModule } from '@ngrx/effects';
import { RoutineDetailsService } from './routine-details.service';
import { RoutineDetailsActionMenuModule } from './routine-details-action-menu/routine-details-action-menu.module';
// import { RoutineDetailsActivitiesModule } from './routine-details-activities/routine-details-activities.module';
import { OptionsFromEnumModule } from '../../../core/pipes/options-from-enum/options-from-enum.module';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import {LoadingModule} from 'ngx-loading';
import {FileUploadService} from '../../../core/services/file-upload/file-upload.service';
import {NgrxFormConnectModule} from '../../../core/util/ngrx-form-connect/ngrx-form-connect.module';
import {PreventUnsavedChangesGuard} from '../../../core/guards/prevent-unsaved-changes-guard';


@NgModule({
  imports: [
    CommonModule,
    BreadcrumbsModule,
    TableModule,
    StoreModule.forFeature(routineDetailsFeatureName, routineDetailsReducer),
    MainMenuModule,
    EffectsModule.forFeature([RoutineDetailsEffects]),
    ReactiveFormsModule,
    NgbModule.forRoot(),
    FormsModule,
    RoutineDetailsActionMenuModule,
    OptionsFromEnumModule,
    // RoutineDetailsActivitiesModule,
    UserGroupModule,
    UserSiteModule,
    LoadingModule,
    NgrxFormConnectModule
  ],
  declarations: [RoutineDetailsComponent],
  providers: [ RoutineDetailsService, FileUploadService, PreventUnsavedChangesGuard]
})
export class RoutineDetailsModule { }
