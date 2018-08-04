import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStepDetailComponent } from './test-step-detail.component';
import { mockService, MockSessionStorageServiceProvider } from '../../../../testing/mocks/mock-service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestStepDetailComponent', () => {
  let component: TestStepDetailComponent;
  let fixture: ComponentFixture<TestStepDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStepDetailComponent ],
      imports: [RouterTestingModule],
      providers: [
        FormBuilder,
        mockService(NgbModal),
        mockService(FileUploadService),
        MockSessionStorageServiceProvider,
        MockStoreProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestStepDetailComponent, '')
      .createComponent(TestStepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
