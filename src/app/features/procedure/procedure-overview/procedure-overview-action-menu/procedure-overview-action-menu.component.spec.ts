import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { ClearProcedureTableFilters } from '../procedure-overview.actions';

import { ProcedureOverviewActionMenuComponent } from './procedure-overview-action-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockSessionStorageServiceProvider } from '../../../../../testing/mocks/mock-service';

describe('ProcedureOverviewActionMenuComponent', () => {
  let component: ProcedureOverviewActionMenuComponent;
  let fixture: ComponentFixture<ProcedureOverviewActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureOverviewActionMenuComponent ],
      providers: [
        MockStoreProvider,
        MockSessionStorageServiceProvider
      ],
      imports: [
        RouterTestingModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(ProcedureOverviewActionMenuComponent, '')
      .createComponent(ProcedureOverviewActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define an API', () => {
    expect(component.clearFilters).toBeDefined();
  });

  describe('dispatch', () => {

    it('should dispatch an action when clearFilters is called', () => {
      component.clearFilters();
      expect(component['store'].dispatch).toHaveBeenCalledWith(new ClearProcedureTableFilters());
    });
  });
  // @todo please remove code instead of commenting it out
  // describe('dispatch', () => {
  //   it('should dispatch an action when Checkbox is selected is called', () => {
  //     component.customizedTest(true);
  //     expect(component['store'].dispatch).toHaveBeenCalledWith(new LoadAllProcedure());
  //   });
  // });

  // describe('dispatch', () => {
  //   it('should dispatch an action when Checkbox is deselected is called', () => {
  //     component.customizedTest(false);
  //     expect(component['store'].dispatch).toHaveBeenCalledWith(new LoadTypeOfProcedure());
  //   });
  // });
});
