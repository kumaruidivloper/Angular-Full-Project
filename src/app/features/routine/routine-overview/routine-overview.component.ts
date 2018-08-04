import { Component, OnDestroy, OnInit } from '@angular/core';
import { pick, find } from 'lodash';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/from';
import { Router } from '@angular/router';
import {
  ClearFilters,
  FiltersOnPageLoad,
  Paginate,
  SelectRoutine,
  Sort,
  UpdateRoutineFilters
} from './routine-overview.action';
import {User, UserGroup, UserRole, UserSite} from '../../../core/services/user/user.model';
import { Routine, RoutineOverviewFilters } from './routine-overview.model';
import {
  filtersSelector,
  paginationSelector,
  RoutineOverviewState,
  routineSelector,
  sortSelector
} from './routine-overview.reducer';
import {groupsSelector, roleSelector, sitesSelector, userSelector} from '../../../core/services/user/user.reducer';
import { Observable } from 'rxjs/Observable';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortOptions } from '../../../core/interfaces/sort.i';
import { accessTokenSelector } from '../../login/login.reducer';
import { Filter } from '../../../core/interfaces/filter.model';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  selector: 'tm-routine-overview',
  templateUrl: './routine-overview.component.html',
  styleUrls: ['./routine-overview.component.scss']
})
export class RoutineOverviewComponent implements OnInit, OnDestroy {

  public routine$: Observable<Routine[]>;
  public sort$: Observable<SortOptions | undefined>;
  public user$: Observable<User>;
  public paginationParameters$: Observable<PaginationParameters>;
  public sites$: Observable<UserSite[]>;
  public userGroups$: Observable<UserGroup[]>;
  public filters$: Observable<RoutineOverviewFilters>;
  public roles$: Observable<UserRole[]>;
  public selectAll = 'ALL';
  public selectedTeamData = {};
  public disabledUpdate: Boolean = true;
  public disabledCreate: Boolean = false;
  public categorySelection = [this.selectAll, 'STANDARD', 'DEVELOPMENT'];
  public privateSelector = [{id: this.selectAll, value: this.selectAll},
                            {id : 'YES', value: 'true'},
                            {id: 'NO', value: 'false'}];
  public statusSelector = [this.selectAll, 'ACTIVE', 'INACTIVE'];
  public defaultSelectionCategory = this.selectAll;
  public defaultSelectionPrivate = this.selectAll;
  public defaultSelectionStatus = this.selectAll;
  public routineDetailsById: string;
  public itemsPerPage = [10, 20, 30];
  public onChangeTestTeamFilter: Boolean = false;
  public initalTestLoadFilter = {};
  public getRole: UserRole = {};

  constructor(private store: Store<RoutineOverviewState>, public router: Router) { }


  onSortChange(field: string): void {
    this.store.dispatch(new Sort(field));
  }

  onPaginationChange(paginationParameters): void {
    this.store.dispatch(new Paginate(paginationParameters));
    this.store.dispatch(new UpdateRoutineFilters(this.selectedTeamData));
  }

  onFilterChange(filter: Filter): void {
    const updatedFilters: {[key: string]: string} = {};
    this.selectedTeamData[filter.field] = filter.value;
    this.store.dispatch(new UpdateRoutineFilters(this.selectedTeamData));
  }

  onChangeTestTeam(value: string, filterFrom: string): void {
    if (value === this.selectAll) {
      delete this.selectedTeamData[filterFrom];
    } else {
      this.selectedTeamData[filterFrom] = value;
    }
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
  }
  onChangeEmit() {
    this.disabledCreate = !(this.selectedTeamData.hasOwnProperty('groupId')
      && this.selectedTeamData.hasOwnProperty('siteId'));
    this.store.dispatch(new UpdateRoutineFilters(this.selectedTeamData));
  }
  onTestTeamGroup(value) {
    this.onChangeTestTeam(value, 'groupId');
  }
  onTestTeamSite(value) {
    this.onChangeTestTeam(value, 'siteId');
  }

  filterSelect(value: string, field: string): void {
      this.onChangeTestTeamFilter = true;
      this.disabledUpdate = true;
        this.selectedTeamData[field] = value !== this.selectAll ? value : '';
        this.store.dispatch(new UpdateRoutineFilters(this.selectedTeamData));
  }

  onClearFilterDropDown(event: string): void {
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
    if (event) {
      this.defaultSelectionCategory = this.defaultSelectionPrivate = this.defaultSelectionStatus = this.selectAll;
      this.selectedTeamData = pick(this.selectedTeamData, ['siteId', 'groupId']);
    }
  }

  ngOnInit(): void {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.routine$ = this.store.select(routineSelector);
    this.sort$ = this.store.select(sortSelector);
    this.paginationParameters$ = this.store.select(paginationSelector);
    this.userGroups$ = this.store.select(groupsSelector);
    this.sites$ = this.store.select(sitesSelector);
    this.user$ = this.store.select(userSelector);
    this.filters$ = this.store.select(filtersSelector);
    this.roles$ = this.store.select(roleSelector);
    this.roles$.subscribe( userRoles => {
        this.getRole = find(userRoles, {roleId: 'TEST_LEADER'});
        if (this.getRole && this.getRole.hasOwnProperty('roleId')) {
          this.disabledCreate = false;
        } else {
          this.disabledCreate = true;
        }
    });


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

  onRowAction(routine: Routine) {
    this.router.navigate(['routine', 'details', routine.id]);
  }

  onRowSelect(routine: Routine): void {
    if (routine === null) {
      this.disabledUpdate = true;
    } else {
      this.disabledUpdate = false;
      this.store.dispatch(new SelectRoutine(routine));
      this.routineDetailsById = routine ? routine.id : null;
    }
  }

  resetOnChangeTestTeamFilter(value: boolean): void {
    this.onChangeTestTeamFilter = value;
  }

  disableUpdateButtonTestTeamFilter(value: boolean): void {
    this.disabledUpdate = value;
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearFilters());
  }

}
