import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoutineButtonComponent } from './add-routine-button.component';

describe('AddRoutineButtonComponent', () => {
  let component: AddRoutineButtonComponent;
  let fixture: ComponentFixture<AddRoutineButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoutineButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoutineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
