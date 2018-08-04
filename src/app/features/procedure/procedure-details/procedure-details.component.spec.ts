import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDetailsComponent } from './procedure-details.component';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { mockService, MockSessionStorageServiceProvider } from '../../../../testing/mocks/mock-service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProcedureFormComponent } from '../components/procedure-form/procedure-form.component';
import { FormBuilder } from '@angular/forms';

fdescribe('ProcedureDetailsComponent', () => {
  let component: ProcedureDetailsComponent;
  let fixture: ComponentFixture<ProcedureDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureDetailsComponent, ProcedureFormComponent ],
      providers: [
        MockStoreProvider,
        MockSessionStorageServiceProvider,
        mockService(FormBuilder)
      ],
      imports: [RouterTestingModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(ProcedureDetailsComponent,
        '<tm-procedure-form></tm-procedure-form>')
      .overrideTemplate(ProcedureFormComponent, '')
      .createComponent(ProcedureDetailsComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should deactivate if pristine', () => {
    expect(component.canDeactivate()).toBe(true);
  });
});
