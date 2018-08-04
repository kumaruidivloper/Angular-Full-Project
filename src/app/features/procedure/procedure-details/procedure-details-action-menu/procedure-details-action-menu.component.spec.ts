import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailsActionMenuComponent } from './procedure-details-action-menu.component';

describe('ProcedureDetailsActionMenuComponent', () => {
  let component: ProcedureDetailsActionMenuComponent;
  let fixture: ComponentFixture<ProcedureDetailsActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureDetailsActionMenuComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(ProcedureDetailsActionMenuComponent, '')
      .createComponent(ProcedureDetailsActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
