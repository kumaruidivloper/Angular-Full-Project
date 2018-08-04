import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureTreeComponent } from './procedure-tree.component';

describe('ProcedureTreeComponent', () => {
  let component: ProcedureTreeComponent;
  let fixture: ComponentFixture<ProcedureTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureTreeComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(ProcedureTreeComponent, '')
      .createComponent(ProcedureTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define config', () => {
    expect(component.config).toBeDefined();
  });
});
