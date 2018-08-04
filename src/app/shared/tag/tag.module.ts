import { NgModule } from '@angular/core';
import { TableModule } from '../../core/components/table/table.module';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { TagComponent} from './tag.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {tagComponentFeatureName, tagComponentReducer} from './tag.reducer';
import {TagComponentEffects} from './tag.effects';
import {TagComponentService} from './tag.service';

const components = [TagComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    TableModule,
    NgbModalModule,
    FormsModule,
    StoreModule.forFeature(tagComponentFeatureName, tagComponentReducer ),
    EffectsModule.forFeature([TagComponentEffects]),
    NgbModule.forRoot()
  ],
  providers: [TagComponentService]
})
export class TagModule {}
