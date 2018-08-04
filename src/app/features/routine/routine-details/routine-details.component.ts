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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { isEqual } from 'lodash';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import { Observable } from 'rxjs/Observable';
import {User, UserRole} from '../../../core/services/user/user.model';
import {
  ClearRoutineDetails,
  CreateRoutine,
  CreateRoutineCopy,
  DeleteRoutine,
  GetRoutineDetails,
  GetRoutineResultType,
  UpdateRoutine,
  UpdateRoutineForm,
  UpdateUserGroup,
  UpdateUserSite
} from './routine-details.action';
import {
  DefaultRoutineCategoryOption,
  DefaultRoutineStatusOption,
  RoutineAttachmentOptions,
  RoutineCategoryOptions,
  RoutineDetails,
  RoutinePrivateOptions,
  RoutineResultType,
  RoutineStatusOptions,
} from './routine-details.model';
import {
  loaderSelector,
  resultTypeSelector,
  routineDetailsSelector,
  RoutineDetailsState,
  updateUserGroupSelector,
  updateUserSiteSelector
} from './routine-details.reducer';
import {roleSelector, userSelector} from '../../../core/services/user/user.reducer';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { ComponentCanDeactivate } from '../../../core/guards/prevent-unsaved-changes-guard';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import {TryUserLogin} from '../../login/login.actions';
import {accessTokenSelector} from '../../login/login.reducer';



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tm-routine-details',
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.scss']
})
export class RoutineDetailsComponent implements OnInit, OnDestroy, ComponentCanDeactivate, DoCheck , AfterViewInit {
  @ViewChild('fileInput') fileInput;
  @ViewChild('activitiesList') input;
  public baseApiUrl = window.location.href;
  public baseUrl: string;
  public routineDetails$: Observable<RoutineDetails>;
  public getResultType$: Observable<RoutineResultType[]>;
  public routineForm: FormGroup;
  public isCreate: boolean = true;
  public isCopy: boolean = false;
  public selectedRoutineGroup: any;
  public routineId: number = 0;
  public versionNumber: number = 1;
  public selectedRoutineSite: any;
  public routineInfo = {};
  public enableDeleteRoutine: boolean = true;
  public disableCreateCopy: boolean;
  public routineStatusOptions = RoutineStatusOptions;
  public routineCategoryOptions = RoutineCategoryOptions;
  public routineAttachmentOptions = RoutineAttachmentOptions;
  public routinePrivateOptions = RoutinePrivateOptions;
  public defaultRoutineCategoryOption = DefaultRoutineCategoryOption;
  public defaultRoutineStatusOption = DefaultRoutineStatusOption;
  public site$: Observable<string>;
  public routineVersion: any;
  // public changeInfo: {};
  public group$: Observable<string>;
  public user$: Observable<User>;
  private getUserId: string;
  public pageType: string = 'routine';
  public firstName: string;
  public lastName: string;
  public fileDetailsObj = [];
  public uploadedFileName: string;
  public activities: {};
  public currentDate = new Date();
  public disableSave: boolean = false;
  public uploadSuccess: boolean = false;
  public hasAttachment: boolean = false;
  public activityAdded: boolean;
  public roles$: Observable<UserRole[]>;
  public loading$: Observable<boolean>;
  public selectedFile: File;
  public privateRoutineData: any;
  public activitiesListArray = [];
  public addDisabled: boolean = true;
  public hiddenTableHeader: Boolean = false;
  constructor(private ngModal: NgbModal,
              private route: ActivatedRoute,
              private store: Store<RoutineDetailsState>,
              private formBuilder: FormBuilder,
              private sessionStorageService: SessionStorageService,
              private fileUploadService: FileUploadService) {
  }

  @HostListener('window:beforeunload')

  canDeactivate(): Observable<boolean> | boolean {
    return this.routineForm.pristine;
  }

  onUserGroupChange(value) {
    this.store.dispatch(new UpdateUserGroup(value));
    if ( this.isCreate || this.isCopy) {
      // this.disableSave = false;
    }
    this.sessionStorageService.setItem('userGroup', value);
  }

  onUserSiteChange(value) {
    this.store.dispatch(new UpdateUserSite(value));
    if ( this.isCreate || this.isCopy) {
      // this.disableSave = false;
    }
    this.sessionStorageService.setItem('userSite', value);
  }
  onActivityAdded(value) {
    this.activityAdded = value;
  }
  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.routineDetails$ = this.store.select(routineDetailsSelector);
    this.getResultType$ = this.store.select(resultTypeSelector);
    this.user$ = this.store.select(userSelector);
    this.site$ = this.store.select(updateUserSiteSelector);
    this.group$ = this.store.select(updateUserGroupSelector);
    this.loading$ = this.store.select(loaderSelector);
    this.roles$ = this.store.select(roleSelector);
    this.routineForm = this.formBuilder.group({
      id: '',
      objectRoutineVersion: [[]],
      objectCurrentRoutineVersion:  this.formBuilder.group({
        attachmentRequired: ['false', Validators.required],
        category:  [this.defaultRoutineCategoryOption.STANDARD, Validators.required],
        changeInfo: [{}],
        description: '',
        id: this.routineId,
        routineUploadFile: [],
        name: ['', Validators.required],
        privateRoutine: [false, Validators.required],
        routineActivity: [],
        routineResultTypeRoutine: new FormArray([
          new FormControl({name: 'Done/Not Done'})
        ]),
        status: [this.defaultRoutineStatusOption.ACTIVE, Validators.required],
        versionNo: this.versionNumber
      }),
      routineSite: '',
      routineUserGroup: '',
    });

