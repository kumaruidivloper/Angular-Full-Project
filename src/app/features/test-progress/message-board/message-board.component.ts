import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../core/services/user/user.model';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import { MessageBoardState, messageSelector, msgFiltersSelector, msgPaginationSelector } from './message-board.reducer';
import { Store } from '@ngrx/store';
import {
  ClearMessageFilters,
  DeleteMessage,
  MessagePagination,
  PostMessages,
  UpdateMessageFilters
} from './message-board.actions';
import { MessageFilter, MessageModel } from './message-board.model';
import { userSelector } from '../../../core/services/user/user.reducer';
import { PaginationParameters } from '../../../core/interfaces/pagination-params.i';
import { IMyDateRangeModel, IMyDrpOptions } from 'mydaterangepicker';
import { Filter } from '../../../core/interfaces/filter.model';
import {ActivatedRoute} from '@angular/router';
import {TestDetails} from '../../test/test-details/test-details.model';
import {testDetailsSelector} from '../../test/test-details/test-details.reducer';
import {GetTestDetails} from '../../test/test-details/test-details.actions';
import {accessTokenSelector} from '../../login/login.reducer';
import {TryUserLogin} from '../../login/login.actions';

@Component({
  selector: 'tm-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.scss']
})
export class MessageBoardComponent implements OnInit , AfterViewInit {
  @ViewChild('fileInput') fileInput;
  @ViewChild('messageForm') messageForm;
  public baseApiUrl = window.location.href;
  public baseUrl: string;
  private currentDate = new Date();
  public messageList$: Observable<MessageModel[]> ;
  public paginationParameters = {
    page: 1,
    pageSize: 10,
    numberOfPages: 1
  };
  public itemsPerPage = [50, 100, 150];
  public sort = {};
  public filter$: Observable<MessageFilter>;
  public user$: Observable<User>;
  public testDetails$: Observable<TestDetails>;
  public selectedFile: File;
  public textAreaValue: string;
  public uploadSuccess: boolean = false;
  public hasAttachment: boolean = false;
  public showMessageList: boolean = false;
  public clearDateRange: {};
  public uploadedFileName: string;
  public selectedTeamData = {};
  public textAreaEmpty: boolean = true;
  public pageType: string = 'messageBoard';
  private messageJSON: object = {};
  private getUserId: string;
  private uploadData = [];
  public fileDetailsObj = [];
  public hideAttachmentList: boolean = false;
  public paginationParameters$: Observable<PaginationParameters>;
  public myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  private testId: number;
  constructor( private store: Store<MessageBoardState>,
               private fileUploadService: FileUploadService,
               private route: ActivatedRoute) { }

  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }

  ngOnInit() {
    this.store.select(accessTokenSelector)
      .subscribe(token => {
        if (!token) {
          this.store.dispatch( new TryUserLogin());
        }
      });
    this.messageList$ = this.store.select(messageSelector);
    this.user$ =  this.store.select(userSelector);
    this.testDetails$ = this.store.select(testDetailsSelector);
    this.filter$ = this.store.select(msgFiltersSelector);
    this.paginationParameters$ = this.store.select(msgPaginationSelector);
    this.route.params
      .map(params => params.testId)
      .filter(id => !!id)
      .subscribe(id => {
        this.testId = id;
        this.store.dispatch(new GetTestDetails(id));
        this.store.dispatch( new UpdateMessageFilters( {testId: this.testId}));
      });


  }

  ngAfterViewInit() {
    this.messageList$.subscribe( res => {
      this.showMessageList = res.length > 0;
    });
    this.baseUrl = 'http://' + this.baseApiUrl.split('/')[2];
  }

  textAreaValidation(value) {
    this.textAreaEmpty = value === '';
  }

  onSaveMessage(form) {
    this.messageJSON =  {
      'id': 0,
      'created': this.currentDate,
      'message': form.messageBoard,
      'messageAttachments': this.uploadData
    };
    this.user$.subscribe( user => {
      this.messageJSON['user'] =  {
        'firstName': user.firstName,
        'lastName': user.lastName
      };
    });
    this.messageForm.reset();
    this.store.dispatch( new PostMessages(this.messageJSON, this.testId));
    this.textAreaEmpty = true;
    this.hideAttachmentList = true;
    this.fileInput.nativeElement.value = null;
    this.uploadSuccess = false;
  }

  onDeleteMessage(id: number, event: Event) {
    event.stopPropagation();
    this.store.dispatch( new DeleteMessage(id));
  }

  removeFileAttachment(value) {
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
        }, 1000);
      });
    }
  }

  onDownloadAttachment(event: Event): void {
    event.stopPropagation();
  }

  onFilterChange(filter: Filter) {
    const updatedFilters: {[key: string]: string} = {};
    this.selectedTeamData[filter.field] = filter.value;
    this.selectedTeamData['testId'] = this.testId;
    this.store.dispatch( new UpdateMessageFilters(this.selectedTeamData));
  }

  onPaginationChange(paginationParameters): void {
    this.store.dispatch(new MessagePagination(paginationParameters));
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    const startDate =  new Date(event.beginDate.year, event.beginDate.month - 1, event.beginDate.day);
    const endDate =  new Date(event.endDate.year, event.endDate.month - 1, event.endDate.day);
    // const dateRange = {
    //   fromDate: startDate.getTime(),
    //   tillDate: endDate.getTime()
    // };
    this.selectedTeamData['fromDate'] = startDate.getTime();
    this.selectedTeamData['tillDate'] = endDate.getTime();
    this.selectedTeamData['testId'] = this.testId;
    this.store.dispatch( new UpdateMessageFilters(this.selectedTeamData));
  }

  clearMsgFilter() {
    this.clearDateRange = '';
    this.selectedTeamData['name'] = '';
    this.selectedTeamData['fromDate'] = '';
    this.selectedTeamData['tillDate'] = '';
    this.selectedTeamData['testId'] = this.testId;
    this.store.dispatch(new ClearMessageFilters(this.selectedTeamData));
  }

  numbersOnly(event: any) {
    const pattern = /[0-9\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
