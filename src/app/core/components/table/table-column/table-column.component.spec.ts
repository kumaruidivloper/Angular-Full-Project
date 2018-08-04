import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnComponent } from './table-column.component';

describe('TableColumnComponent', () => {
  let component: TableColumnComponent;
  let fixture: ComponentFixture<TableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColumnComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TableColumnComponent, '')
      .createComponent(TableColumnComponent);
    component = fixture.componentInstance;
    component.name = '';
    component.field = '';
    component.searchable = false;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
