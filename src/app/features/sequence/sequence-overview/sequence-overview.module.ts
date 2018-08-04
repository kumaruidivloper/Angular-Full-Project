import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceOverviewComponent } from './sequence-overview.component';
import {SequenceOverviewActionMenuModule} from './sequence-overview-action-menu/sequence-overview-action-menu.module';
import {SequenceOverviewRoutingModule} from './sequence-overview.routing.module';
import {MainMenuModule} from '../../../core/components/main-menu/main-menu.module';
import {TableModule} from '../../../core/components/table/table.module';
import {BreadcrumbsModule} from '../../../core/components/breadcrumbs/breadcrumbs.module';
import {sequenceOverviewFeatureName, sequenceOverviewReducer} from './sequence-overview.reducer';
import {SequenceOverviewEffects} from './sequence-overview.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {SequenceOverviewService} from './sequence-overview.service';
import {FormsModule} from '@angular/forms';
import { UserGroupModule} from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule} from '../../../core/components/test-team/user-site/user-site.module';
import {SequenceDetailsModule} from '../sequence-details/sequence-details.module';
import {BooleanToYesNoModule} from '../../../core/pipes/boolean-to-yes-no/boolean-to-yes-no.pipe.module';
import {PreventUnsavedChangesGuard} from '../../../core/guards/prevent-unsaved-changes-guard';
@NgModule({
  imports: [
    CommonModule,
    SequenceOverviewActionMenuModule,
    SequenceOverviewRoutingModule,
    BreadcrumbsModule,
    TableModule,
    MainMenuModule,
    StoreModule.forFeature(sequenceOverviewFeatureName, sequenceOverviewReducer),
    EffectsModule.forFeature([SequenceOverviewEffects]),
    FormsModule,
    UserGroupModule,
    UserSiteModule,
    SequenceDetailsModule,
    BooleanToYesNoModule
  ],
  declarations: [SequenceOverviewComponent],
  providers: [SequenceOverviewService, PreventUnsavedChangesGuard]
})
export class SequenceOverviewModule { }
