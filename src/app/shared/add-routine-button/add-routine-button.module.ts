import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoutineButtonComponent } from './add-routine-button.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from '../../core/components/table/table.module';
import { FormsModule } from '@angular/forms';
import { BooleanToYesNoModule } from '../../core/pipes/boolean-to-yes-no/boolean-to-yes-no.pipe.module';
import { OptionsFromEnumModule } from '../../core/pipes/options-from-enum/options-from-enum.module';
import { RoutineOverviewModule } from '../../features/routine/routine-overview/routine-overview.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    TableModule,
    FormsModule,
    BooleanToYesNoModule,
    RoutineOverviewModule,
    OptionsFromEnumModule
  ],
  declarations: [AddRoutineButtonComponent],
  exports: [AddRoutineButtonComponent]
})
export class AddRoutineButtonModule { }
