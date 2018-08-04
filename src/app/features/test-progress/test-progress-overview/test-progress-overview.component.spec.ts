import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProgressOverviewComponent } from './test-progress-overview.component';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { RouterTestingModule } from '@angular/router/testing';
import { mockService } from '../../../../testing/mocks/mock-service';
import { SessionStorageService } from '../../../core/storage/session-storage.service';

describe('TestProgressOverviewComponent', () => {
  let component: TestProgressOverviewComponent;
  let fixture: ComponentFixture<TestProgressOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProgressOverviewComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        MockStoreProvider,
        mockService(SessionStorageService) // @todo remove when session storage service removed from component
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestProgressOverviewComponent, '')
      .createComponent(TestProgressOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
