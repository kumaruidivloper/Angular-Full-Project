import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseStepOverviewComponent } from './test-case-step-overview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TestCaseStepOverviewComponent', () => {
  let component: TestCaseStepOverviewComponent;
  let fixture: ComponentFixture<TestCaseStepOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCaseStepOverviewComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        MockStoreProvider,
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestCaseStepOverviewComponent, '')
      .createComponent(TestCaseStepOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
