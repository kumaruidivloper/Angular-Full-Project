import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { UserRoleComponent } from './user-role.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ UserRoleComponent ]
})
export class UserRoleModule {}

