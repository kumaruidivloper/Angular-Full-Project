import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProgressOverviewActionMenuComponent } from './test-progress-overview-action-menu.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { RouterTestingModule } from '@angular/router/testing';
import { ClearTableFilters } from '../test-progress-overview.action';
import { MockSessionStorageServiceProvider } from '../../../../../testing/mocks/mock-service';

describe('TestProgressOverviewActionMenuComponent', () => {
  let component: TestProgressOverviewActionMenuComponent;
  let fixture: ComponentFixture<TestProgressOverviewActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProgressOverviewActionMenuComponent ],
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
      .overrideTemplate(TestProgressOverviewActionMenuComponent, '')
      .createComponent(TestProgressOverviewActionMenuComponent);
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
