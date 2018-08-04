import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Test } from '../../../features/test/test-overview/test-overview.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('TableComponent', () => {
  let component: TableComponent<Test>;
  let fixture: ComponentFixture<TableComponent<Test>>;
  const paginationParameters = {
    page: 1,
    pageSize: 20,
    numberOfPages: 10
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent
      ],
      imports: [RouterTestingModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TableComponent, '')
      .createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('sortData function', () => {
    let event: jasmine.SpyObj<any>;

    beforeEach(() => {
      event = jasmine.createSpyObj('event', ['preventDefault']);

      component.paginationParameters = paginationParameters;
      component.data  = [];
      component.sort  = null;
      component.filters = {'name' : 'table'};
      component.selectable = true;
      component.itemsPerPage = [];
      component.disableSelectedRow = false;
    });

    it('should emit sortChanged', () => {
      spyOn(component['sortChange'], 'emit');
      component.sortData(event, 'field');
      expect(component.sortChange.emit).toHaveBeenCalledWith('field');
    });

    it('should prevent the default event', () => {
      component.sortData(event, '');
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
