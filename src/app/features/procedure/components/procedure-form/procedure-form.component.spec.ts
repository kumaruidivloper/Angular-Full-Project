import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureFormComponent } from './procedure-form.component';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { mockFormBuilderProvider } from '../../../../../testing/mocks/mock-form-builder';
import { Sequence } from '../../../sequence/sequence-overview/sequence-overview.model';
import { Routine } from '../../../routine/routine-overview/routine-overview.model';

describe('ProcedureFormComponent', () => {
  const procedureChanges: SimpleChanges = {
    procedure: {
      currentValue: {}
    } as SimpleChange
  };

  const procedureInitialChanges: SimpleChanges = {
    procedure: {
      currentValue: null
    } as SimpleChange
  };

  let component: ProcedureFormComponent;
  let fixture: ComponentFixture<ProcedureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureFormComponent ],
      providers: [
        mockFormBuilderProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(ProcedureFormComponent, '')
      .createComponent(ProcedureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should update the form on changes', () => {
    component.ngOnChanges(procedureChanges);

    expect(component.form.patchValue).toHaveBeenCalledWith(procedureChanges.procedure.currentValue);
  });

  it('should not update the form on first change', () => {
    component.ngOnChanges(procedureInitialChanges);

    expect(component.form.patchValue).not.toHaveBeenCalled();
  });

  it('should emit onAddSequence', () => {
    spyOn(component.addSequence, 'emit');
    component.onAddSequence({ id: 1 } as Sequence);

    expect(component.addSequence.emit).toHaveBeenCalledWith(1);
  });

  it('should emit onAddSequence', () => {
    spyOn(component.addRoutine, 'emit');
    component.onAddRoutine({ id: 1 } as Routine);

    expect(component.addRoutine.emit).toHaveBeenCalledWith(1);
  });
});
