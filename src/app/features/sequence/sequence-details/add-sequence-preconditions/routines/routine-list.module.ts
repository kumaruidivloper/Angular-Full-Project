import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from '../../../../../core/components/table/table.module';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {RoutineListComponent} from './routine-list.component';
import {routineListFeatureName, routineListReducer} from './routine-list.reducer';
import {RoutineListEffects} from './routine-list.effects';
import {RoutineListService} from './routine-list.service';

const components = [RoutineListComponent];
@NgModule({
  imports: [
    CommonModule,
    TableModule,
    NgbModule,
    StoreModule.forFeature(routineListFeatureName, routineListReducer),
    EffectsModule.forFeature([RoutineListEffects]),
    FormsModule
  ],
  declarations: components,
  exports: components,
  providers: [RoutineListService]
})
export class RoutineListModule { }
