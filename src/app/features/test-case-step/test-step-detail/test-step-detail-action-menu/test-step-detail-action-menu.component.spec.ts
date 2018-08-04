import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStepDetailActionMenuComponent } from './test-step-detail-action-menu.component';

describe('TestStepDetailActionMenuComponent', () => {
  let component: TestStepDetailActionMenuComponent;
  let fixture: ComponentFixture<TestStepDetailActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStepDetailActionMenuComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestStepDetailActionMenuComponent, '')
      .createComponent(TestStepDetailActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
