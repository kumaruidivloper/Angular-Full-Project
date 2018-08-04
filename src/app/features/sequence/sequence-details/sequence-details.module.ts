import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';
import { SequenceDetailsComponent } from './sequence-details.component';
import { SequenceDetailsActionMenuComponentModule } from './sequence-details-action-menu/sequence-details-action-menu.module';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { SequenceDetailsService } from './sequence-details.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SequenceDetailsEffects } from './sequence-details.effects';
import { sequenceDetailsFeatureName, sequenceDetailsReducer } from './sequence-details.reducer';
import { AddSequencePreconditionsModule } from './add-sequence-preconditions/add-sequence-preconditions.module';
import { NgrxFormConnectModule } from '../../../core/util/ngrx-form-connect/ngrx-form-connect.module';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainMenuModule,
    BreadcrumbsModule,
    UserGroupModule,
    UserSiteModule,
    SequenceDetailsActionMenuComponentModule,
    StoreModule.forFeature(sequenceDetailsFeatureName, sequenceDetailsReducer),
    EffectsModule.forFeature([SequenceDetailsEffects]),
    AddSequencePreconditionsModule,
    NgrxFormConnectModule,
    LoadingModule,
  ],
  declarations: [SequenceDetailsComponent],
  providers: [
    PreventUnsavedChangesGuard,
    SequenceDetailsService
    ]
})
export class SequenceDetailsModule { }
