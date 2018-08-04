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
import { ResultType, TestCaseStepDetails, TruckFunctionArea } from './test-case-detail.model';
import { Store } from '@ngrx/store';
import {
  ClearTestCaseDetails,
  CreateTestCase,
  CreateTestCaseCopy,
  DeleteTestCase,
  GetResultTypeTestCase,
  GetTestCaseDetails,
  GetTruckFunctionArea,
  UpdateTestCase,
  UpdateTestCaseDetailsForm,
  UpdateUserGroup,
  UpdateUserSite
} from './test-case-detail.actions';
import {
  loaderSelector,
  tcTruckFunctionAreaSelector,
  testCaseDetailsSelector,
  TestCaseDetailsState,
  testCaseResultTypeSelector,
  updateUserGroupSelector,
  updateUserSiteSelector
} from './test-case-detail.reducer';
import { userSelector } from '../../../core/services/user/user.reducer';
import { User } from '../../../core/services/user/user.model';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import {accessTokenSelector} from '../../login/login.reducer';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  selector: 'tm-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCaseDetailComponent implements OnInit, OnDestroy, AfterViewInit, DoCheck, ComponentCanDeactivate {
  @ViewChild('fileInput') fileInput;
  public baseApiUrl = window.location.href;
  public baseUrl: string;
  public isCreate: boolean = true;
  public isCopy: boolean = false;
  public showVariantTemplate: boolean = false;
  public testCaseDetails$: Observable<TestCaseStepDetails>;
  public testCaseLevel = [1, 2, 3];
  public testCaseStatus = ['ACTIVE', 'INACTIVE'];
  public categoryOptions = ['STANDARD', 'DEVELOPMENT'];
  public testCasePrivateOptions = [{ id: 'YES', value: true}, {id: 'NO', value: false}];
  public speedUnits = ['km/h', 'mi/h', 'KM'];
  public user$: Observable<User>;
  public site$: Observable<string>;
  public group$: Observable<string>;
  public selectedUserSite: any;
  public selectedUserGroup: any;
  public resultType$: Observable<ResultType[]>;
  public truckFunctionAreaList$: Observable<TruckFunctionArea[]>;
  public truckFunctionList = [];
  private getUserId: string;
  public currentDate = new Date();
  public testCaseInfo = {};
  public loading$: Observable<boolean>;
  public selectedFile: File;
  public uploadSuccess: boolean = false;
  public hasAttachment: boolean = false;
  public testCaseVersion: any;
  public isTruckFnDisable: boolean;
  public uploadedFileName: string;
  public pageType: string = 'testCase';
  public selectedTruckArea: any;
  public selectedTruckFunction: any;
  public privateTestCase: any;
  public disableSave: boolean = false;
  public tagAdded: boolean;
  public testCaseForm: FormGroup;
  public toolAdded: boolean;
  public fileDetailsObj = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<TestCaseDetailsState>,
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private ngModal: NgbModal,
    private fileUploadService: FileUploadService) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.testCaseForm.untouched;
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
      this.testCaseForm.markAsTouched();
    }
    this.tagAdded = value;
  }

  onToolAdded(value) {
    if (value) {
      this.testCaseForm.markAsTouched();
    }
    this.toolAdded = value;
  }

  buildTestCaseForm() {
    this.testCaseForm =  this.formBuilder.group({
      id: '',
      testCaseStepType: 'TEST_CASE',
      testCaseStepSite: '',
      testCaseStepUserGroup: '',
      testCaseStepVersion: [],
      currentTestCaseStepVersion:  this.formBuilder.group({
        category: ['STANDARD', Validators.required],
        changeInfo: {},
        level: 1,
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
        testCaseStepProductClassFilter:  [[]],
        testCaseStepResultTypeTC: new FormArray([
          new FormControl({name: 'OK/NOK'})
        ]),
        versionNo:  1,
        testCaseStepTags: [],
        testCaseStepTools: [],
        testCaseStepTruckFunction: {
          id: 0,
          name: '',
          testCaseStepTruckFunctionArea: {
            id: 0,
            name: '',
          }
        },
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
    this.testCaseDetails$ = this.store.select(testCaseDetailsSelector);
    this.user$ = this.store.select(userSelector);
    this.site$ = this.store.select(updateUserSiteSelector);
    this.group$ = this.store.select(updateUserGroupSelector);
    this.resultType$ =  this.store.select(testCaseResultTypeSelector);
    this.truckFunctionAreaList$ = this.store.select(tcTruckFunctionAreaSelector);
    this.loading$ = this.store.select(loaderSelector);
    if (this.isCreate) {
      this.testCaseDetails$
        .take(2)
        .subscribe((details: TestCaseStepDetails) => {
          if (details.hasOwnProperty('currentTestCaseStepVersion')) {
            if (details.currentTestCaseStepVersion.speed.speedValue === '') {
              details.currentTestCaseStepVersion.speed.speedUnit = '';
            }
          }
        });
      this.selectedTruckArea = 0;
      this.selectedTruckFunction = '';
      this.isTruckFnDisable = true;
      this.sessionStorageService.getItem('userGroup').subscribe( userGroup =>  this.selectedUserGroup = userGroup );
      this.sessionStorageService.getItem('userSite').subscribe( userSite =>  this.selectedUserSite = userSite );
    }
    this.buildTestCaseForm();
    this.store.dispatch(new GetResultTypeTestCase());
    this.store.dispatch(new GetTruckFunctionArea());
    this.route.params
      .map(params => params.id)
      .filter(id => !!id)
      .subscribe(id => {
        this.isCreate = false;
        this.disableSave = true;
        this.store.dispatch(new GetTestCaseDetails(id));
      });
    this.store.dispatch(new UpdateTestCaseDetailsForm(this.testCaseForm.value));
    this.testCaseDetails$
      .take(2)
      .subscribe((details: TestCaseStepDetails) => {
        if (details.hasOwnProperty('currentTestCaseStepVersion')) {
          this.privateTestCase = details.currentTestCaseStepVersion['privateTestCaseStep'];
          this.hasAttachment =  true;
          if (this.privateTestCase) {
            this.testCaseForm.get('currentTestCaseStepVersion.privateTestCaseStep').enable();
          } else {
            this.testCaseForm.get('currentTestCaseStepVersion.privateTestCaseStep').disable();
          }
        }
      });
  }

  ngDoCheck() {
    if (this.testCaseForm && this.testCaseForm.dirty || this.tagAdded || this.toolAdded ) {
      this.disableSave = false;
      this.tagAdded = false;
      this.toolAdded = false;
    }
  }

  checkIsEmpty(value) {
    return  value === undefined ||  value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0);
  }

  ngAfterViewInit() {
    this.testCaseDetails$
      .take(2)
      .subscribe((details: TestCaseStepDetails) => {
        if (details.hasOwnProperty('currentTestCaseStepVersion')) {
          this.testCaseInfo = details.currentTestCaseStepVersion['changeInfo'];
          if (details.currentTestCaseStepVersion.testCaseStepUploadFile &&
            details.currentTestCaseStepVersion.testCaseStepUploadFile.length > 0) {
            this.hasAttachment =  true;
            this.uploadedFileName = details.currentTestCaseStepVersion.testCaseStepUploadFile[0].fileName || '';
            this.fileDetailsObj = details.currentTestCaseStepVersion.testCaseStepUploadFile;
          }
        }
        this.testCaseForm.patchValue(details);

        if (!this.isCreate) {
          this.testCaseInfo = details.currentTestCaseStepVersion ? details.currentTestCaseStepVersion['changeInfo'] : {};
          if ( details.currentTestCaseStepVersion && details.currentTestCaseStepVersion['testCaseStepTruckFunction'] !== null) {
            this.isTruckFnDisable = false;
              const areaTruck = details.currentTestCaseStepVersion['testCaseStepTruckFunction']['testCaseStepTruckFunctionArea'];
              if (areaTruck.id !== null) {
                this.selectedTruckArea = areaTruck.id;
              }
              this.onSelectTruckFunctionArea(details, '');
          } else if (details.currentTestCaseStepVersion && details.currentTestCaseStepVersion['testCaseStepTruckFunction'] === null) {
           details.currentTestCaseStepVersion['testCaseStepTruckFunction'] = {};
          }
        }
      });
    this.testCaseForm.valueChanges
      .subscribe(testCaseDetails => {
        this.store.dispatch(new UpdateTestCaseDetailsForm(testCaseDetails));
        if (testCaseDetails.hasOwnProperty('currentTestCaseStepVersion')) {
          this.testCaseVersion = testCaseDetails.currentTestCaseStepVersion.versionNo;
        }
      });
    this.baseUrl = 'http://' + this.baseApiUrl.split('/')[2];
}

  onFormValueChange(): void {
      this.testCaseForm.markAsTouched();
  }

  onSelectTruckFunctionArea(details, event): void {
    const updateTruckFunction = {
      id: details ? details.currentTestCaseStepVersion['testCaseStepTruckFunction']['id'] : null,
      name: details ? details.currentTestCaseStepVersion['testCaseStepTruckFunction']['name'] : null,
      testCaseStepTruckFunctionArea: null
    };
    if ( this.selectedTruckArea > 0 ) {
      this.isTruckFnDisable = false;
      this.truckFunctionAreaList$.subscribe(truckFunctionArea => {
        truckFunctionArea.filter( area => {
          if ( area.id === this.selectedTruckArea) {
            this.truckFunctionList = area['truckFunction'];
            if ( this.isCreate || (!this.isCreate && details === '')) {
              this.selectedTruckFunction = this.truckFunctionList[0];
            } else {
              this.selectedTruckFunction = updateTruckFunction;
            }
          }
        });
      });

    } else {
      this.isTruckFnDisable = true;
      this.selectedTruckFunction = {};
      this.testCaseForm.markAsTouched();
    }
    // this.testCaseForm.markAsTouched();
    if (event) {
      this.disableSave = false;
    }
  }

  onSelectTruckFunction() {
    this.disableSave = false;
    this.testCaseForm.markAsTouched();
  }
  handleTruckFunctionData() {
    let updateTruckData;
    if ( this.selectedTruckFunction  && this.selectedTruckFunction ) {
      updateTruckData = {
        id : this.selectedTruckFunction.id,
        name : this.selectedTruckFunction.name,
        testCaseStepTruckFunctionArea : {
          id : this.selectedTruckArea.id,
          name : this.selectedTruckArea.name
        }
      };
    } else {
      updateTruckData = {};
    }
    this.testCaseForm.patchValue( { currentTestCaseStepVersion: {testCaseStepTruckFunction : updateTruckData}});
  }

  removeFileAttachment(value) {
    event.preventDefault();
    const index = this.fileDetailsObj.indexOf(value, 0);
    if (index > -1) {
      this.fileDetailsObj.splice(index, 1);
    }
    this.disableSave = false;
  }

  onSave(value): void {
    if (this.testCaseForm.valid) {
      // this.testCaseForm.markAsPristine();
      this.testCaseForm.markAsUntouched();
      this.handleTruckFunctionData();
      let changeInfo;
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
      this.testCaseForm.patchValue({currentTestCaseStepVersion: {changeInfo: changeInfo}});
      this.testCaseForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': this.fileDetailsObj}});
      this.testCaseForm.controls['testCaseStepVersion'].setValue([this.testCaseForm.controls['currentTestCaseStepVersion'].value]);
      this.disableSave = true;
      if (this.isCreate) {
        this.testCaseForm.controls['id'].setValue(0);
        // this.testCaseForm.controls['testCaseStepUserGroup'].setValue({
        //   groupId: this.selectedUserGroup,
        //   groupName: this.selectedUserGroup
        // });
        // this.testCaseForm.controls['testCaseStepSite'].setValue({
        //   siteId: this.selectedUserSite,
        //   siteName: this.selectedUserSite
        // });
        this.sessionStorageService.getItem('userGroup').subscribe( testGroup => {
          this.testCaseForm.controls['testCaseStepUserGroup'].setValue({
            groupId: testGroup,
            groupName: testGroup
          });
        });
        this.sessionStorageService.getItem('userSite').subscribe( testSite => {
          this.testCaseForm.controls['testCaseStepSite'].setValue({
            siteId: testSite,
            siteName: testSite
          });
        });
        this.store.dispatch(new CreateTestCase());
      } else if (this.isCopy) {
        this.testCaseForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': this.fileDetailsObj}});
        this.isCopy = false;
        this.store.dispatch(new CreateTestCaseCopy());
      } else {
        this.testCaseForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': this.fileDetailsObj}});
        this.store.dispatch(new UpdateTestCase());
      }
    } else {
      const formControlList = this.testCaseForm.controls['currentTestCaseStepVersion'] as FormGroup;
      Object.keys( formControlList.controls).forEach(key => {
        formControlList.controls[key].markAsTouched({ onlySelf: true });
      });
    }

    this.testCaseDetails$
      .take(2)
      .subscribe((details: TestCaseStepDetails) => {
        if (details.hasOwnProperty('currentTestCaseStepVersion')) {
          this.privateTestCase = details.currentTestCaseStepVersion['privateTestCaseStep'];
          if (this.privateTestCase === true) {
            this.testCaseForm.get('currentTestCaseStepVersion.privateTestCaseStep').enable();
          } else {
            this.testCaseForm.get('currentTestCaseStepVersion.privateTestCaseStep').disable();
          }
        }
      });
  }

  deleteTestCase() {
    this.store.dispatch(new DeleteTestCase(this.testCaseForm.value));
  }

  onCreateCopyTestCase() {
    this.testCaseForm.controls['id'].setValue(0);
    this.testCaseForm.patchValue({currentTestCaseStepVersion: {id: 0, versionNo: 1}});
    this.isCopy = true;
    this.isCreate = false;
    Observable.combineLatest(this.group$,  this.site$,
      (userGroup, userSite) => {
        return {userGroup, userSite};
      }).subscribe(({userGroup, userSite}) => {
      this.testCaseForm.controls['testCaseStepUserGroup'].setValue({
        groupId: userGroup,
        groupName: userGroup
      });
      this.testCaseForm.controls['testCaseStepSite'].setValue({
        siteId: userSite,
        siteName: userSite
      });
    });
  }

  getField(field: string) {
    return this.testCaseForm.get(field);
  }

  showVariant() {
    this.showVariantTemplate = true;
  }

  compare(option: any, value: any) {
    return isEqual(option, value);
  }

  open(template) {
    this.ngModal.open(template, {
      size: 'lg',
    });
  }

  numbersOnly(event: any) {
    const pattern = /[0-9\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  closeVariantTemplate() {
    this.showVariantTemplate = false;
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
            this.testCaseForm.patchValue({'currentTestCaseStepVersion': { 'testCaseStepUploadFile': [res] || []}});
            this.uploadedFileName = res['fileName'];
          }
        }, 100);
      });
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearTestCaseDetails());
    this.buildTestCaseForm();
  }

  get name() { return this.getField('currentTestCaseStepVersion.name'); }
  get testCaseStepResultTypeTC() { return this.testCaseForm.get('currentTestCaseStepVersion.testCaseStepResultTypeTC') as FormArray; }
  get currentTestCaseStepVersion() { return this.testCaseForm.get('currentTestCaseStepVersion') as FormGroup; }
}

