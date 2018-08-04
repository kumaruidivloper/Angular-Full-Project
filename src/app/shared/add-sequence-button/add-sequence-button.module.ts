import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSequenceButtonComponent } from './add-sequence-button.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from '../../core/components/table/table.module';
import { FormsModule } from '@angular/forms';
import { BooleanToYesNoModule } from '../../core/pipes/boolean-to-yes-no/boolean-to-yes-no.pipe.module';
import { OptionsFromEnumModule } from '../../core/pipes/options-from-enum/options-from-enum.module';
import { SequenceOverviewModule } from '../../features/sequence/sequence-overview/sequence-overview.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    TableModule,
    FormsModule,
    BooleanToYesNoModule,
    SequenceOverviewModule,
    OptionsFromEnumModule
  ],
  declarations: [AddSequenceButtonComponent],
  exports: [AddSequenceButtonComponent]
})
export class AddSequenceButtonModule { }
