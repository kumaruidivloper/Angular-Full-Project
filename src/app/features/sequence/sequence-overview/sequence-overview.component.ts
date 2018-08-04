import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pick } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { User, UserGroup, UserSite } from '../../../core/services/user/user.model';
import { Sequence } from './sequence-overview.model';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import {
  filtersSelector,
  paginationSelector,
  SequenceOverviewState,
  sequenceSelector,
  sortSelector
} from './sequence-overview.reducer';

import {
  ClearSequenceFilters,
  FiltersOnPageLoad,
  PaginateSequence,
  SelectSequence,
  SortSequence,
  UpdateSequenceFilters
} from './sequence-overview.action';
import { accessTokenSelector } from '../../login/login.reducer';
import { SortOptions } from '../../../core/interfaces/sort.i';
import { groupsSelector, sitesSelector, userSelector } from '../../../core/services/user/user.reducer';
import { Filter } from '../../../core/interfaces/filter.model';
import {TryUserLogin} from '../../login/login.actions';


@Component({
  selector: 'tm-sequence-overview',
  templateUrl: './sequence-overview.component.html',
  styleUrls: ['./sequence-overview.component.scss']
})
export class SequenceOverviewComponent implements OnInit, OnDestroy {
  public sequence$: Observable<Sequence[]>;
  public paginationParameters$: Observable<PaginationParameters>;
  public filters$: Observable<any>;
  public sort$: Observable<SortOptions | undefined>;
  private selectAll: string = 'ALL';
  public user$: Observable<User>;
  public sites$: Observable<UserSite[]>;
  public userGroups$: Observable<UserGroup[]>;
  public itemsPerPage = [10, 20, 30];
  public categorySelection = [this.selectAll, 'STANDARD', 'DEVELOPMENT'];
  public isPrivateSelector = [{id: this.selectAll, value: this.selectAll}, { id: 'YES', value: 'true'}, {id: 'NO', value: 'false'}];
  public isCreateDisabled: boolean = true;
  public isUpdateDisabled: boolean = true;
  public selectedTeamData = {};
  public defaultSelectionCategory: string = this.selectAll;
  public defaultSelectionPrivate: string = this.selectAll;
  public onChangeTestTeamFilter: Boolean = false;
  public disabledCreate: Boolean = false;
  public sequenceById: number;
  public initalTestLoadFilter = {};

  constructor(private store: Store<SequenceOverviewState>,
              public router: Router) { }

  onSortChange(field: string): void {
    this.store.dispatch(new SortSequence(field));
  }

  onPaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateSequence(paginationParameters));
    // this.store.dispatch(new UpdateSequenceFilters(this.selectedTeamData)); @todo figure out if this is needed
  }

  onFilterChange(filter: Filter): void {
    this.store.dispatch(new UpdateSequenceFilters(filter));
  }

  onChangeTestTeam(value: string, filterFrom: string): void {
    if (value === this.selectAll) {
      this.isCreateDisabled = true;
      delete this.selectedTeamData[filterFrom];
    } else {
      this.selectedTeamData[filterFrom] = value;
    }
    this.onChangeTestTeamFilter = true;
    this.isUpdateDisabled = true;
  }

  onChangeEmit() {
    // this.disabledCreate = !(this.selectedTeamData.hasOwnProperty('groupId')
    //   && this.selectedTeamData.hasOwnProperty('siteId'));
    //
    // this.store.dispatch(new UpdateSequenceFilters(this.selectedTeamData));
  }

  onTestTeamGroup(value) {
    this.onChangeTestTeam(value, 'groupId');
  }
  onTestTeamSite(value) {
    this.onChangeTestTeam(value, 'siteId');
  }
  onFilterSelect(value: string, fromSelector: string): void {
    this.onChangeTestTeamFilter = true;
    this.isUpdateDisabled = true;
    this.selectedTeamData[fromSelector] = value !== this.selectAll ? value : '';
    // this.store.dispatch(new UpdateSequenceFilters(this.selectedTeamData));
  }

  onClearFilterDropDown(event: string): void {
    this.onChangeTestTeamFilter = true;
    this.isUpdateDisabled = true;
    if (event) {
      this.defaultSelectionCategory = this.defaultSelectionPrivate = this.selectAll;
      this.selectedTeamData = pick(this.selectedTeamData, ['siteId', 'groupId']);
    }
  }
  onRowAction(sequence: Sequence) {
    this.router.navigate(['sequence', 'details', sequence.id]);
  }

  // @TODO: need to find good solution for this defect TM-271
  onRowSelect(sequence: Sequence): void {
    if (sequence) {
      this.isUpdateDisabled = false;
      this.sequenceById = sequence.id;
      this.store.dispatch(new SelectSequence(sequence));
    } else {
      this.isUpdateDisabled = true;
    }

  }
  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.sequence$ = this.store.select(sequenceSelector);
    this.paginationParameters$ = this.store.select(paginationSelector);
    this.sort$ = this.store.select(sortSelector);
    this.userGroups$ = this.store.select(groupsSelector);
    this.sites$ = this.store.select(sitesSelector);
    this.user$ = this.store.select(userSelector);
    this.filters$ = this.store.select(filtersSelector);
    // this.store.select(accessTokenSelector)
    //       .subscribe(token => {
    //         token && this.store.dispatch(new LoadSequences());
    //       });

    Observable.combineLatest(this.userGroups$,  this.sites$, this.store.select(accessTokenSelector),
      (userGroup, userSite, token) => {
        return {userGroup, userSite, token};
      }).subscribe(({userGroup, userSite, token}) => {
      if (userGroup.length > 0 && userSite.length > 0  ) {
        this.initalTestLoadFilter['groupId'] = userGroup[0].groupId;
        this.initalTestLoadFilter['siteId'] = userSite[0].siteId;

        if (token) {
          this.store.dispatch(new FiltersOnPageLoad(this.initalTestLoadFilter));
        }
      }
    });
  }

  resetOnChangeTestTeamFilter(value: boolean): void {
    this.onChangeTestTeamFilter = value;
  }

  disableUpdateButtonTestTeamFilter(value: boolean): void {
    this.isUpdateDisabled = value;
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearSequenceFilters());
  }

}
