import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooleanToYesNoPipe} from './boolean-to-yes-no.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BooleanToYesNoPipe],
  exports: [BooleanToYesNoPipe]
})
export class BooleanToYesNoModule { }
