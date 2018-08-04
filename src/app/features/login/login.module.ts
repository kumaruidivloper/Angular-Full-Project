import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer, loginFeatureName } from './login.reducer';
import { LoginService } from './login.service';
import { LoginEffects } from './login.effects';
import { FormsModule } from '@angular/forms';
import {MainMenuModule} from '../../core/components/main-menu/main-menu.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    StoreModule.forFeature(loginFeatureName, loginReducer),
    EffectsModule.forFeature([LoginEffects]),
    MainMenuModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
