import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TestProgressOverviewState } from '../test-progress-overview.reducer';
import { ClearTableFilters, DeleteSelected } from '../test-progress-overview.action';
import { SessionStorageService } from '../../../../core/storage/session-storage.service';
import { Filter } from '../../../../core/interfaces/filter.model';

@Component({
  selector: 'tm-test-progress-overview-action-menu',
  templateUrl: './test-progress-overview-action-menu.component.html',
  styleUrls: ['./test-progress-overview-action-menu.component.scss']
})
export class TestProgressOverviewActionMenuComponent implements OnInit {
  filters: Observable<Filter[]>;
  @Input() disableCreateTask: Boolean;
  @Input() disableUpdateTestProgress: Boolean;
  @Input() removedButtonForReader: Boolean;
  @Input() disableCreateTest: boolean;
  @Input() testId: number;
  @Input() testTeam: any;

  @Output() clearFilterDropDown: EventEmitter<boolean> = new EventEmitter();
  @Output() createNew: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store<TestProgressOverviewState>,
              private sessionStorageService: SessionStorageService) { }

  ngOnInit() { this.testId = 0; }

  clearFilters(): void {
    this.store.dispatch(new ClearTableFilters());
    this.clearFilterDropDown.emit(true);
  }

  deleteSelected(): void {
    this.store.dispatch(new DeleteSelected([]));
  }

  getSelectedTestTeam() {
    this.sessionStorageService.setItem('userGroup', this.testTeam.groupId);
    this.sessionStorageService.setItem('userSite', this.testTeam.siteId);
  }
  onCreate() {
    this.createNew.emit(true);
  }
}

