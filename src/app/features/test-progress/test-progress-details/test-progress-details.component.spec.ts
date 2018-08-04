import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProgressDetailsComponent } from './test-progress-details.component';

describe('TestProgressDetailsComponent', () => {
  let component: TestProgressDetailsComponent;
  let fixture: ComponentFixture<TestProgressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProgressDetailsComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestProgressDetailsComponent, '')
      .createComponent(TestProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
