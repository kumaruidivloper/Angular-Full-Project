import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { DateHandlerService } from '../../../core/services/date/date-handler.service';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { TestDetailsComponent } from './test-details.component';

describe('TestDetailsComponent', () => {
  let component: TestDetailsComponent;
  let fixture: ComponentFixture<TestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDetailsComponent
      ],
      imports: [
        RouterTestingModule,
        NgbModalModule.forRoot()
      ],
      providers: [
        MockStoreProvider,
        FormBuilder,
        DateHandlerService,
        SessionStorageService
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestDetailsComponent, '')
      .createComponent(TestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

//  @TODO missing test coverage
});
