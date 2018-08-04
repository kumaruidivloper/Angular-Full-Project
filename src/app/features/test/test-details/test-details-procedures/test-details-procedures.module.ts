import { NgModule } from '@angular/core';
import { TestDetailsProceduresComponent } from './test-details-procedures.component';
import { StoreModule } from '@ngrx/store';
import { testDetailsProceduresFeatureName, testDetailsProceduresReducer } from './test-details-procedures.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestDetailsProceduresEffects } from './test-details-procedures.effects';
import { TableModule } from '../../../../core/components/table/table.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const components = [TestDetailsProceduresComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    StoreModule.forFeature(testDetailsProceduresFeatureName, testDetailsProceduresReducer),
    EffectsModule.forFeature([TestDetailsProceduresEffects]),
    TableModule,
    NgbModalModule,
    FormsModule
  ]
})
export class TestDetailsProceduresModule {}
