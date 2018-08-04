import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RoutineOverviewComponent } from './routine-overview.component';
import { RoutineOverviewRoutingModule } from './routine-overview.routing.module';
import { RoutineOverviewService } from './routine-overview.service';
import { TableModule } from '../../../core/components/table/table.module';
import { RoutineOverviewEffects } from './routine-overview.effects';
import { RoutineDetailsModule } from '../routine-details/routine-details.module';
import { StoreModule } from '@ngrx/store';
import { routineOverviewFeatureName, routineOverviewReducer } from './routine-overview.reducer';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { RoutineOverviewActionMenuModule } from './routine-overview-action-menu/routine-overview-action-menu.module';
import { UserGroupModule } from '../../../core/components/test-team/user-group/user-group.module';
import { UserSiteModule } from '../../../core/components/test-team/user-site/user-site.module';

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbsModule,
    TableModule,
    NgbModule,
    RoutineDetailsModule,
    RoutineOverviewRoutingModule,
    StoreModule.forFeature(routineOverviewFeatureName, routineOverviewReducer),
    EffectsModule.forFeature([RoutineOverviewEffects]),
    BreadcrumbsModule,
    MainMenuModule,
    RoutineOverviewActionMenuModule,
    FormsModule,
    UserGroupModule,
    UserSiteModule
  ],
  declarations: [RoutineOverviewComponent],
  providers: [RoutineOverviewService, PreventUnsavedChangesGuard]
})
export class RoutineOverviewModule { }
