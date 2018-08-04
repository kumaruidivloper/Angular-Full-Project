
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SequenceListComponent} from './sequence-list.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from '../../../../../core/components/table/table.module';
import {SequenceListService} from './sequence-list.service';
import {sequenceListingFeatureName, sequenceListingReducer} from './sequence-list.reducer';
import {StoreModule} from '@ngrx/store';
import {SequenceListingEffects} from './sequence-list.effects';
import {EffectsModule} from '@ngrx/effects';
import {FormsModule} from '@angular/forms';
import {BooleanToYesNoModule} from '../../../../../core/pipes/boolean-to-yes-no/boolean-to-yes-no.pipe.module';
const components = [SequenceListComponent];

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    NgbModalModule,
    StoreModule.forFeature(sequenceListingFeatureName, sequenceListingReducer ),
    EffectsModule.forFeature([SequenceListingEffects]),
    FormsModule,
    BooleanToYesNoModule,
    NgbModule.forRoot()
  ],
  declarations: components,
  exports: components,
  providers: [SequenceListService]
})

export class SequenceListModule { }
