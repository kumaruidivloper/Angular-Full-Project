import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOverviewActionMenuComponent } from './test-overview-action-menu.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { RouterTestingModule } from '@angular/router/testing';
import { ClearTableFilters } from '../test-overview.actions';
import { MockSessionStorageServiceProvider } from '../../../../../testing/mocks/mock-service';

describe('TestOverviewActionMenuComponent', () => {
  let component: TestOverviewActionMenuComponent;
  let fixture: ComponentFixture<TestOverviewActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOverviewActionMenuComponent ],
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
      .overrideTemplate(TestOverviewActionMenuComponent, '')
      .createComponent(TestOverviewActionMenuComponent);
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
      expect(component['store'].dispatch).toHaveBeenCalledWith(new ClearTableFilters());
    });
  });
});
