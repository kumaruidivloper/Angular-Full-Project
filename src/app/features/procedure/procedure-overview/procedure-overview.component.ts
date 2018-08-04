import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { pick } from 'lodash';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { SortOptions } from '../../../core/interfaces/sort.i';
import { User, UserGroup, UserSite } from '../../../core/services/user/user.model';
import { groupsSelector, sitesSelector, userSelector } from '../../../core/services/user/user.reducer';
import { accessTokenSelector } from '../../login/login.reducer';
import {
  ClearFilters,
  FiltersOnPageLoad,
  Paginate,
  SelectProcedure,
  UpdateProcedureFilters
} from './procedure-overview.actions';
import { ChangeStatus, Procedure, ProcedureOverviewFilters, ProcedureStatus } from './procedure-overview.model';
import {
  filtersSelector,
  paginationSelector,
  ProcedureOverviewState,
  procedureSelector,
  selectedProcedureGroupSelector,
  selectedProcedureSiteSelector,
  sortSelector
} from './procedure-overview.reducer';
import { Filter } from '../../../core/interfaces/filter.model';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  selector: 'tm-procedure-overview',
  templateUrl: './procedure-overview.component.html',
  styleUrls: ['./procedure-overview.component.scss']
})
export class ProcedureOverviewComponent implements OnInit, OnDestroy {

  public procedures$: Observable<Procedure[]>;
  public sort$: Observable<SortOptions | undefined>;
  public user$: Observable<User>;
  public paginationParameters$: Observable<PaginationParameters>;
  public sites$: Observable<UserSite[]>;
  public userGroups$: Observable<UserGroup[]>;
  public selectedProcedureSite$: Observable<UserSite>;
  public selectedProcedureGroup$: Observable<UserGroup>;
  public selectAll = ProcedureStatus.ALL.toString().toUpperCase();
  public filters$: Observable<ProcedureOverviewFilters>;
  public selectedTeamData = {}; // @todo application state should be stored in ngrx/store
  public disabledUpdate: Boolean = true; // @todo application state should be stored in ngrx/store
  public isDisabled: Boolean = true; // @todo application state should be stored in ngrx/store
  public pagination: PaginationParameters  =  {'numberOfPages': 1, 'page': 1, 'pageSize': 5};
  public itemsPerPage = [10, 20, 30];
  public onChangeTestTeamFilter: Boolean = false;
  public defaultStatus: string = this.selectAll;
  public defaultChange: string = this.selectAll;
  public procedureStatusOptions = ProcedureStatus;
  public procedureChangeOptions = ChangeStatus;
  public procedureStatusSelector: FormControl;
  public procedureChangedSelector: FormControl;
  public disabledCreate: Boolean = false;
  public initalTestLoadFilter = {};

  constructor(private Http: HttpClient,
              private store: Store<ProcedureOverviewState>,
              public router: Router) { }


  onSortChange(field: string): void {
    // this.store.dispatch(new Sort(field));
  }

  onPaginationChange(paginationParameters: PaginationParameters): void {
    this.store.dispatch(new Paginate(paginationParameters));
    this.store.dispatch(new UpdateProcedureFilters(this.selectedTeamData));
  }

  onFilterChange(filter: Filter): void {
    const updatedFilters: {[key: string]: string} = {};
    this.selectedTeamData[filter.field] = filter.value;
    this.store.dispatch(new UpdateProcedureFilters(this.selectedTeamData));
  }

  onChangeTestTeam(value: string, filterFrom: string): void {
    if (value === this.selectAll) {
      this.isDisabled = true;
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

    this.store.dispatch(new UpdateProcedureFilters(this.selectedTeamData));
  }

  onTestTeamGroup(value) {
    this.onChangeTestTeam(value, 'groupId');
  }

  onTestTeamSite(value) {
    this.onChangeTestTeam(value, 'siteId');
  }

  onProcedureCategoryChange(value: string): void {
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
    this.selectedTeamData['category'] = ( value !== this.selectAll) ? value : '';
    this.store.dispatch(new UpdateProcedureFilters(this.selectedTeamData));
  }

  onProcedureChangedChange (value: string): void {
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
    this.selectedTeamData['changed'] = value !== 'ALL' ? value : '';
    this.store.dispatch(new UpdateProcedureFilters(this.selectedTeamData));
  }

  onClearFilterDropDown(event: string): void {
    this.onChangeTestTeamFilter = true;
    this.disabledUpdate = true;
    if (event) {
      this.defaultChange = this.defaultStatus = this.selectAll;
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
    this.procedures$ = this.store.select(procedureSelector);
    this.sort$ = this.store.select(sortSelector);
    this.paginationParameters$ = this.store.select(paginationSelector);
    this.userGroups$ = this.store.select(groupsSelector);
    this.sites$ = this.store.select(sitesSelector);
    this.user$ = this.store.select(userSelector);
    this.filters$ = this.store.select(filtersSelector);
    this.selectedProcedureSite$ = this.store.select(selectedProcedureSiteSelector);
    this.selectedProcedureGroup$ = this.store.select(selectedProcedureGroupSelector);

    this.procedureStatusSelector = new FormControl(this.defaultStatus.toUpperCase());
    this.procedureChangedSelector = new FormControl(this.selectAll.toUpperCase());

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

  onRowAction(procedure: Procedure): void {
    this.router.navigate(['procedure', 'details', procedure.id]);
  }

  onRowSelect(procedure: Procedure): void {
    if (procedure === null) {
      this.disabledUpdate = true;
    } else {
      this.disabledUpdate = false;
      this.store.dispatch(new SelectProcedure(procedure));
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
    this.selectedTeamData = {};
  }

}
