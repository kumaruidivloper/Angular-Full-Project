import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent} from './home.component';
import { SessionStorageService} from '../../core/storage/session-storage.service';
import { MainMenuModule } from '../../core/components/main-menu/main-menu.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainMenuModule
  ],
  declarations: [HomeComponent],
  providers: [SessionStorageService]
})
export class HomeModule { }
