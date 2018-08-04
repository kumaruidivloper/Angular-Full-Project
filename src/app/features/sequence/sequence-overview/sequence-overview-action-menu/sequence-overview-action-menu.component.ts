import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClearSequenceTableFilters } from '../sequence-overview.action';
import { SequenceOverviewState } from '../sequence-overview.reducer';
import { Store } from '@ngrx/store';
import { SessionStorageService } from '../../../../core/storage/session-storage.service';


@Component({
  selector: 'tm-sequence-overview-action-menu',
  templateUrl: './sequence-overview-action-menu.component.html',
  styleUrls: ['./sequence-overview-action-menu.component.scss']
})
export class SequenceOverviewActionMenuComponent {
  @Input() disableUpdateSequence: boolean;
  @Input() disableCreateSequence: boolean;
  @Input() data: any;
  @Input() sequenceTestTeam: any;
  @Output() clearFilterDropDown: EventEmitter<boolean> = new EventEmitter();
  constructor(private store: Store<SequenceOverviewState>,
              private sessionStorageService: SessionStorageService) { }

  clearSequenceFilters(): void {
    this.clearFilterDropDown.emit(true);
    this.store.dispatch(new ClearSequenceTableFilters());
  }

  setSelectedUserGroupSite() {
    this.sessionStorageService.setItem('userGroup', this.sequenceTestTeam.groupId);
    this.sessionStorageService.setItem('userSite', this.sequenceTestTeam.siteId);
  }
}
