import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TestOverviewState } from '../test-overview.reducer';
import { ClearTableFilters, DeleteSelected } from '../test-overview.actions';
import { SessionStorageService } from '../../../../core/storage/session-storage.service';
import { Filter } from '../../../../core/interfaces/filter.model';

@Component({
  selector: 'tm-test-overview-action-menu',
  templateUrl: './test-overview-action-menu.component.html',
  styleUrls: ['./test-overview-action-menu.component.scss']
})
export class TestOverviewActionMenuComponent implements OnInit {
  filters: Observable<Filter[]>;
  @Input() disableCreateTask: Boolean;
  @Input() disableUpdateTest: Boolean;
  @Input() disableCreateTest: boolean;
  @Input() data: any;
  @Input() testTeam: any;

  @Output() clearFilterDropDown: EventEmitter<boolean> = new EventEmitter();
  @Output() createNew: EventEmitter<boolean> = new EventEmitter();

  constructor(private store: Store<TestOverviewState>,
              private sessionStorageService: SessionStorageService) { }

  ngOnInit() {}

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
