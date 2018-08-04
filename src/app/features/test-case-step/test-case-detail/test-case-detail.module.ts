import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { TagModule } from '../../../shared/tag/tag.module';
import { ToolModule } from '../../../shared/tool/tool.module';
import { VariantModule } from '../../../shared/variant/variant.module';
import { TestCaseDetailActionMenuComponent } from './test-case-detail-action-menu/test-case-detail-action-menu.component';
import { TestCaseDetailComponent } from './test-case-detail.component';
import { TestCaseDetailService } from './test-case-detail.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { testCaseDetailsFeatureName, testCaseDetailsReducer } from './test-case-detail.reducer';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { TestCaseDetailsEffects } from './test-case-detail.effect';
import { LoadingModule } from 'ngx-loading';

import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import { NgrxFormConnectModule } from '../../../core/util/ngrx-form-connect/ngrx-form-connect.module';

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
    StoreModule.forFeature(testCaseDetailsFeatureName, testCaseDetailsReducer),
    EffectsModule.forFeature([TestCaseDetailsEffects]),
    LoadingModule,
    NgrxFormConnectModule
  ],
  declarations: [TestCaseDetailComponent, TestCaseDetailActionMenuComponent],
  providers: [TestCaseDetailService, PreventUnsavedChangesGuard, FileUploadService]
})
export class TestCaseDetailsModule { }
