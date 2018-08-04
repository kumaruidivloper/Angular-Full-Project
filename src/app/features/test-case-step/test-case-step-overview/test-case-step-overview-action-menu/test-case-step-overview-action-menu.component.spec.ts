import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseStepOverviewActionMenuComponent } from './test-case-step-overview-action-menu.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { MockSessionStorageServiceProvider } from '../../../../../testing/mocks/mock-service';

describe('TestCaseStepOverviewActionMenuComponent', () => {
  let component: TestCaseStepOverviewActionMenuComponent;
  let fixture: ComponentFixture<TestCaseStepOverviewActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCaseStepOverviewActionMenuComponent ],
      providers: [
        MockStoreProvider,
        MockSessionStorageServiceProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestCaseStepOverviewActionMenuComponent, '')
      .createComponent(TestCaseStepOverviewActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
