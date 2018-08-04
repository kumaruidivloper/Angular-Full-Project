import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from './session-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SessionStorageService]
})
export class StorageModule { }
