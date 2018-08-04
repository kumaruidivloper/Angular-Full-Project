import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsActionMenuComponent } from './reports-action-menu.component';

describe('ReportActionMenuComponent', () => {
  let component: ReportsActionMenuComponent;
  let fixture: ComponentFixture<ReportsActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsActionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
