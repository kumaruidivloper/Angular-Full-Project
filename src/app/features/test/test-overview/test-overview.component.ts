import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { find, pick } from 'lodash';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortOptions } from '../../../core/interfaces/sort.i';
import {User, UserGroup, UserRole, UserSite} from '../../../core/services/user/user.model';
import { groupsSelector, sitesSelector, userSelector, roleSelector } from '../../../core/services/user/user.reducer';
import { accessTokenSelector } from '../../login/login.reducer';
import { ClearFilters, FiltersOnPageLoad, Paginate, SelectTest, Sort, UpdateFilters } from './test-overview.actions';
import { Test, TestOverviewFilters, TestStatus } from './test-overview.model';
import {
  filtersSelector,
  paginationSelector,
  selectedTestGroupSelector,
  selectedTestSiteSelector,
  sortSelector,
  TestOverviewState,
  testsSelector
} from './test-overview.reducer';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { Filter } from '../../../core/interfaces/filter.model';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  templateUrl: './test-overview.component.html',
  styleUrls: ['./test-overview.component.scss']
})
export class TestOverviewComponent implements OnInit, OnDestroy {
  public tests$: Observable<Test[]>;
  public sort$: Observable<SortOptions | undefined>;
  public user$: Observable<User>;
  public roles$: Observable<UserRole[]>;
  public paginationParameters$: Observable<PaginationParameters>;
  public userSites$: Observable<UserSite[]>;
  public userGroups$: Observable<UserGroup[]>;
  public filters$: Observable<TestOverviewFilters>;
  public selectedTestSite$: Observable<UserSite>;
  public selectedTestGroup$: Observable<UserGroup>;
  public disabledUpdate: boolean = true;
  public disabledCreate: boolean = true;
  public testStatusOptions = TestStatus;
  public testStatusSelector: FormControl;
  public testDetailsById: string;
  public defaultStatus: string = TestStatus.INITIATED.toString().toUpperCase();
  public itemsPerPage = [10, 20, 30];
  public initalTestLoadFilter = {};
  public selectedTeamData = {};
  public getRole: UserRole = {};
  public onChangeTestTeamFilter: boolean = false;
  private hasCreateTestRole: boolean = false;
  public selectAll = TestStatus.ALL.toString().toUpperCase();

  constructor(private store: Store<TestOverviewState>,
              public router: Router,
              private sessionStorage: SessionStorageService) {}

  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.tests$ = this.store.select(testsSelector);
    this.sort$ = this.store.select(sortSelector);
    this.paginationParameters$ = this.store.select(paginationSelector);
    this.userGroups$ = this.store.select(groupsSelector);
    this.userSites$ = this.store.select(sitesSelector);
    this.user$ = this.store.select(userSelector);
    this.roles$ = this.store.select(roleSelector);
    this.filters$ = this.store.select(filtersSelector);
    this.selectedTestSite$ = this.store.select(selectedTestSiteSelector);
    this.selectedTestGroup$ = this.store.select(selectedTestGroupSelector);
    this.testStatusSelector = new FormControl(this.defaultStatus.toUpperCase());
    this.selectedTeamData['testStatus'] = this.defaultStatus.toUpperCase();

    Observable.combineLatest(this.userGroups$,  this.userSites$, this.store.select(accessTokenSelector),
      (userGroup, userSite, token) => {
        return {userGroup, userSite, token};
      }).subscribe(({userGroup, userSite, token}) => {
      if (userGroup.length > 0 && userSite.length > 0  ) {
        this.initalTestLoadFilter['groupId'] = userGroup[0].groupId;
        this.initalTestLoadFilter['siteId'] = userSite[0].siteId;
        this.initalTestLoadFilter['testStatus'] = this.defaultStatus.toUpperCase();

        if (token) {
          this.store.dispatch(new FiltersOnPageLoad(this.initalTestLoadFilter));
        }
      }
    });
    this.roles$.subscribe( userRoles => {
       this.getRole = find(userRoles, {roleId: 'TEST_LEADER'});
       if (this.getRole && this.getRole.hasOwnProperty('roleId')) {
         this.hasCreateTestRole = true;
         this.disabledCreate = false;
       }
    });
  }

  onSortChange(field) {
    this.store.dispatch(new Sort(field));
  }

  onPaginationChange(paginationParameters) {
    this.store.dispatch(new Paginate(paginationParameters));
    this.store.dispatch(new UpdateFilters(this.selectedTeamData));
  }

  onFilterChange(filter: Filter) {
    const updatedFilters: {[key: string]: string} = {};
    this.selectedTeamData[filter.field] = filter.value;
    this.store.dispatch(new UpdateFilters(this.selectedTeamData));
  }

  onTestStatusChange(val) {
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
    this.selectedTeamData['testStatus'] = val !== this.selectAll ? val.toUpperCase() : '';
    this.store.dispatch(new UpdateFilters(this.selectedTeamData));
  }

  onClearFilterDropDown(event) {
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
    if (event) {
      this.defaultStatus = this.selectAll;
      this.selectedTeamData = pick(this.selectedTeamData, ['siteId', 'groupId']);
    }
  }
  onChangeTestTeam(val, filterFrom) {
    if (val === this.selectAll) {
      delete this.selectedTeamData[filterFrom];
    } else {
      this.selectedTeamData[filterFrom] = val;
    }
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;

  }
  onChangeEmit() {
    if (this.selectedTeamData.hasOwnProperty('groupId') && this.selectedTeamData.hasOwnProperty('siteId') && this.hasCreateTestRole) {
      this.disabledCreate = false;
    } else {
      this.disabledCreate = true;
    }
    this.selectedTeamData['testStatus'] = (this.defaultStatus !== this.selectAll) ? this.defaultStatus.toUpperCase() : '';
    this.store.dispatch(new UpdateFilters(this.selectedTeamData));
  }

  onTestTeamGroupChange(value) {
    this.onChangeTestTeam(value, 'groupId');
  }

  onTestTeamSiteChange(value) {
    this.onChangeTestTeam(value, 'siteId');
  }

  onRowAction(test: Test) {
    this.router.navigate(['test', 'details', test.testId]);
  }

  onRowSelect(test: Test) {
    if (test === null) {
      this.disabledUpdate = true;
    }else {
      this.disabledUpdate = false;
      this.store.dispatch(new SelectTest(test));
      this.testDetailsById = test ? test.testId : null;
    }
  }

  resetOnChangeTestTeamFilter(value: boolean): void {
    this.onChangeTestTeamFilter = value;
  }

  disableUpdateButtonTestTeamFilter(value: boolean): void {
    this.disabledUpdate = value;
  }

  onCreateTest(isCreateTest: boolean) {
    if (isCreateTest && this.selectedTeamData.hasOwnProperty('groupId') && this.selectedTeamData.hasOwnProperty('siteId') ) {
      // @todo this should be moved so that it's set when the selectors are changed via an effect
      this.sessionStorage.setItem('userGroup', this.selectedTeamData['groupId']);
      this.sessionStorage.setItem('userSite', this.selectedTeamData['siteId']);
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearFilters());
  }
}
