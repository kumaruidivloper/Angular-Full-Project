import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestOverviewComponent } from './test-overview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { FormBuilder } from '@angular/forms';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { mockService } from '../../../../testing/mocks/mock-service';

describe('TestOverviewComponent', () => {
  let component: TestOverviewComponent;
  let fixture: ComponentFixture<TestOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestOverviewComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        MockStoreProvider,
        FormBuilder,
        mockService(SessionStorageService) // @todo remove when the session storage is removed from component
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestOverviewComponent, '')
      .createComponent(TestOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
