import { Component, HostListener, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { isEqual, has } from 'lodash';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import {User, UserRole} from '../../../core/services/user/user.model';
import {
  ClearTestDetails,
  CreateTest,
  DeleteTest,
  GetSoftwareVersions,
  GetTestDetails,
  GetTestLeaders,
  GetTestObjects,
  UpdateDetailsForm,
  UpdateTest,
  UpdateUserGroup,
  UpdateUserSite,
} from './test-details.actions';
import {
  DefaultTestStatusOptions,
  SoftwareVersion,
  TestDetails,
  TestObject,
  TestStatusOptions
} from './test-details.model';
import {
  testDetailsSelector,
  TestDetailsState,
  testLeaderSelector,
  testObjectsSelector,
  testSoftwareVersionsSelector,
  updateUserGroupSelector,
  updateUserSiteSelector
} from './test-details.reducer';
import {roleSelector, userSelector} from '../../../core/services/user/user.reducer';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { DateHandlerService } from '../../../core/services/date/date-handler.service';
import {TryUserLogin} from '../../login/login.actions';
import {accessTokenSelector} from '../../login/login.reducer';

@Component({
  selector: 'tm-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent implements OnInit, OnDestroy, DoCheck, ComponentCanDeactivate {
  public testDetails$: Observable<TestDetails>;
  public testSoftwareVersions$: Observable<SoftwareVersion[]>;
  public testObjects$: Observable<TestObject[]>;
  public roles$: Observable<UserRole[]>;
  public selectedTestSite: any;
  public selectedTestGroup: any;
  public testLeaders$: Observable<User[]>;
  public testUserObj: object = {};
  public testForm: FormGroup;
  public testStatusOptions = TestStatusOptions;
  public defaultTestStatusOptions = DefaultTestStatusOptions;
  public isCreate: boolean = true;
  public testInfo = {};
  public testLeaderParams = {};
  public user$: Observable<User>;
  public site$: Observable<string>;
  public group$: Observable<string>;
  public enableDeleteTest = false;
  public currentDate = new Date();
  public selectedTestObjectId: string;
  public datePickerOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    markCurrentDay: true
  };
  private getUserId: string;
  public getTestLeaderInfo: any;
  private checkTestStatus: string = '';
  public disableSave: boolean = false;
  private hasCreateTestRole: boolean;
  constructor(private ngModal: NgbModal,
              private route: ActivatedRoute,
              private store: Store<TestDetailsState>,
              private formBuilder: FormBuilder,
              private sessionStorageService: SessionStorageService,
              private dateService: DateHandlerService) {}

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.testForm.pristine;
  }
  onTestTeamGroup(value) {
      this.store.dispatch(new UpdateUserGroup(value));
      this.sessionStorageService.setItem('userGroup', value);
  }
  onTestTeamSite(value) {
      this.store.dispatch(new UpdateUserSite(value));
      this.sessionStorageService.setItem('userSite', value);
  }
  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.testObjects$ = this.store.select(testObjectsSelector);
    this.testDetails$ = this.store.select(testDetailsSelector);
    this.testSoftwareVersions$ = this.store.select(testSoftwareVersionsSelector);
    this.testLeaders$ = this.store.select(testLeaderSelector);
    this.user$ = this.store.select(userSelector);
    this.site$ = this.store.select(updateUserSiteSelector);
    this.group$ = this.store.select(updateUserGroupSelector);
    this.roles$ = this.store.select(roleSelector);
    this.sessionStorageService.getItem('Login:UserId').subscribe( res => {
      this.getUserId = (res) ? res.toString() : '';
    });
    this.testForm = this.formBuilder.group({
      actualStartDate: [''],
      description: '',
      name: ['', Validators.required],
      plannedStartDate: [''],
      plannedEndDate: [''],
      privateTest: [true, Validators.required],
      productClass: '',
      project: ['', Validators.required],
      testId: '',
      testObjectField: ['', Validators.required],
      testRequestId: '',
      testSite: '',
      testStatus: [this.defaultTestStatusOptions.INITIATED, Validators.required],
      testSwVersion: ['', Validators.required],
      testUser: '',
      testUserGroup: '',
      wbs: ['', Validators.required],
      changeInfo: {}
    });
    /* Test Leader -Only temporary solution to handle missing test leader data, will be reverted once real time data integration done*/
    this.testLeaders$.subscribe( res => {
      if (res.length === 0 ) {
        this.testForm.controls['testUser'].disable();
      } else {
        if (this.checkTestStatus === this.testStatusOptions.COMPLETED) {
          this.testForm.controls['testUser'].disable();
        } else {
          this.testForm.controls['testUser'].enable();
        }
      }
    });
    /* Test Leader - END*/

    this.roles$.subscribe( userRoles => {
      userRoles.forEach( role => {
        if (role.roleId === 'TEST_LEADER') {
          this.hasCreateTestRole = true;
          this.disableSave = false;
        } else {
          this.hasCreateTestRole = false;
          this.disableSave = true;
        }
      });
    });

    this.testDetails$
      .take(2)
      .subscribe((details: TestDetails) => {
        this.testForm.patchValue(details);
        this.getTestLeaderInfo = details.testUser;
        if (details.changeInfo) {
          this.testInfo = details.changeInfo;
        }
        // this.enableDeleteTest = (details.testStatus === this.defaultTestStatusOptions.INITIATED);
        if (!this.isCreate) {
          this.testLeaderParams['groupId'] = details.testUserGroup['groupId'];
          this.testLeaderParams['siteId'] = details.testSite['siteId'];
          this.store.dispatch(new GetTestLeaders(this.testLeaderParams));

          if (details.plannedStartDate) {
            const ngbDatePickerFormat = this.dateService.dateToNgxDateFormat(details.plannedStartDate);
            this.testForm.patchValue({plannedStartDate: {date: ngbDatePickerFormat}});
          }
          if (details.plannedEndDate) {
            const ngbDatePickerFormat = this.dateService.dateToNgxDateFormat(details.plannedEndDate);
            this.testForm.patchValue({plannedEndDate: {date: ngbDatePickerFormat}});
          }
          if (details.actualStartDate) {
            const ngbDatePickerFormat = this.dateService.dateToNgxDateFormat(details.actualStartDate);
            this.testForm.patchValue({actualStartDate: {date: ngbDatePickerFormat}});
          }
          if (details.testStatus.toUpperCase() === this.testStatusOptions.COMPLETED) {
            this.checkTestStatus = this.testStatusOptions.COMPLETED;
            Object.keys(this.testForm.controls).forEach(field => {
              if (field !== 'description') {
                this.testForm.get(field).disable();
              }
            });
          }
          if (this.testForm.controls['privateTest'].value) {
              this.testForm.controls['privateTest'].enable();
          } else {
            this.testForm.controls['privateTest'].disable();
          }
        }
      });

    this.testForm.valueChanges
      .subscribe(testDetails => {
        if (!this.testForm.pristine) {
          this.disableSave = false;
        }
        this.store.dispatch(new UpdateDetailsForm(testDetails));
      });

    this.route.params
      .map(params => params.id)
      .filter(id => !!id)
      .subscribe(id => {
        this.disableSave = true;
        this.isCreate = false;
        this.store.dispatch(new GetTestDetails(id));
      });

    Observable.from(this.testForm.get('testObjectField').valueChanges)
      .withLatestFrom(this.testObjects$)
      .mergeMap(([testObjectField, testObjects]) => testObjects.filter(testObject => testObject.testObjectFieldData === testObjectField))
      .subscribe(testObject => {
        this.selectedTestObjectId = testObject.testObjectId;
        this.testForm.patchValue({productClass: testObject.productClass});
      });

    this.store.dispatch(new GetTestObjects());
    this.store.dispatch(new GetSoftwareVersions());
    if (this.isCreate) {
      this.user$.subscribe( res => {
        this.testForm.controls['testUser'].setValue({
          firstName: res.firstName,
          lastName: res.lastName
        });
      });
      this.sessionStorageService.getItem('userGroup').subscribe( testGroup => {
        this.selectedTestGroup = testGroup;
      });
      this.sessionStorageService.getItem('userSite').subscribe( testSite => {
        this.selectedTestSite = testSite;
      });
      if ( this.selectedTestGroup !== '' && this.selectedTestSite !== '') {
        this.store.dispatch(new GetTestLeaders({groupId: this.selectedTestGroup, siteId: this.selectedTestSite}));
      }
    }

  }

  deleteTest() {
    this.store.dispatch(new DeleteTest(this.testForm.controls['testId'].value));
  }

  ngDoCheck() {
    this.testDetails$
      .take(2)
      .subscribe((details: TestDetails) => {
        this.enableDeleteTest = (details.testStatus === this.defaultTestStatusOptions.INITIATED);
      });
  }

  onSave() {
    if (this.testForm.valid) {
      this.testForm.markAsPristine();
      this.user$.subscribe( res => {
        this.testForm.controls['changeInfo'].setValue({
          changedByFirstName: res.firstName || null,
          changedByLastName: res.lastName || null,
          changedByUserId: res.userId,
          created: this.isCreate ? this.currentDate.getTime() : this.testInfo['created'],
          createdByUserId : this.isCreate ? res.userId : this.testInfo['createdByUserId'],
          lastChanged: this.currentDate.getTime()
        });
      });
      this.disableSave = true;
      this.testLeaders$.subscribe( leaders => {
        const getUserDetails = this.testForm.controls['testUser'].value;
        leaders.forEach( leader => {
          if ( leader.userId === getUserDetails) {
            this.testForm.controls['testUser'].setValue({
              firstName: leader.firstName,
              lastName: leader.lastName
            });
          }
        });
      });
      if (this.isCreate) {
        this.sessionStorageService.getItem('userGroup').subscribe( testGroup => {
          this.testForm.controls['testUserGroup'].setValue({
            groupId: testGroup,
            groupName: testGroup
          });
        });
        this.sessionStorageService.getItem('userSite').subscribe( testSite => {
          this.testForm.controls['testSite'].setValue({
            siteId: testSite,
            siteName: testSite
          });
        });
        this.store.dispatch(new CreateTest());
      } else {
        this.store.dispatch(new UpdateTest());
      }
    } else {
      Object.keys(this.testForm.controls).forEach(field => {
        const control = this.testForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  enableSave() {
    this.disableSave = false;
  }

  open(template) {
    this.ngModal.open(template, {
      size: 'lg',
    });
  }

  getField(field: string) {
    return this.testForm.get(field);
  }

  compare(option: any, value: any) {
    return isEqual(option, value);
  }

  get name() { return this.getField('name'); }
  get testObjectField() { return this.getField('testObjectField'); }
  get testUserGroup() { return this.getField('testUserGroup'); }
  get actualStartDate() { return this.getField('actualStartDate'); }
  get description() { return this.getField('description'); }
  get plannedStartDate() { return this.getField('plannedStartDate'); }
  get testRequestId() { return this.getField('testRequestId'); }
  get testSoftwareVersion() { return this.getField('testSwVersion'); }
  get wbs() { return this.getField('wbs'); }
  get project() { return this.getField('project'); }
  get privateTest() { return this.getField('privateTest'); }


  ngOnDestroy() {
    this.store.dispatch(new ClearTestDetails());
  }

  numbersOnly(event: any) {
    const pattern = /[0-9\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
