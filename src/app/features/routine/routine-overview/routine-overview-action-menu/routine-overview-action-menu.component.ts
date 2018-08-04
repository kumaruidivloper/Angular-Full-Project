import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ClearTableFilters } from '../routine-overview.action';
import { SessionStorageService } from '../../../../core/storage/session-storage.service';
import { RoutineOverviewState } from '../routine-overview.reducer';
import { Filter } from '../../../../core/interfaces/filter.model';

@Component({
  selector: 'tm-routine-overview-action-menu',
  templateUrl: './routine-overview-action-menu.component.html',
  styleUrls: ['./routine-overview-action-menu.component.scss']
})
export class RoutineOverviewActionMenuComponent {

  filters:  Observable<Filter[]>;
  @Input() disableUpdateRoutine: Boolean;
  @Input() disableCreateRoutine: Boolean;
  @Input() data: any;
  @Input() routineTestTeam: any;

  @Output() clearFilterDropDown: EventEmitter<boolean> = new EventEmitter();
  constructor(private store: Store<RoutineOverviewState>,
              private sessionStorageService: SessionStorageService) { }

  clearFilters(): void {
    this.store.dispatch(new ClearTableFilters());
    this.clearFilterDropDown.emit(true);
  }

  getSelectedRoutine() {
    this.sessionStorageService.setItem('userGroup', this.routineTestTeam.groupId);
    this.sessionStorageService.setItem('userSite', this.routineTestTeam.siteId);
  }
}
