import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { pick } from 'lodash';
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
import { User, UserGroup, UserRole, UserSite } from '../../../core/services/user/user.model';
import { groupsSelector, roleSelector, sitesSelector, userSelector } from '../../../core/services/user/user.reducer';
import { accessTokenSelector } from '../../login/login.reducer';
import {
  ClearFilters,
  FiltersOnPageLoad,
  Paginate,
  SelectTest,
  Sort,
  UpdateFilters
} from './test-progress-overview.action';
import {
  CauseOrRunningBy,
  TestProgress,
  TestProgressOverviewFilters,
  TestStatusLog
} from './test-progress-overview.model';
import {
  filtersSelector,
  paginationSelector,
  selectedTestGroupSelector,
  selectedTestSiteSelector,
  sortSelector,
  TestProgressOverviewState,
  testsSelector
} from './test-progress-overview.reducer';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { Filter } from '../../../core/interfaces/filter.model';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  selector: 'tm-test-progress-overview',
  templateUrl: './test-progress-overview.component.html',
  styleUrls: ['./test-progress-overview.component.scss']
})
export class TestProgressOverviewComponent implements OnInit, OnDestroy {
  public testProgress$: Observable<TestProgress[]>;
  public sort$: Observable<SortOptions | undefined>;
  public user$: Observable<User>;
  public paginationParameters$: Observable<PaginationParameters>;
  public userSites$: Observable<UserSite[]>;
  public userGroups$: Observable<UserGroup[]>;
  public userRole$: Observable<UserRole[]>;
  public filters$: Observable<TestProgressOverviewFilters>;
  public selectedTestSite$: Observable<UserSite>;
  public selectedTestGroup$: Observable<UserGroup>;
  public disabledUpdate: Boolean = true;
  public RemovedButton: Boolean = true;
  public disabledCreate: boolean = false;
  public removedTableColumnForLeader: boolean = true;
  public removedTableColumnForReader: boolean = false;
  public testStatusOptions = TestStatusLog;
  public causeRunningByOptions = CauseOrRunningBy;
  public pagination: PaginationParameters  =  {'numberOfPages': 1, 'page': 1, 'pageSize': 5};
  public itemsPerPage = [10, 20, 30];
  public selectedTeamData = {};
  public onChangeTestTeamFilter: Boolean = false;
  public testStatusSelector: FormControl;
  public testDetailsById: string;
  public selectAll = TestStatusLog.ALL.toString().toUpperCase();
  public defaultStatus: string = TestStatusLog.ALL.toString().toUpperCase();
  public defaultCauseOrRunningBy: string = TestStatusLog.ALL.toString().toUpperCase();
  public initalTestLoadFilter = {};
  public nullFiller = '--';
  public privateSelector = [{id: this.selectAll, value: this.selectAll},
    {id : 'YES', value: 'true'},
    {id: 'NO', value: 'false'}];
  public defaultSelectionPrivate = this.selectAll;
  constructor(private store: Store<TestProgressOverviewState>,
              public router: Router,
              private sessionStorage: SessionStorageService) {}

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
    this.selectedTeamData['statusLogStatus'] = val !== this.selectAll ? val.toUpperCase() : '';
    this.store.dispatch(new UpdateFilters(this.selectedTeamData));
  }

  onClearFilterDropDown(event) {
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
    if (event) {
      this.defaultStatus = this.defaultSelectionPrivate =  this.defaultCauseOrRunningBy = this.selectAll;
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
    this.disabledCreate = !(this.selectedTeamData.hasOwnProperty('groupId')
      && this.selectedTeamData.hasOwnProperty('siteId'));

    this.selectedTeamData['statusLogStatus'] = this.defaultStatus !== this.selectAll
      ? this.defaultStatus.toUpperCase() : '';

    this.store.dispatch(new UpdateFilters(this.selectedTeamData));
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
    this.store.dispatch(new UpdateFilters(this.selectedTeamData));
  }

  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.testProgress$ = this.store.select(testsSelector);
    this.sort$ = this.store.select(sortSelector);
    this.paginationParameters$ = this.store.select(paginationSelector);
    this.userGroups$ = this.store.select(groupsSelector);
    this.userSites$ = this.store.select(sitesSelector);
    this.userRole$ = this.store.select(roleSelector);
    this.user$ = this.store.select(userSelector);
    this.filters$ = this.store.select(filtersSelector);
    this.selectedTestSite$ = this.store.select(selectedTestSiteSelector);
    this.selectedTestGroup$ = this.store.select(selectedTestGroupSelector);
    this.testStatusSelector = new FormControl(this.defaultStatus.toUpperCase());
    Observable.combineLatest(this.userGroups$, this.userSites$, this.store.select(accessTokenSelector),
      (userGroup, userSite, token) => {
        return {userGroup, userSite, token};
      }).subscribe(({userGroup, userSite, token}) => {
      if (userGroup.length > 0 && userSite.length > 0) {
        this.initalTestLoadFilter['groupId'] = userGroup[0].groupId;
        this.initalTestLoadFilter['siteId'] = userSite[0].siteId;

        if (token) {
          this.store.dispatch(new FiltersOnPageLoad(this.initalTestLoadFilter));
        }
      }
    });
    this.userRole$.subscribe( res => {
      if ( res && res.length > 0 ) {
        if ( res[0].roleId === 'TEST_LEADER' || res[0].roleId === 'EDITOR') {
          this.removedTableColumnForLeader = false;
          this.removedTableColumnForReader = true;
          this.RemovedButton = true;
          } else {
          this.removedTableColumnForReader = false;
          this.removedTableColumnForLeader = true;
          this.RemovedButton = false;
        }
      }
    });
  }

  onRowAction(test: TestProgress) {
    this.router.navigate(['test', 'details', test.testId]);
  }

  onRowSelect(test: TestProgress) {
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
      // @todo this should be moved to where the selectors are changes via an effect
      this.sessionStorage.setItem('userGroup', this.selectedTeamData['groupId']);
      this.sessionStorage.setItem('userSite', this.selectedTeamData['siteId']);
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearFilters());
  }
}