    this.route.params
      .map(params => params.id)
      .filter(id => !!id)
      .subscribe(id => {
        this.isCreate = false;
        this.store.dispatch(new GetRoutineDetails(id));
      });

    this.store.dispatch(new GetRoutineResultType());

    this.routineDetails$
      .take(2)
      .subscribe((details: RoutineDetails) => {
        this.routineForm.patchValue(details);
        if (details.hasOwnProperty('objectCurrentRoutineVersion')) {
          this.privateRoutineData = details.objectCurrentRoutineVersion.privateRoutine;
          if (this.privateRoutineData) {
            this.routineForm.get('objectCurrentRoutineVersion.privateRoutine').enable();
              } else {
            this.routineForm.get('objectCurrentRoutineVersion.privateRoutine').disable();
              }
        }
  });

    if (this.isCreate) {
      this.sessionStorageService.getItem('userGroup').subscribe( routineGroup => {
        this.selectedRoutineGroup = routineGroup;
      });
      this.sessionStorageService.getItem('userSite').subscribe( routineSite => {
        this.selectedRoutineSite = routineSite;
      });

      this.routineDetails$
        .take(2)
        .subscribe((details: RoutineDetails) => {
          this.routineForm.patchValue(details);
          if (details.hasOwnProperty('objectCurrentRoutineVersion')) {
            this.privateRoutineData = details.objectCurrentRoutineVersion.privateRoutine;
            if (this.privateRoutineData) {
              this.routineForm.get('objectCurrentRoutineVersion.privateRoutine').enable();
            } else {
              this.routineForm.get('objectCurrentRoutineVersion.privateRoutine').enable();
            }
          }
        });

    }
    this.hiddenTableHeader = true;
}
  ngAfterViewInit() {
    this.routineDetails$
      .take(2)
      .subscribe((details: RoutineDetails) => {
        if (details.hasOwnProperty('objectCurrentRoutineVersion')) {
          this.routineInfo = details.objectCurrentRoutineVersion;
          if (details.objectCurrentRoutineVersion.routineActivity !== null) {
            this.activitiesListArray = details.objectCurrentRoutineVersion.routineActivity;
          }
          if (details.objectCurrentRoutineVersion.routineUploadFile && details.objectCurrentRoutineVersion.routineUploadFile.length > 0) {
            this.hasAttachment =  true;
            this.uploadedFileName = details.objectCurrentRoutineVersion.routineUploadFile[0].fileName || '';
            this.fileDetailsObj = details.objectCurrentRoutineVersion.routineUploadFile;
          }
        }
      });
    this.routineForm.valueChanges
    .subscribe(routineForm => {
      this.store.dispatch(new UpdateRoutineForm(routineForm));
      if (routineForm.hasOwnProperty('objectCurrentRoutineVersion')) {
        this.routineVersion = routineForm.objectCurrentRoutineVersion.versionNo;
      }
    });
    this.baseUrl = 'http://' + this.baseApiUrl.split('/')[2];
    this.roles$.subscribe( userRoles => {
      userRoles.forEach( role => {
        if (role.roleId === 'TEST_LEADER' || role.roleId === 'EDITOR') {
          this.disableSave = false;
          this.enableDeleteRoutine = true;
          this.disableCreateCopy = false;
        } else {
          this.disableSave = true;
          this.enableDeleteRoutine = false;
          this.disableCreateCopy = true;
        }
      });
    });
  }
  ngDoCheck() {
    if (this.routineForm && this.routineForm.dirty || this.activityAdded) {
      // this.disableSave = false;
      this.activityAdded = false;
    }
  }

  deleteRoutine() {
    this.store.dispatch(new DeleteRoutine(this.routineForm.value));
  }

  activitiesListAdd(value) {
    if (value !== null) {
      this.activitiesListArray.push({name: value});
    }
     this.addDisabled = true;
     this.disableSave = false;
  }
  enableAdd(value) {
    this.addDisabled = !(value !== null && value.trim() !== '');
  }

  removeFileAttachment(value) {
    event.preventDefault();
    const index = this.fileDetailsObj.indexOf(value, 0);
    if (index > -1) {
      this.fileDetailsObj.splice(index, 1);
    }
    this.disableSave = false;
  }

  deleteActivitiesList(value) {
    const index = this.activitiesListArray.indexOf(value, 0);
    if (index > -1) {
      this.activitiesListArray.splice(index, 1);
    }
    this.disableSave = false;
  }

  onSave() {
    if (this.routineForm.valid) {
      let changeInfo;
      this.routineForm.markAsPristine();
      this.user$.subscribe( res => {
        changeInfo = {
          changedByFirstName: res.firstName || null,
          changedByLastName: res.lastName || null,
          changedByUserId: res.userId,
          lastChanged: this.currentDate.getTime()
        };
        if ( this.routineInfo.hasOwnProperty('changeInfo') && !this.isCreate) {
          changeInfo.created = this.routineInfo['changeInfo']['created'];
        } else {
          changeInfo.created = this.currentDate.getTime();
          changeInfo.createdByUserId = res.userId;
        }
      });
      this.routineForm.patchValue({objectCurrentRoutineVersion: {changeInfo: changeInfo}});
      this.routineForm.patchValue({'objectCurrentRoutineVersion': { 'routineActivity': this.activitiesListArray}});
      this.routineForm.patchValue({'objectCurrentRoutineVersion': { 'routineUploadFile': this.fileDetailsObj}});
      this.disableSave = true;
      if (this.isCreate) {
        this.sessionStorageService.getItem('userGroup').subscribe( routineGroup => {
          this.routineForm.controls['routineUserGroup'].setValue({
            groupId: routineGroup,
            groupName: routineGroup
          });
        });
        this.sessionStorageService.getItem('userSite').subscribe( routineSite => {
          this.routineForm.controls['routineSite'].setValue({
              siteId: routineSite,
              siteName: routineSite
            });
        });
        this.store.dispatch(new CreateRoutine());
      } else if (this.isCopy) {
        this.routineForm.patchValue({'objectCurrentRoutineVersion': { 'routineUploadFile': this.fileDetailsObj}});
        this.isCopy = false;
        this.store.dispatch(new CreateRoutineCopy());
      } else {
        this.routineForm.patchValue({'objectCurrentRoutineVersion': { 'routineUploadFile': this.fileDetailsObj}});
        this.isCopy = false;
        this.store.dispatch(new UpdateRoutine());
      }
    } else {
      const formControlList = this.routineForm.controls['objectCurrentRoutineVersion'] as FormGroup;
      Object.keys( formControlList.controls).forEach(key => {
        formControlList.controls[key].markAsTouched({ onlySelf: true });
      });
    }

    this.routineDetails$
      .take(2)
      .subscribe((details: RoutineDetails) => {
        this.routineForm.patchValue(details);
        if (details.hasOwnProperty('objectCurrentRoutineVersion')) {
          this.privateRoutineData = details.objectCurrentRoutineVersion.privateRoutine;
          if (this.privateRoutineData === true) {
            this.routineForm.get('objectCurrentRoutineVersion.privateRoutine').enable();
          } else {
            this.routineForm.get('objectCurrentRoutineVersion.privateRoutine').disable();
          }
        }
      });
  }
  onCreateCopyRoutine() {
    this.routineForm.controls['id'].setValue(null);
    this.routineForm.patchValue({objectCurrentRoutineVersion: {id: 0, versionNo: 1}});
    this.isCopy = true;
    this.isCreate = false;
    Observable.combineLatest(this.group$,  this.site$,
      (routineUserGroup, routineSite) => {
        return {routineUserGroup, routineSite};
      }).subscribe(({routineUserGroup, routineSite}) => {
      this.routineForm.controls['routineUserGroup'].setValue({
        groupId: routineUserGroup,
        groupName: routineUserGroup
      });
      this.routineForm.controls['routineSite'].setValue({
        siteId: routineSite,
        siteName: routineSite
      });
    });
  }

  open(template) {

    this.ngModal.open(template, {
      size: 'lg',
    });
  }

  getField(field: string) {
    return this.routineForm.get(field);
  }

  compare(option: any, value: any) {
    return isEqual(option, value);
  }
  fileToUpload(value) {
    this.disableSave = false;
    this.selectedFile = <File>value.target.files[0];
    const fileBrowser  = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('uploadedFile', this.selectedFile, this.selectedFile.name);
      this.fileUploadService.upload(formData, this.pageType).subscribe(res => {
        this.fileDetailsObj.push(res);
        setTimeout( () => {
          if (res.hasOwnProperty('fileName')) {
            this.uploadSuccess = this.hasAttachment  = true;
            this.routineForm.patchValue({'objectCurrentRoutineVersion': { 'routineUploadFile': [res] || []}});
            this.uploadedFileName = res['fileName'];
          }
        }, 100);
      });
    }
  }

  get objectCurrentRoutineVersion() { return this.routineForm.get('objectCurrentRoutineVersion') as FormGroup; }
  get name() { return this.getField('objectCurrentRoutineVersion.name'); }
  get description() { return this.getField('objectCurrentRoutineVersion.description'); }
  get category() { return this.getField('objectCurrentRoutineVersion.category'); }
  get status() { return this.getField('objectCurrentRoutineVersion.status'); }
  get privateRoutine() { return this.getField('objectCurrentRoutineVersion.privateRoutine'); }
  get routineResultTypeRoutine() { return this.routineForm.get('objectCurrentRoutineVersion.routineResultTypeRoutine') as FormArray; }
  get attachmentRequired() {return this.getField ('objectCurrentRoutineVersion.attachmentRequired'); }

  ngOnDestroy() {
    this.store.dispatch(new ClearRoutineDetails());
  }

}
