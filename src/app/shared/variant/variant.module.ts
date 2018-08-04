import { NgModule } from '@angular/core';
import { TableModule } from '../../core/components/table/table.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VariantComponent} from './variant.component';
import { VariantActionMenuComponent } from './variant-action-menu/variant-action-menu.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VariantComponentService } from './variant.service';
import { variantComponentFeatureName, variantComponentReducer } from './variant.reducer';
import { VariantComponentEffects } from './variant.effects';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const components = [VariantComponent, VariantActionMenuComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    TableModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(variantComponentFeatureName, variantComponentReducer ),
    EffectsModule.forFeature([VariantComponentEffects]),
  ],
  providers: [VariantComponentService]
})
export class VariantModule {}
