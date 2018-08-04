import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTextFilterComponent } from './table-text-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TableTextFilterComponent', () => {
  let component: TableTextFilterComponent;
  let fixture: ComponentFixture<TableTextFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTextFilterComponent ],
      imports: [ ReactiveFormsModule ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TableTextFilterComponent,  '')
      .createComponent(TableTextFilterComponent);
    component = fixture.componentInstance;
    component.placeholder = 'Test';
    component.field = 'test';
    component.value = 'test';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
