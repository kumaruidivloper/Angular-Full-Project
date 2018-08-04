import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { RoutineDetailsComponent } from './routine-details.component';
import { DateHandlerService } from '../../../core/services/date/date-handler.service';
import { mockService, MockSessionStorageServiceProvider } from '../../../../testing/mocks/mock-service';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';


describe('RoutineDetailsComponent', () => {
  let component: RoutineDetailsComponent;
  let fixture: ComponentFixture<RoutineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoutineDetailsComponent
      ],
      imports: [
        RouterTestingModule,
        NgbModalModule.forRoot()
      ],
      providers: [
        MockStoreProvider,
        FormBuilder,
        mockService(DateHandlerService),
        mockService(FileUploadService),
        MockSessionStorageServiceProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(RoutineDetailsComponent, '')
      .createComponent(RoutineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should deactivate if pristine', () => {
    expect(component.canDeactivate()).toBe(true);
  });
});
