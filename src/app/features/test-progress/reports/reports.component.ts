import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {ActivatedRoute} from '@angular/router';
import {
  CreateNewComments, CreateReports, DeleteComment, GetReports, UpdateComments, UpdateReport,
  UpdateReportsFilters
} from './reports.actions';
import {EnergyType, ReportCommentsModel, ReportMessageModel} from './reports.model';
import {loaderSelector, reportSelector, ReportsState} from './reports.reducer';
import {Store} from '@ngrx/store';
import {User} from '../../../core/services/user/user.model';
import {userSelector} from '../../../core/services/user/user.reducer';
import {testDetailsSelector} from '../../test/test-details/test-details.reducer';
import {TestDetails} from '../../test/test-details/test-details.model';
import {GetTestDetails} from '../../test/test-details/test-details.actions';
import {
  tcTruckFunctionAreaSelector,
  testCaseDetailsSelector
} from '../../test-case-step/test-case-detail/test-case-detail.reducer';
import {routineDetailsSelector} from '../../routine/routine-details/routine-details.reducer';
import {testStepDetailsSelector} from '../../test-case-step/test-step-detail/test-step-detail.reducer';
import {RoutineDetails} from '../../routine/routine-details/routine-details.model';
import {TestCaseStepDetails, TruckFunctionArea} from '../../test-case-step/test-case-detail/test-case-detail.model';
import {GetTestCaseDetails, GetTruckFunctionArea} from '../../test-case-step/test-case-detail/test-case-detail.actions';
import {GetTestStepDetails} from '../../test-case-step/test-step-detail/test-step-detail-actions';
import {GetRoutineDetails} from '../../routine/routine-details/routine-details.action';
import {map, pick, filter} from 'lodash';
import {SessionStorageService} from '../../../core/storage/session-storage.service';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import {IMyCalendarViewChanged, IMyDateRangeModel, IMyDrpOptions} from 'mydaterangepicker';
import {accessTokenSelector} from '../../login/login.reducer';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  selector: 'tm-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, ComponentCanDeactivate, AfterViewInit {
  @ViewChild('fileInput') fileInput;
  @ViewChild('fileNew') fileNew;
  @ViewChild('fileUpdate') fileUpdate;
  public baseApiUrl = window.location.href;
  public baseUrl: string;
  public reportForm: FormGroup;
  public isCreate: boolean = true;
  public isCopy: boolean = false;
  public hasComments: any = [];
  public newReportHidden: boolean = true;
  public hideNewReportBtn: boolean = false;
  public reportLists$: Observable<ReportMessageModel[]> ;
  public user$: Observable<User>;
  public testDetails$: Observable<TestDetails>;
  public reportTypeList = ['ACTIVITY' , 'BUG', 'FAULT', 'FUEL', 'OFD'];
  public reportItemType = ['TEST_CASE' , 'TEST_STEP', 'ROUTINE'];
  public versionData: any;
  public selectedTestSite: string;
  public selectedTestGroup: string;
  public testStepDetails$: Observable<TestCaseStepDetails>;
  public testCaseDetails$: Observable<TestCaseStepDetails>;
  public routineDetails$: Observable<RoutineDetails>;
  private reportForTestId: number;
  private getFilters: object;
  private getItemType: string;
  public itemIdNotFound: boolean;
  public showGear: boolean;
  public newComment: any = [];
  public showEditTextArea: any = [];
  private currentTime = new Date();
  private getUserId: string;
  public userCommentsText: string = '';
  public pageType: string = 'report';
  private uploadData = [];
  public selectedFile: File;
  public fileDetailsObj = [];
  public newFileDetailsObj = [];
  public updateFileDetailsObj = [];
  public uploadSuccess: boolean = false;
  public hasAttachment: boolean = false;
  public showEnergyVolume: boolean = false;
  public emptyTableForEnergy: boolean = false;
  public uploadedFileName: string;
  public energyTypeOptions: string[] = ['DIESEL', 'ADBLUE', 'LNG'];
  public energyType: string = this.energyTypeOptions[0];
  public volume: number = 1;
  public unitOptions: string[] = ['ltr', 'kg', 'gal', 'lb'];
  public unit: string = this.unitOptions[0];
  public energyVolumeArray = new Array();
  public truckFunctionAreaList$: Observable<TruckFunctionArea[]>;
  public truckFunctionList = [];
  public selectedTruckArea: string = '0';
  public selectedTruckFunction: string = '';
  public selectedReportType: string = '';
  public selectedReportName: string = '';
  public userName: object;
  public myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy-mm-dd',
    showClearDateRangeBtn: true
  };
  public loading$: Observable<boolean>;
  public dateModel: any = {};

  constructor(private route: ActivatedRoute,
              private store: Store<ReportsState>,
              private formBuilder: FormBuilder,
              private fileUploadService: FileUploadService,
              private sessionStorageService: SessionStorageService) { }

  canDeactivate(): Observable<boolean> | boolean {
    return this.reportForm.pristine;
  }

  buildReportForm(): void {
    this.reportForm = this.formBuilder.group({
      id: 0,
      sequenceName: ['', Validators.required],
      testItemType: ['', Validators.required],
      testItemId: [{value: '', disabled: true}, Validators.required],
      testItemVersion: [{value: '', disabled: true}, Validators.required],
      truckFunctionArea: '',
      truckFunction: '',
      name: '',
      reportType: ['FAULT', Validators.required],
      fuelEnergyType: [[]],
      odometer: '',
      unHandled: true,
      forEditor: true,
      reportSite: '',
      reportUserGroup: '',
      changeInfo: {},
      reportComments: new FormArray([
        this.formBuilder.group({
          id: 0,
          comment: ['', Validators.required],
          commentCreated: this.currentTime.getTime(),
          commentUploadFile: [],
          commentCreator: {}
        })
      ])
    });
  }

  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.loading$ = this.store.select(loaderSelector);
    this.sessionStorageService.getItem('Login:UserId').subscribe( res => {
      this.getUserId = (res) ? res.toString() : '';
    });
    this.reportLists$ = this.store.select(reportSelector);
    this.user$ = this.store.select(userSelector);
    this.testDetails$ = this.store.select(testDetailsSelector);
    this.routineDetails$ = this.store.select(routineDetailsSelector);
    this.testCaseDetails$ = this.store.select(testCaseDetailsSelector);
    this.testStepDetails$ = this.store.select(testStepDetailsSelector);
    this.truckFunctionAreaList$ = this.store.select(tcTruckFunctionAreaSelector);
    this.buildReportForm();
    this.route.params
      .map(params => params.testId)
      .filter(id => !!id)
      .subscribe(id => {
        this.reportForTestId = id;
        this.store.dispatch(new GetTestDetails(id));
        this.getFilters = {testId: id};
        this.store.dispatch(new UpdateReportsFilters(this.getFilters));
      });
    this.reportForm.controls['testItemId'].disable();
    this.reportForm.controls['testItemVersion'].disable();
    this.itemIdNotFound = this.showGear  = false;
    this.store.dispatch(new GetTruckFunctionArea());
  }

  ngAfterViewInit() {
    this.baseUrl = 'http://' + this.baseApiUrl.split('/')[2];
    this.user$.subscribe( user => {
     if (user) {
       this.userName = { firstName: user.firstName, lastName: user.lastName};
     }
    });
  }

  onCloseNewReport() {
    this.newReportHidden = true;
    this.hideNewReportBtn = false;
  }

  onOpenNewReport() {
    this.newReportHidden = false;
    this.hideNewReportBtn = true;
  }

  onTestTeamGroup(value): void {
    this.selectedTestGroup = value;
  }

  onTestTeamSite(value): void {
    this.selectedTestSite = value;
  }

  onSaveReport( ) {
    if (this.reportForm.valid) {
      this.reportForm.markAsPristine();
      this.user$.subscribe( res => {
        this.reportForm.controls['changeInfo'].setValue({
          changedByFirstName: res.firstName || null,
          changedByLastName: res.lastName || null,
          changedByUserId: this.getUserId,
          created: this.currentTime.getTime(),
          lastChanged: this.currentTime.getTime()
        });
        this.reportComments.at(0).patchValue({
          commentCreator: {firstName: res.firstName, lastName: res.lastName},
          commentUploadFile: this.fileDetailsObj
        });
      });
      this.testDetails$.subscribe( testDetails => {
        this.reportForm.controls['reportSite'].setValue(testDetails.testSite);
        this.reportForm.controls['reportUserGroup'].setValue(testDetails.testUserGroup);
      });
      if (this.showEnergyVolume) {
        this.emptyTableForEnergy = this.energyVolumeArray.length === 0;
        this.reportForm.controls['fuelEnergyType'].setValue(this.energyVolumeArray);
      } else {
        this.energyVolumeArray = [];
        this.emptyTableForEnergy =  false;
        this.reportForm.controls['fuelEnergyType'].setValue([]);
      }
      if (this.showEnergyVolume && !this.emptyTableForEnergy) {
        this.store.dispatch(new CreateReports(this.reportForTestId, this.reportForm.value));
        this.onResetFormFields();
      } else if (!this.showEnergyVolume && this.emptyTableForEnergy === false) {
        this.store.dispatch(new CreateReports(this.reportForTestId, this.reportForm.value));
        this.onResetFormFields();
      }
    } else {
      Object.keys(this.reportForm.controls).forEach(field => {
        const control = this.reportForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      const reportComments = this.reportForm.get('reportComments') as FormArray;
      Object.keys(reportComments.controls).forEach( field => {
        const controlArray = reportComments.get(field);
        controlArray.markAsTouched({ onlySelf: true });
      });
      if (this.showEnergyVolume) {
        this.emptyTableForEnergy = this.energyVolumeArray.length === 0;
      }
    }
  }

  onChangeItemType(event): void {
    this.getItemType = event.target.value;
    if (this.getItemType !== '') {
      this.reportForm.controls['testItemId'].enable();
      this.reportForm.patchValue({'name': ''});
      if (this.reportForm.controls['testItemId'].value !== '') {
        this.onItemIdInput();
      }
    } else {
      this.reportForm.controls['testItemId'].disable();
    }
  }

  onChangeReportType(): void {
    const reportTypeValue =  this.reportForm.controls['reportType'].value;
    this.showEnergyVolume = reportTypeValue === 'FUEL';
  }

  itemIdDataHandler(asyncData): void {
    this.showGear = false;
    this.itemIdNotFound = false;
    this.reportForm.controls['testItemVersion'].enable();
    this.versionData = asyncData.testCaseStepVersion || asyncData.objectRoutineVersion || [];
  }

  onItemIdInput(): void  {
    this.showGear = true;
    const itemId = this.reportForm.controls['testItemId'].value;
      if (this.getItemType === 'TEST_CASE' && itemId !== '') {
        this.store.dispatch(new GetTestCaseDetails(itemId));
        this.testCaseDetails$
          .debounceTime(500)
          .subscribe(details => {
           if (details.hasOwnProperty('id')) {
             this.itemIdDataHandler(details);
           } else {
             this.itemIdNotFound = true;
             this.showGear = false;
           }
          });
      } else if (this.getItemType === 'TEST_STEP' && itemId !== '') {
        this.store.dispatch( new GetTestStepDetails(itemId));
        this.testStepDetails$
          .debounceTime(500)
          .subscribe(details => {
            if (details.hasOwnProperty('id')) {
              this.itemIdDataHandler(details);
            } else {
              this.itemIdNotFound = true;
              this.showGear = false;
            }
          });
      } else if (this.getItemType === 'ROUTINE' && itemId !== '') {
        this.store.dispatch( new GetRoutineDetails(itemId));
        this.routineDetails$
          .debounceTime(500)
          .subscribe(details => {
            if (details.hasOwnProperty('id')) {
              this.itemIdDataHandler(details);
            } else {
              this.itemIdNotFound = true;
              this.showGear = false;
            }
          });
      }
  }

  onVersionNoChange(): void  {
   const versionNum = this.reportForm.controls['testItemVersion'].value;
    this.versionData.filter( item => {
      if ( item.versionNo === versionNum) {
        this.reportForm.patchValue({name: item.name});
        if (item.hasOwnProperty('testCaseStepTruckFunction') && item.testCaseStepTruckFunction) {
          this.reportForm.controls['truckFunction'].setValue(item.testCaseStepTruckFunction.name);
          this.reportForm.controls['truckFunctionArea'].setValue(item.testCaseStepTruckFunction.testCaseStepTruckFunctionArea.name);
        }
      }
    });
  }

  onSaveUserComment(getReportId, rowIndex): void  {
    const fileBrowser  = this.fileNew.nativeElement;
    this.selectedFile = fileBrowser.files[0];
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('uploadedFile', this.selectedFile, this.selectedFile.name);
      this.fileUploadService.upload(formData, this.pageType).subscribe(res => {
        this.newFileDetailsObj.push(res);
        setTimeout( () => {
          if (res.hasOwnProperty('fileName')) {
            this.uploadSuccess = this.hasAttachment  = true;
            this.uploadedFileName = res['fileName'];
            this.uploadData.push(res);
          }
        }, 100);
      });
    }
    const commentPayload = {
      id: 0,
      comment: this.userCommentsText,
      commentCreated: this.currentTime.getTime(),
      commentUploadFile: this.newFileDetailsObj
    };
    this.user$.subscribe( res => {
      commentPayload['commentCreator'] = {firstName: res.firstName, lastName: res.lastName};
    });
    this.store.dispatch(new CreateNewComments(getReportId, commentPayload));
    this.userCommentsText = '';
    this.reportLists$.subscribe( res => {
      if ( res.length > 0) {
        this.newComment[rowIndex] = false;
      }
    });
  }

  onDeleteComment(commentId: number) {
    this.store.dispatch( new DeleteComment(commentId));
  }

  onRemoveFileAttachment(value) {
    event.preventDefault();
    const index = this.fileDetailsObj.indexOf(value, 0);
    if (index > -1) {
      this.fileDetailsObj.splice(index, 1);
    }
  }

  fileToUpload(value) {
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
            this.uploadedFileName = res['fileName'];
            this.uploadData.push(res);
          }
        }, 100);
      });
    }
  }

  onEditComments(commentsStr: string, rowIndex: number): void {
    this.hasComments[rowIndex] = !this.hasComments[rowIndex];
    this.showEditTextArea[rowIndex] =  !this.showEditTextArea[rowIndex];
    this.userCommentsText = commentsStr;
  }

  onUpdateComments(comments: ReportCommentsModel, rowIndex: number): void {
    const fileBrowser  = this.fileUpdate.nativeElement;
    this.selectedFile = fileBrowser.files[0];
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('uploadedFile', this.selectedFile, this.selectedFile.name);
      this.fileUploadService.upload(formData, this.pageType).subscribe(res => {
        this.updateFileDetailsObj.push(res);
        setTimeout( () => {
          if (res.hasOwnProperty('fileName')) {
            this.uploadSuccess = this.hasAttachment  = true;
            this.uploadedFileName = res['fileName'];
            this.uploadData.push(res);
          }
        }, 100);
      });
    }
    const upDateComments =  comments;
    const upDateFile = this.updateFileDetailsObj;
    upDateComments.comment = this.userCommentsText;
    upDateComments['commentUploadFile'] = upDateFile;
    this.store.dispatch(new UpdateComments(upDateComments));
    this.showEditTextArea[rowIndex] =  !this.showEditTextArea[rowIndex];
    this.userCommentsText = '';
    this.hasComments[rowIndex] = !this.hasComments[rowIndex];
  }

  onAddEnergyVolume(): void {
    const data = {
      id: 0,
      energyType: this.energyType,
      volume: this.volume,
      unit: this.unit
    };
    this.energyVolumeArray.push(data);
    this.emptyTableForEnergy =  false;
  }

  onRemoveEnergyVolume(index): void {
    this.energyVolumeArray.splice(index, 1);
  }

  onSelectTruckFunctionArea(details, event): void {
      this.truckFunctionAreaList$.subscribe(truckFunctionArea => {
        truckFunctionArea.filter( area => {
          if ( area.id === this.selectedTruckArea) {
            this.truckFunctionList = area['truckFunction'];
            this.getFilters['truckFunctionArea'] = area.name;
            this.store.dispatch(new UpdateReportsFilters(this.getFilters));
          }
        });
      });
  }

  onTableFilterChange(filterName: string , filterValue: string): void {
    this.getFilters[filterName] = filterValue;
    this.store.dispatch(new UpdateReportsFilters(this.getFilters));
  }

  onClearFilter(): void {
    this.getFilters = pick(this.getFilters, ['testId']);
    this.store.dispatch(new UpdateReportsFilters(this.getFilters));
    this.selectedTruckArea = '0';
    this.selectedTruckFunction = '';
    this.selectedReportType = '';
    this.selectedReportName = '';
    this.dateModel = {};
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    const startDate =  new Date(event.beginDate.year, event.beginDate.month - 1, event.beginDate.day);
    const endDate =  new Date(event.endDate.year, event.endDate.month - 1, event.endDate.day);
    this.getFilters['fromDate'] = startDate.getTime();
    this.getFilters['tillDate'] = endDate.getTime();
  }

  onChangeReportHandled(isHandled, reportData): void {
    reportData.unHandled = isHandled;
    this.store.dispatch(new UpdateReport(reportData));
  }

  onResetFormFields(): void {
    this.buildReportForm();
    this.hasAttachment = this.uploadSuccess = false;
    this.fileInput.nativeElement.value = '';
    this.reportForm.controls['testItemId'].markAsPristine();
    this.reportForm.controls['testItemId'].disable();
    this.reportForm.controls['testItemVersion'].disable();
  }

  numbersOnly(event: any) {
    const pattern = /[0-9\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getField(field: string) {
    return this.reportForm.get(field);
  }

  onInputFieldChanged(event: IMyCalendarViewChanged) {
    if (event['valid']) {
      this.store.dispatch( new UpdateReportsFilters( this.getFilters));
    } else {
      this.getFilters['fromDate'] = '';
      this.getFilters['tillDate'] = '';
      this.store.dispatch( new UpdateReportsFilters( this.getFilters));
    }
  }

  get sequenceName() { return this.getField('sequenceName'); }
  get testItemType() { return this.getField('testItemType'); }
  get testItemId() { return this.getField('testItemId'); }
  get testItemVersion() { return this.getField('testItemVersion'); }
  get odometer() { return this.getField('odometer'); }
  get reportType() { return this.getField('reportType'); }
  get reportComments() { return this.reportForm.get('reportComments')as FormArray ; }
  get comment() { return this.getField('reportComments.comment'); }
}
