import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { RoutineOverviewActionMenuComponent } from './routine-overview-action-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockSessionStorageServiceProvider } from '../../../../../testing/mocks/mock-service';

describe('RoutineOverviewActionMenuComponent', () => {
  let component: RoutineOverviewActionMenuComponent;
  let fixture: ComponentFixture<RoutineOverviewActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineOverviewActionMenuComponent ],
      providers: [
        MockStoreProvider,
        MockSessionStorageServiceProvider
      ],
      imports: [RouterTestingModule]

    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(RoutineOverviewActionMenuComponent, '')
      .createComponent(RoutineOverviewActionMenuComponent);
      component = fixture.componentInstance;
      component.disableUpdateRoutine = false;
      component.data = {};
      component.routineTestTeam = {};
      fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
