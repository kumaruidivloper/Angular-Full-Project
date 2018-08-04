import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SequenceOverviewActionMenuComponent } from './sequence-overview-action-menu.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { MockSessionStorageServiceProvider } from '../../../../../testing/mocks/mock-service';

describe('SequenceOverviewActionMenuComponent', () => {
  let component: SequenceOverviewActionMenuComponent;
  let fixture: ComponentFixture<SequenceOverviewActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceOverviewActionMenuComponent ],
      providers: [
        MockStoreProvider,
        MockSessionStorageServiceProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(SequenceOverviewActionMenuComponent, '')
      .createComponent(SequenceOverviewActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
