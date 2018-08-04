import { FormBuilder, FormGroup } from '@angular/forms';
import { Provider } from '@angular/core';

export class MockFormBuilder {
  public group: jasmine.Spy;

  constructor() {
    const formGroupSpy: jasmine.SpyObj<FormGroup> = jasmine.createSpyObj('formGroup', ['patchValue']);

    this.group = jasmine.createSpy('group').and.returnValue(formGroupSpy);
  }
}

export const mockFormBuilderProvider: Provider = {
  provide: FormBuilder,
  useClass: MockFormBuilder
};
