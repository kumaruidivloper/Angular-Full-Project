import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { appReducer, AppState } from './app.reducer';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseUrlInterceptor } from './core/interceptors/base-url-interceptor';
import { EffectsModule } from '@ngrx/effects';
import { BreadcrumbsModule } from './core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from './core/components/main-menu/main-menu.module';
import { RouterSerialiser } from './core/util/router-serialiser';
import { environment } from '../environments/environment';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { LoginModule } from './features/login/login.module';
import { ProceduresService } from './features/procedure/procedures.service';
import { NgNotifyPopup, NotificationService } from 'ng2-notify-popup';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpModule,
    BreadcrumbsModule,
    MainMenuModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(appReducer, { metaReducers }),
    StoreDevtoolsModule.instrument(<StoreDevtoolsOptions>{
      maxAge: 25
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    HttpClientModule,
    LoginModule,
    NgNotifyPopup
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: RouterSerialiser },
    ProceduresService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
