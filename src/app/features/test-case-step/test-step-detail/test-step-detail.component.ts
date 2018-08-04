import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isEqual } from 'lodash';
import { Store } from '@ngrx/store';

import {
  ClearTestStepDetails,
  CreateTestStep,
  CreateTestStepCopy,
  DeleteTestStep,
  GetResultTypeTestStep,
  GetTestStepDetails,
  UpdateTestStep,
  UpdateTestStepDetailsForm,
  UpdateUserGroup,
  UpdateUserSite
} from './test-step-detail-actions';

import {
  loaderSelector,
  testStepDetailsSelector,
  TestStepDetailsState,
  testStepResultTypeSelector,
  updateUserGroupSelector,
  updateUserSiteSelector
} from './test-step-detail.reducer';

import { userSelector } from '../../../core/services/user/user.reducer';
import { User } from '../../../core/services/user/user.model';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import { TestCaseStepDetails, ResultType} from '../test-case-detail/test-case-detail.model';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import {accessTokenSelector} from '../../login/login.reducer';
import {TryUserLogin} from '../../login/login.actions';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tm-test-step-detail',
  templateUrl: './test-step-detail.component.html',
  styleUrls: ['./test-step-detail.component.scss']
})
export class TestStepDetailComponent implements OnInit, ComponentCanDeactivate, DoCheck, AfterViewInit, OnDestroy {
  @ViewChild('fileInput') fileInput;
  public baseApiUrl = window.location.href;
  public baseUrl: string;
  public testStepForm: FormGroup;
  public isCreate: boolean = true;
  public isCopy: boolean = false;
  public showVariantTemplate: boolean = false;
  public testStepDetails$: Observable<TestCaseStepDetails>;
  public testCaseStatus = ['ACTIVE', 'INACTIVE'];
  public categoryOptions = ['STANDARD', 'DEVELOPMENT'];
  public testCasePrivateOptions = [{ id: 'YES', value: true}, {id: 'NO', value: false}];
  public speedUnits = ['km/h', 'mi/h'];
  public user$: Observable<User>;
  public site$: Observable<string>;
  public group$: Observable<string>;
  public selectedUserSite: any;
  public selectedUserGroup: any;
  public resultType$: Observable<ResultType[]>;
  private getUserId: string;
  public currentDate = new Date();
  public testCaseInfo = {};
  public loading$: Observable<boolean>;
  public selectedFile: File;
  public uploadSuccess: boolean = false;
  public hasAttachment: boolean = false;
  public uploadedFileName: string;
  public pageType: string = 'testStep';
  public testStepVersion: any;
  public privateTestCase: any;
  public disableSave: boolean = false;
  public tagAdded: boolean;
  public toolAdded: boolean;
  public fileDetailsObj = [];
  constructor(
    private route: ActivatedRoute,
    private store: Store<TestStepDetailsState>,
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private ngModal: NgbModal,
    private fileUploadService: FileUploadService) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.testStepForm.untouched;
  }

  onTestTeamGroup(value) {
    this.store.dispatch(new UpdateUserGroup(value));
    if ( this.isCreate || this.isCopy) {
      this.disableSave = false;
    }
    this.sessionStorageService.setItem('userGroup', value);
  }
  onTestTeamSite(value) {
    this.store.dispatch(new UpdateUserSite(value));
    if ( this.isCreate || this.isCopy) {
      this.disableSave = false;
    }
    this.sessionStorageService.setItem('userSite', value);
  }

  onTagAdded(value) {
    if (value) {
      this.testStepForm.markAsTouched();
    }
    this.tagAdded = value;
  }
  onToolAdded(value) {
    if (value) {
      this.testStepForm.markAsTouched();
    }
    this.toolAdded = value;
  }

  buildTestCaseForm() {
    this.testStepForm = this.formBuilder.group({
      id: '',
      testCaseStepType: 'TEST_STEP',
      testCaseStepSite: '',
      testCaseStepUserGroup: '',
      testCaseStepVersion: [],
      currentTestCaseStepVersion: this.formBuilder.group({
        category: ['STANDARD', Validators.required],
        changeInfo: {},
        level: null,
        description: '',
        expectedResult: '',
        id: 0,
        testCaseStepUploadFile: [],
        name: '',
        notes: '',
        privateTestCaseStep: [true, Validators.required],
        reqId: '',
        reqVersion: '',
        speed: this.formBuilder.group({
          speedValue: '',
          speedUnit: [],
        }),
        status: ['ACTIVE', Validators.required],
        testCaseStepProductClassFilter: [[]],
        testCaseStepResultTypeTC: new FormArray([
          new FormControl({name: 'OK/NOK'})
        ]),
        versionNo: 1,
        testCaseStepTags: [],
        testCaseStepTools: [],
        testCaseStepTruckFunction: {}
      })
    });
  }

  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.testStepDetails$ = this.store.select(testStepDetailsSelector);
    this.user$ = this.store.select(userSelector);
    this.site$ = this.store.select(updateUserSiteSelector);
    this.group$ = this.store.select(updateUserGroupSelector);
    this.resultType$ = this.store.select(testStepResultTypeSelector);
    this.loading$ = this.store.select(loaderSelector);
    if (this.isCreate) {
      this.testStepDetails$
        .take(2)
        .subscribe((details: TestCaseStepDetails) => {
          if (details.hasOwnProperty('currentTestCaseStepVersion')) {
            if (details.currentTestCaseStepVersion.speed.speedValue === '') {
              details.currentTestCaseStepVersion.speed.speedUnit = '';
            }
          }
        });
      this.sessionStorageService.getItem('userGroup').subscribe( userGroup => {
        this.selectedUserGroup = userGroup;
      });
      this.sessionStorageService.getItem('userSite').subscribe( userSite => {
        this.selectedUserSite = userSite;
      });
    }
    this.buildTestCaseForm();
    this.store.dispatch(new GetResultTypeTestStep());
    this.route.params
      .map(params => params.id)
      .filter(id => !!id)
      .subscribe(id => {
        this.isCreate = false;
        this.disableSave = true;
        this.store.dispatch(new GetTestStepDetails(id));
      });
    this.store.dispatch(new UpdateTestStepDetailsForm(this.testStepForm.value));
    this.testStepDetails$
      .take(2)
      .subscribe((details: TestCaseStepDetails) => {
        if (details.hasOwnProperty('currentTestCaseStepVersion')) {
          this.testStepVersion = details.currentTestCaseStepVersion['versionNo'];
          this.privateTestCase = details.currentTestCaseStepVersion['privateTestCaseStep'];
          this.hasAttachment =  true;
          if (this.privateTestCase) {
            this.testStepForm.get('currentTestCaseStepVersion.privateTestCaseStep').enable();
          } else {
            this.testStepForm.get('currentTestCaseStepVersion.privateTestCaseStep').disable();
          }
        }
      });
  }

  ngDoCheck() {
    if (this.testStepForm && this.testStepForm.dirty || this.tagAdded || this.toolAdded) {
      this.disableSave = false;
      this.tagAdded = false;
      this.toolAdded = false;
    }
  }

  ngAfterViewInit() {
    this.testStepDetails$
      .take(2)
      .subscribe((details: TestCaseStepDetails) => {
        if (details.hasOwnProperty('currentTestCaseStepVersion')) {
          this.testCaseInfo = details.currentTestCaseStepVersion['changeInfo'];
          details.currentTestCaseStepVersion['speed'] = details.currentTestCaseStepVersion['speed'] || {};
          if (details.currentTestCaseStepVersion.testCaseStepUploadFile &&
            details.currentTestCaseStepVersion.testCaseStepUploadFile.length > 0) {
            this.hasAttachment =  true;
            this.uploadedFileName = details.currentTestCaseStepVersion.testCaseStepUploadFile[0].fileName || '';
            this.fileDetailsObj = details.currentTestCaseStepVersion.testCaseStepUploadFile;
          }
        }
        this.testStepForm.patchValue(details);
        if (!this.isCreate) {
          this.testCaseInfo = details.currentTestCaseStepVersion ? details.currentTestCaseStepVersion['changeInfo'] : {};
        }
      });
    this.testStepForm.valueChanges
      .subscribe(testStepDetails => {
        this.store.dispatch(new UpdateTestStepDetailsForm(testStepDetails));
        if (testStepDetails.hasOwnProperty('currentTestCaseStepVersion')) {
          this.testStepVersion = testStepDetails.currentTestCaseStepVersion.versionNo;
        }
      });
    this.baseUrl = 'http://' + this.baseApiUrl.split('/')[2];
  }

  onFormValueChange(): void {
    this.testStepForm.markAsTouched();
  }

  onSave(value): void {
    if (this.testStepForm.valid) {
      let changeInfo;
      this.testStepForm.markAsPristine();
      this.testStepForm.markAsUntouched();
      this.user$.subscribe( res => {
        changeInfo = {
          changedByFirstName: res.firstName || null,
          changedByLastName: res.lastName || null,
          changedByUserId: res.userId,
          created: this.isCreate ? this.currentDate.getTime() : this.testCaseInfo['created'],
          createdByUserId : this.isCreate ? res.userId : this.testCaseInfo['createdByUserId'],
          lastChanged: this.currentDate.getTime()
        };
      });
      this.testStepForm.patchValue({currentTestCaseStepVersion: {changeInfo: changeInfo}});
      this.testStepForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': this.fileDetailsObj}});
      this.testStepForm.controls['testCaseStepVersion'].setValue([this.testStepForm.controls['currentTestCaseStepVersion'].value]);
      this.disableSave = true;
      if (this.isCreate) {
        this.testStepForm.controls['id'].setValue(0);
        // this.testStepForm.controls['testCaseStepUserGroup'].setValue({
        //   groupId: this.selectedUserGroup,
        //   groupName: this.selectedUserGroup
        // });
        // this.testStepForm.controls['testCaseStepSite'].setValue({
        //   siteId: this.selectedUserSite,
        //   siteName: this.selectedUserSite
        // });
        this.sessionStorageService.getItem('userGroup').subscribe( testGroup => {
          this.testStepForm.controls['testCaseStepUserGroup'].setValue({
            groupId: testGroup,
            groupName: testGroup
          });
        });
        this.sessionStorageService.getItem('userSite').subscribe( testSite => {
          this.testStepForm.controls['testCaseStepSite'].setValue({
            siteId: testSite,
            siteName: testSite
          });
        });
        this.store.dispatch(new CreateTestStep());
      } else  if (this.isCopy) {
        this.testStepForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': this.fileDetailsObj}});
        this.isCopy = false;
        this.store.dispatch(new CreateTestStepCopy());
      } else {
        this.testStepForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': this.fileDetailsObj}});
        this.store.dispatch(new UpdateTestStep());
      }
    } else {
      const formControlList = this.testStepForm.controls['currentTestCaseStepVersion'] as FormGroup;
      Object.keys( formControlList.controls).forEach(key => {
        formControlList.controls[key].markAsTouched({ onlySelf: true });
      });
    }

    this.testStepDetails$
      .take(2)
      .subscribe((details: TestCaseStepDetails) => {
        if (details.hasOwnProperty('currentTestCaseStepVersion')) {
          this.privateTestCase = details.currentTestCaseStepVersion['privateTestCaseStep'];
          if (this.privateTestCase === true) {
            this.testStepForm.get('currentTestCaseStepVersion.privateTestCaseStep').enable();
          } else {
            this.testStepForm.get('currentTestCaseStepVersion.privateTestCaseStep').disable();
          }
        }
      });
  }

  deleteTestStep() {
    this.store.dispatch(new DeleteTestStep(this.testStepForm.value));
  }
  showVariant() {
    this.showVariantTemplate = true;
  }

  closeVariantTemplate() {
    this.showVariantTemplate = false;
  }

  onCreateCopyTestCase() {
    this.testStepForm.controls['id'].setValue(0);
    this.testStepForm.patchValue({currentTestCaseStepVersion: {id: 0, versionNo: 1}});
    this.isCopy = true;
    this.isCreate = false;
    Observable.combineLatest(this.group$,  this.site$,
      (userSite, userGroup) => {
        return {userSite, userGroup};
      }).subscribe(({userSite, userGroup}) => {
      this.testStepForm.controls['testCaseStepUserGroup'].setValue({
        groupId: userGroup,
        groupName: userGroup
      });
      this.testStepForm.controls['testCaseStepSite'].setValue({
        siteId: userSite,
        siteName: userSite
      });
    });
  }

  getField(field: string) {
    return this.testStepForm.get(field);
  }

  compare(option: any, value: any) {
    return isEqual(option, value);
  }

  get name() { return this.getField('currentTestCaseStepVersion.name'); }
  get testCaseStepResultTypeTC() { return this.testStepForm.get('currentTestCaseStepVersion.testCaseStepResultTypeTC') as FormArray; }

  open(template) {
    this.ngModal.open(template, {
      size: 'lg',
    });
  }

  removeFileAttachment(value) {
    event.preventDefault();
    const index = this.fileDetailsObj.indexOf(value, 0);
    if (index > -1) {
      this.fileDetailsObj.splice(index, 1);
    }
    this.disableSave = false;
  }
  fileToUpload(value) {
    this.disableSave = false;
    const fileBrowser  = this.fileInput.nativeElement;
    this.selectedFile = fileBrowser.files[0];
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('uploadedFile', this.selectedFile, this.selectedFile.name);
      this.fileUploadService.upload(formData, this.pageType).subscribe(res => {
        this.fileDetailsObj.push(res);
        setTimeout( () => {
          if (res.hasOwnProperty('fileName')) {
            this.uploadSuccess = this.hasAttachment  = true;
            this.testStepForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': [res] || []}});
            this.uploadedFileName = res['fileName'];
          }
        }, 100);
      });
    }
  }
  ngOnDestroy() {
    this.store.dispatch(new ClearTestStepDetails());
    this.buildTestCaseForm();
  }

}
