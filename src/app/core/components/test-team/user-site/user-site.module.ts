
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserSiteComponent} from './user-site.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UserSiteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UserSiteComponent]
})
export class UserSiteModule {}

