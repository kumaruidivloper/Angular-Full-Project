
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserGroupComponent} from './user-group.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UserGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UserGroupComponent]
})
export class UserGroupModule {}

