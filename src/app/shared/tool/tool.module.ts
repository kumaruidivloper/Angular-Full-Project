import { NgModule } from '@angular/core';
import { TableModule } from '../../core/components/table/table.module';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ToolsComponent} from './tool.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ToolComponentService} from './tool.service';
import {toolComponentFeatureName, toolComponentReducer} from './tool.reducer';
import {ToolComponentEffects} from './tool.effects';

const components = [ToolsComponent];


@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    TableModule,
    NgbModalModule,
    FormsModule,
    StoreModule.forFeature(toolComponentFeatureName, toolComponentReducer ),
    EffectsModule.forFeature([ToolComponentEffects]),
    NgbModule.forRoot()
  ],
  providers: [ToolComponentService]
})
export class ToolModule {}
