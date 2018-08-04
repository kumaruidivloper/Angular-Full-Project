import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pick } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortOptions } from '../../../core/interfaces/sort.i';
import { accessTokenSelector } from '../../login/login.reducer';
import {
  ClearTestCaseStepFilters,
  FiltersOnPageLoad,
  PaginateTestCaseStep,
  SelectTestCaseStep,
  UpdateTestCaseStepFilters
} from './test-case-step-overview.actions';
import { TestCaseStep } from './test-case-step-overview.model';
import {
  filtersTsTcSelector,
  paginationTsTcSelector,
  sortTsTcSelector,
  TestCaseStepOverviewState,
  testCaseStepSelector
} from './test-case-step-overview.reducer';
import { UserGroup, UserSite } from '../../../core/services/user/user.model';
import { groupsSelector, sitesSelector } from '../../../core/services/user/user.reducer';
import { Filter } from '../../../core/interfaces/filter.model';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  selector: 'tm-test-case-step-overview',
  templateUrl: './test-case-step-overview.component.html',
  styleUrls: ['./test-case-step-overview.component.scss']
})
export class TestCaseStepOverviewComponent implements OnInit, OnDestroy {
  public testCaseStep$: Observable<TestCaseStep[]>;
  public paginationParameters$: Observable<PaginationParameters>;
  public filters$: Observable<any>;
  public sites$: Observable<UserSite[]>;
  public userGroups$: Observable<UserGroup[]>;
  public sort$: Observable<SortOptions | undefined>;
  private selectAll: string = 'ALL';
  public itemsPerPage = [10, 20, 30];
  public levelSelector = [this.selectAll, 1, 2, 3];
  public typeSelector = [this.selectAll, 'TEST_CASE', 'TEST_STEP'];
  public statusSelector = [this.selectAll, 'ACTIVE', 'INACTIVE'];
  public categorySelection = [this.selectAll, 'STANDARD', 'DEVELOPMENT'];
  public isPrivateSelector = [{id: this.selectAll, value: this.selectAll}, {id: 'YES', value: true}, {
    id: 'NO',
    value: false
  }];
  public isCreateDisabled: boolean = true;
  public isUpdateDisabled: boolean = true;
  public selectedTeamData = {};
  public defaultSelectionLevel: string = this.selectAll;
  public defaultSelectionStatus: string = this.selectAll;
  public defaultSelectionCategory: string = this.selectAll;
  public defaultSelectionPrivate: string = this.selectAll;
  public defaultSelectionType: string = this.selectAll;
  public onChangeTestTeamFilter: Boolean = false;
  public testCaseId: any;
  public routingPath: boolean;
  public disabledCreate: Boolean = false;
  public initalTestLoadFilter = {};

  constructor(private store: Store<TestCaseStepOverviewState>,
              public router: Router) {
  }

  onSortChange(field: string): void {
    // this.store.dispatch(new SortTestCaseStep(field));
  }

  onPaginationChange(paginationParameters): void {
    this.store.dispatch(new PaginateTestCaseStep(paginationParameters));
    this.store.dispatch(new UpdateTestCaseStepFilters(this.selectedTeamData));
  }

  onFilterInput(filter: Filter): void {
    this.selectedTeamData[filter.field] = filter.value !== this.selectAll ? filter.value : '';
    this.store.dispatch(new UpdateTestCaseStepFilters(this.selectedTeamData));
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
    this.disabledCreate = !(this.selectedTeamData.hasOwnProperty('groupId')
      && this.selectedTeamData.hasOwnProperty('siteId'));

    this.store.dispatch(new UpdateTestCaseStepFilters(this.selectedTeamData));
  }

  onTestTeamGroup(value) {
    this.onChangeTestTeam(value, 'groupId');
  }

  onTestTeamSite(value) {
    this.onChangeTestTeam(value, 'siteId');
  }

  onFilterSelect(value: string, fromSelector: string): void {
    this.isUpdateDisabled = true;
    const updatedFilters: { [key: string]: string } = {};
    // this.selectedTeamData[fromSelector] = value;
    this.selectedTeamData[fromSelector] = value !== this.selectAll ? value : '';
    this.store.dispatch(new UpdateTestCaseStepFilters(this.selectedTeamData));
  }

  resetOnChangeTestTeamFilter(value: boolean): void {
    this.onChangeTestTeamFilter = value;
  }

  onClearFilterDropDown(event: string): void {
    this.onChangeTestTeamFilter = true;
    this.isUpdateDisabled = true;
    if (event) {
      this.defaultSelectionCategory =
        this.defaultSelectionPrivate =
          this.defaultSelectionLevel =
            this.defaultSelectionStatus =
              this.defaultSelectionType = this.selectAll;
      this.selectedTeamData = pick(this.selectedTeamData, ['siteId', 'groupId']);
    }
  }

  onRowAction(testCaseStep: TestCaseStep) {
    if (testCaseStep.hasOwnProperty('testCaseStepType') && testCaseStep['testCaseStepType'] === 'TEST_CASE') {
      this.router.navigate(['test-case-step', 'testCaseDetails', testCaseStep.id]);
    } else {
      this.router.navigate(['test-case-step', 'testStepDetails', testCaseStep.id]);
    }
  }

  disableUpdateButtonTestTeamFilter(value: boolean): void {
    this.isUpdateDisabled = value;
  }

  onRowSelect(testCaseStep: TestCaseStep): void {
    if (testCaseStep) {
      if (testCaseStep && testCaseStep.hasOwnProperty('testCaseStepType') && testCaseStep['testCaseStepType'] === 'TEST_CASE') {
        this.isUpdateDisabled = false;
        this.testCaseId = testCaseStep.id;
        this.routingPath = testCaseStep['testCaseStepType'] === 'TEST_CASE';
        this.store.dispatch(new SelectTestCaseStep(testCaseStep));
      } else {
        this.isUpdateDisabled = false;
        this.testCaseId = testCaseStep.id;
      }
    }

  }

  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.testCaseStep$ = this.store.select(testCaseStepSelector);
    this.paginationParameters$ = this.store.select(paginationTsTcSelector);
    this.filters$ = this.store.select(filtersTsTcSelector);
    this.sort$ = this.store.select(sortTsTcSelector);
    this.userGroups$ = this.store.select(groupsSelector);
    this.sites$ = this.store.select(sitesSelector);
    Observable.combineLatest(this.userGroups$, this.sites$, this.store.select(accessTokenSelector),
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
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearTestCaseStepFilters());
  }
}
