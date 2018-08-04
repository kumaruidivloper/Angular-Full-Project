import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { BreadcrumbsModule } from '../../../core/components/breadcrumbs/breadcrumbs.module';
import { MainMenuModule } from '../../../core/components/main-menu/main-menu.module';
import { TableModule } from '../../../core/components/table/table.module';
import { PreventUnsavedChangesGuard } from '../../../core/guards/prevent-unsaved-changes-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TestProgressDetailsComponent } from './test-progress-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    BreadcrumbsModule,
    MainMenuModule,
    FormsModule,
    TranslateModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [ TestProgressDetailsComponent ],
  providers: [ PreventUnsavedChangesGuard ],
})

export class TestProgressDetailsModule {

}
