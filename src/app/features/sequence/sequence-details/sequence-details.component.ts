import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck, EventEmitter,
  HostListener,
  OnDestroy,
  OnInit, Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {SequenceDetails, TrackList} from './sequence-details.model';
import { TestCaseStep } from './add-sequence-preconditions/test-case-step/test-case-step.model';
import { Store } from '@ngrx/store';
import { find } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { userSelector } from '../../../core/services/user/user.reducer';
import { User } from '../../../core/services/user/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sequence } from '../sequence-overview/sequence-overview.model';
import {
  getParentSequenceSelector,
  loaderSelector,
  sequenceDetailsSelector,
  SequenceDetailsState,
  sequenceTrackSelector,
} from './sequence-details.reducer';
import { testCaseListSelector,
  paginationTestCaseListSelector
} from './add-sequence-preconditions/test-case-step/test-case-step.reducer';
import {
  CheckForParentSequence,
  ClearSequenceDetails,
  CreateSequence,
  CreateSequenceCopy,
  DeleteSequence,
  GetSequenceDetails,
  GetTrackList,
  UpdateSequenceDetails,
  UpdateSequenceDetailsForm
} from './sequence-details.actions';
import { UpdateTestCaseListFilters } from './add-sequence-preconditions/test-case-step/test-case-step.actions';
import {PaginationParameters} from '../../../core/interfaces/pagination-params.i';
import {accessTokenSelector} from '../../login/login.reducer';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tm-sequence-details',
  templateUrl: './sequence-details.component.html',
  styleUrls: ['./sequence-details.component.scss']
})
export class SequenceDetailsComponent implements OnInit, AfterViewInit, OnDestroy , DoCheck {
  @ViewChild('confirmDelete')confirmDeleteTempRef: TemplateRef<any>;
  @ViewChild('canNotDelete')canNotDeleteTempRef: TemplateRef<any>;
  @Output() testCaseStepAdded: EventEmitter<boolean> = new EventEmitter();

