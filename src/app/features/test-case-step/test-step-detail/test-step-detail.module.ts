import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestStepDetailActionMenuComponent } from './test-step-detail-action-menu/test-step-detail-action-menu.component';
import { TestStepDetailComponent } from './test-step-detail.component';
import { TestStepDetailService } from './test-step-detail.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { testStepDetailsFeatureName, testStepDetailsReducer } from './test-step-detail.reducer';
import { TestStepDetailsEffects } from './test-step-detail.effect';
import { LoadingModule } from 'ngx-loading';
import {MainMenuModule} from '../../../core/components/main-menu/main-menu.module';
import {BreadcrumbsModule} from '../../../core/components/breadcrumbs/breadcrumbs.module';
import {UserGroupModule} from '../../../core/components/test-team/user-group/user-group.module';
import {UserSiteModule} from '../../../core/components/test-team/user-site/user-site.module';
import {VariantModule} from '../../../shared/variant/variant.module';
import {ToolModule} from '../../../shared/tool/tool.module';
import {TagModule} from '../../../shared/tag/tag.module';
import {NgrxFormConnectModule} from '../../../core/util/ngrx-form-connect/ngrx-form-connect.module';
import {FileUploadService} from '../../../core/services/file-upload/file-upload.service';
import {PreventUnsavedChangesGuard} from '../../../core/guards/prevent-unsaved-changes-guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainMenuModule,
    BreadcrumbsModule,
    UserGroupModule,
    UserSiteModule,
    VariantModule,
    ToolModule,
    TagModule,
    StoreModule.forFeature(testStepDetailsFeatureName, testStepDetailsReducer),
    EffectsModule.forFeature([TestStepDetailsEffects]),
    LoadingModule,
    NgrxFormConnectModule
  ],
  declarations: [TestStepDetailComponent, TestStepDetailActionMenuComponent],
  providers: [TestStepDetailService, PreventUnsavedChangesGuard, FileUploadService]
})

export class TestStepDetailsModule { }
