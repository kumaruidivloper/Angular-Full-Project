import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSequenceButtonComponent } from './add-sequence-button.component';

describe('AddRoutineButtonComponent', () => {
  let component: AddSequenceButtonComponent;
  let fixture: ComponentFixture<AddSequenceButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSequenceButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSequenceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
