import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageModule } from './storage/storage.module';
import { MainMenuModule } from './components/main-menu/main-menu.module';
import { BreadcrumbsModule } from './components/breadcrumbs/breadcrumbs.module';
import { UserService } from './services/user/user.service';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './services/user/user.effects';
import { StoreModule } from '@ngrx/store';
import { userFeatureName, userReducer } from './services/user/user.reducer';
import { UserSiteModule } from './components/test-team/user-site/user-site.module';
import { UserGroupModule } from './components/test-team/user-group/user-group.module';
import { NgrxFormConnectModule } from './util/ngrx-form-connect/ngrx-form-connect.module';
import { TranslationService } from './services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationEffects } from './services/translation/translation.effects';
import { translationFeatureName, translationReducer } from './services/translation/translation.reducer';
import { SecurityService } from './services/security/security.service';
import { TokenService } from './services/security/token.service';
import { UserLoginService } from './services/security/user.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SecurityEffects } from './services/security/security.effects';
import {securityFeatureName, securityReducer} from './services/security/security.reducer';

@NgModule({
  imports: [
    CommonModule,
    StorageModule,
    MainMenuModule,
    BreadcrumbsModule,
    TranslateModule.forRoot(),
    EffectsModule.forFeature([UserEffects, TranslationEffects, SecurityEffects]),
    StoreModule.forFeature(userFeatureName, userReducer),
    StoreModule.forFeature(securityFeatureName, securityReducer),
    StoreModule.forFeature(translationFeatureName, translationReducer),
    UserSiteModule,
    UserGroupModule,
    NgrxFormConnectModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    UserService,
    TranslationService,
    TokenService,
    UserLoginService,
    SecurityService
  ],
  declarations: []
})
export class CoreModule { }
