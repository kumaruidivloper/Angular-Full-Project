import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineDetailsActionMenuComponent } from './routine-details-action-menu.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';

describe('RoutineDetailsActionMenuComponent', () => {
  let component: RoutineDetailsActionMenuComponent;
  let fixture: ComponentFixture<RoutineDetailsActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineDetailsActionMenuComponent ],
      providers: [
        MockStoreProvider
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(RoutineDetailsActionMenuComponent, '')
      .createComponent(RoutineDetailsActionMenuComponent);
    component = fixture.componentInstance;
    component.isCreate = false;
    component.routineInfo = {};
    component.enableDelete = false;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
