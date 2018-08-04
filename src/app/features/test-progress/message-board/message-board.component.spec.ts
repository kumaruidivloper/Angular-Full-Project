import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoardComponent } from './message-board.component';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { mockService } from '../../../../testing/mocks/mock-service';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';

describe('MessageBoardComponent', () => {
  let component: MessageBoardComponent;
  let fixture: ComponentFixture<MessageBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBoardComponent ],
      providers: [
        MockStoreProvider,
        mockService(FileUploadService)
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(MessageBoardComponent, '')
      .createComponent(MessageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