  public selectedTableData: any;
  public sequenceDetails$: Observable<SequenceDetails>;
  public testCaseList$: Observable<TestCaseStep[]>;
  public trackList$: Observable<TrackList[]>;
  public getSequenceParents$: Observable<Sequence[]>;
  public sequenceForm: FormGroup;
  public paginationTestCase: Observable<PaginationParameters>;
  public sequenceLevel = ['1', '2', '3'];
  public trackDirection = ['CLOCKWISE', 'ANTICLOCKWISE'];
  public categoryOptions = ['STANDARD', 'DEVELOPMENT'];
  public sequenceOptions = [{ id: 'YES', value: true}, {id: 'NO', value: false}];
  public isCreate: boolean = true;
  public isCopy: boolean = false;
  public selectedSequenceGroup: any;
  public selectedSequenceSite: any;
  public isCategory: boolean = false;
  public isLevel: boolean = false;
  public isDisable: boolean = true;
  public isDisableAll: boolean = false;
  public user$: Observable<User>;
  private getUserId: string;
  public testCaseFilters = {};
  public selectedTrack: string = '';
  public currentDate = new Date();
  public sequenceInfo = {};
  public loading$: Observable<boolean>;
  public disableSave: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private store: Store<SequenceDetailsState>,
              private route: ActivatedRoute,
              private sessionStorageService: SessionStorageService,
              private ngModal: NgbModal) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.sequenceForm.untouched ;
  }

  onTestTeamGroup(value) {
    if ( this.isCreate || this.isCopy) {
      this.disableSave = false;
    }
    this.sessionStorageService.setItem('userGroup', value);
  }

  onTestTeamSite(value) {
    if ( this.isCreate || this.isCopy) {
      this.disableSave = false;
    }
    this.sessionStorageService.setItem('userSite', value);
    this.store.dispatch( new GetTrackList(value));
  }

  onSave(formValue) {
    if (this.sequenceForm.valid) {
        let changeInfo;
        const checkTestCaseCategory = this.sequenceForm.controls['testCaseCategory'].value;
        this.sequenceForm.markAsPristine();
        this.sequenceForm.markAsUntouched();
        this.user$.subscribe( res => {
          changeInfo = {
            changedByFirstName: res.firstName || null,
            changedByLastName: res.lastName || null,
            changedByUserId: res.userId,
            lastChanged: this.currentDate.getTime()
          };
          if ( this.sequenceInfo && !this.isCreate) {
            changeInfo.created = this.sequenceInfo['created'];
          } else {
            changeInfo.created = this.currentDate.getTime();
            changeInfo.createdByUserId = res.userId;
          }
        });
        this.sequenceForm.patchValue({changeInfo: changeInfo});
        this.disableSave = true;
        if ( this.isCreate) {
          this.sessionStorageService.getItem('userGroup').subscribe( testGroup => {
            this.sequenceForm.controls['sequenceUserGroup'].setValue({
              groupId: testGroup,
              groupName: testGroup
            });
          });
          this.sessionStorageService.getItem('userSite').subscribe( testSite => {
            this.sequenceForm.controls['sequenceSite'].setValue({
              siteId: testSite,
              siteName: testSite
            });
          });
          this.store.dispatch(new CreateSequence());
        } else if (this.isCopy) {
          this.sessionStorageService.getItem('userGroup').subscribe( testGroup => {
            this.sequenceForm.controls['sequenceUserGroup'].setValue({
              groupId: testGroup,
              groupName: testGroup
            });
          });
          this.sessionStorageService.getItem('userSite').subscribe( testSite => {
            this.sequenceForm.controls['sequenceSite'].setValue({
              siteId: testSite,
              siteName: testSite
            });
          });
          this.isCopy = false;
          this.store.dispatch(new CreateSequenceCopy());
        } else {
          this.store.dispatch( new UpdateSequenceDetails());
        }

    } else {
      Object.keys(this.sequenceForm.controls).forEach(field => {
        const control = this.sequenceForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  getParentSequenceToDelete() {
    this.store.dispatch(new CheckForParentSequence(this.sequenceForm.controls['id'].value));
    this.getSequenceParents$
      .take(1)
      .subscribe( res => {
       if (res) {
         if (res.length === 0) {
           this.open(this.confirmDeleteTempRef);
         } else {
           this.open(this.canNotDeleteTempRef);
         }
       }
      });
  }

  onDeleteSequence() {
    this.store.dispatch(new DeleteSequence(this.sequenceForm.controls['id'].value));
  }

  getSelectedTableData(data) {
    this.selectedTableData = data;
  }

  addAllTestCase() {
    this.testCaseList$
      .first()
      .withLatestFrom(this.sequenceDetails$)
      .subscribe(([testCaseList, sequenceDetails]) => {
        const testCaseArray = [];
        const getSequenceLineLength = sequenceDetails.sequenceLines ? sequenceDetails.sequenceLines.length : 0;
        for ( const item of testCaseList){
          const testCase =  {
            id: 0,
            lineNo: getSequenceLineLength > 0 ? getSequenceLineLength + 1 : 0,
            versionNoOfType: 0,
            sequenceLineType: 'TEST_CASE',
            testCase: {
              id: item.id,
              name: item.currentTestCaseStepVersion.name,
              level: item.level,
              speed: {
                speedValue: item.currentTestCaseStepVersion.speedValue || null,
                speedUnit: item.currentTestCaseStepVersion.speedUnit || null
              },
            }
          };
          testCaseArray.push(testCase);
        }
        const updateFormValue = {
          ...sequenceDetails,
          sequenceLines : [
            ...( sequenceDetails.sequenceLines || []),
            ...testCaseArray
          ]
        };
        this.store.dispatch(new UpdateSequenceDetailsForm(updateFormValue));
        this.testCaseStepAdded.emit(true);
      });
    this.disableSave = false;
  }

  onTrackSelection(event) {
    if (event.target.value !== '' ) {
      this.sequenceForm.controls['trackDirection'].enable();
      this.sequenceForm.controls['trackDirection'].setValue(this.trackDirection[0]);
      this.trackList$.subscribe( res => {
         const getTrack  = find(res, function(track) { return track.name === event.target.value; });
         this.selectedTrack = getTrack ? getTrack.name : '';
        this.sequenceForm.controls['sequenceTrack'].setValue(getTrack);
      });
    } else {
      this.selectedTrack = '';
      this.sequenceForm.controls['trackDirection'].setValue(null);
      this.sequenceForm.controls['sequenceTrack'].setValue(null);
      this.sequenceForm.controls['trackDirection'].disable();
    }
    this.disableSave = false;
  }

  onLevelChange(value: any) {
    if (value === 1) {
          this.isLevel = true;
        } else {
          this.isLevel = false;
    }
  }

  onCategoryChange(value: any) {
    if (value === 'STANDARD') {
          this.isCategory = true;
        } else {
          this.isCategory = false;
    }
  }

  buildSequenceForm() {
    this.sequenceForm = this.formBuilder.group({
      id: 0,
      name: ['', Validators.required],
      category: ['STANDARD', Validators.required],
      privateSequence: [true, Validators.required],
      noOfTestCases: [0],
      description: [''],
      level: [0],
      strict: [true, Validators.required],
      sequenceSite: '',
      sequenceUserGroup: '',
      sequenceType: 'ORIGINAL',
      testCaseCategory: '',
      sequenceLines: [[]],
      changeInfo: {},
      trackDirection: '',
      sequenceTrack: ''
    });
  }

  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.getSequenceParents$ =  this.store.select(getParentSequenceSelector);
    this.trackList$ = this.store.select(sequenceTrackSelector);
    this.testCaseList$ = this.store.select(testCaseListSelector);
    this.paginationTestCase = this.store.select(paginationTestCaseListSelector);
    this.sequenceDetails$ = this.store.select(sequenceDetailsSelector);
    this.loading$ = this.store.select(loaderSelector);
    this.user$ = this.store.select(userSelector);
   this.buildSequenceForm();
    this.route.params
      .map(params => params.id)
      .filter(id => !!id)
      .subscribe(id => {
        this.isCreate = false;
        this.disableSave = true;
        this.store.dispatch(new GetSequenceDetails(id));
      });

    if (this.isCreate) {
      this.sessionStorageService.getItem('userGroup').subscribe( testGroup => {
        this.selectedSequenceGroup = testGroup;
      });
      this.sessionStorageService.getItem('userSite').subscribe( testSite => {
        this.selectedSequenceSite = testSite;
        this.store.dispatch( new GetTrackList(testSite.toString()));
      });
      this.sequenceForm.controls['trackDirection'].disable();
    }
    this.store.dispatch(new UpdateTestCaseListFilters(this.testCaseFilters));
  }

  ngDoCheck() {
    if (this.sequenceForm && this.sequenceForm.dirty ) {
      this.disableSave = false;
    }

    if (this.isCreate) {
      if (this.isLevel && this.isCategory) {
        this.isDisable = false;
        this.isDisableAll = true;
      } else {
        this.isDisable = true;
        this.isDisableAll = false;
      }
    }

    if (!this.isCreate) {
      this.sequenceDetails$
        .take(2)
        .subscribe((details: SequenceDetails) => {
            if (details.testCaseCategory === 'STANDARD' && details.level === 1) {
              this.isDisable = false;
              this.isDisableAll = true;
            } else {
              this.isDisable = true;
              this.isDisableAll = false;
            }
        });
    }
  }

  ngAfterViewInit() {
    this.sequenceDetails$
    .take(2)
    .subscribe((details: SequenceDetails) => {
      this.sequenceForm.patchValue(details);
      this.selectedTrack = details.sequenceTrack ? details.sequenceTrack['name'] : '';
      if (!this.isCreate) {
        if (!details.trackDirection ) {
          this.sequenceForm.controls['trackDirection'].setValue('');
          this.sequenceForm.controls['trackDirection'].disable();
        } else {
          this.sequenceForm.controls['trackDirection'].enable();
        }
        if (!details.testCaseCategory) {
          this.sequenceForm.controls['testCaseCategory'].setValue('');
        }
        if (details.sequenceSite) {
          this.store.dispatch( new GetTrackList(details.sequenceSite.siteName));
        }
        this.sequenceInfo = details.changeInfo;
      }
    });

    this.sequenceForm.valueChanges
      .subscribe((sequenceDetails) => {
      this.store.dispatch(new UpdateSequenceDetailsForm(sequenceDetails));
      });
  }

  onFormValueChange(): void {
    this.sequenceForm.markAsTouched();
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearSequenceDetails());
    this.buildSequenceForm();
  }

  open(template) {
    this.ngModal.open(template, {
      size: 'lg',
    });
  }

  onCreateCopySequence() {
    this.sequenceForm.controls['id'].setValue(0);
    this.isCopy = true;
    this.isCreate = false;
   }

  onPreConditionsAdded(event) {
   if (event) {this.disableSave = false; }
  }

  getField(field: string) {
    return this.sequenceForm.get(field);
  }

  get name() { return this.getField('name'); }
  get strict() { return this.getField('strict'); }

}
