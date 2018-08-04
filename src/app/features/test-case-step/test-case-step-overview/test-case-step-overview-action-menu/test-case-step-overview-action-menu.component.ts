import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClearTestCaseStepTableFilters } from '../test-case-step-overview.actions';
import { Store } from '@ngrx/store';
import { TestCaseStepOverviewState } from '../test-case-step-overview.reducer';
import { SessionStorageService } from '../../../../core/storage/session-storage.service';

@Component({
  selector: 'tm-test-case-step-overview-action-menu',
  templateUrl: './test-case-step-overview-action-menu.component.html',
  styleUrls: ['./test-case-step-overview-action-menu.component.scss']
})
export class TestCaseStepOverviewActionMenuComponent {
  @Input() disableUpdateTestCaseStep: boolean;
  @Input() disableCreateTestCaseStep: boolean;
  @Input() data: any;
  @Input() routingData: boolean;
  @Output() clearFilterDropDown: EventEmitter<boolean> = new EventEmitter();
  @Input() testTeam: any;
  constructor(private store: Store<TestCaseStepOverviewState>,
              private sessionStorageService: SessionStorageService) { }

  clearTestCaseStepTableFilters(): void {
    this.clearFilterDropDown.emit(true);
    this.store.dispatch(new ClearTestCaseStepTableFilters());
  }
  getSelectedTestTeam() {
    this.sessionStorageService.setItem('userGroup', this.testTeam.groupId);
    this.sessionStorageService.setItem('userSite', this.testTeam.siteId);
  }
}
