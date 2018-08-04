import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgrxFormConnectDirective} from './ngrx-form-connect.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgrxFormConnectDirective],
  exports: [NgrxFormConnectDirective]
})
export class NgrxFormConnectModule { }
