import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OptionsFromEnumPipe} from './options-from-enum.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OptionsFromEnumPipe],
  exports: [OptionsFromEnumPipe]
})
export class OptionsFromEnumModule { }
