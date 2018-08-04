import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestDetailsActionMenuComponent } from './test-details-action-menu.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';

describe('TestDetailsActionMenuComponent', () => {
  let component: TestDetailsActionMenuComponent;
  let fixture: ComponentFixture<TestDetailsActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDetailsActionMenuComponent ],
      providers: [
        MockStoreProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestDetailsActionMenuComponent, '')
      .createComponent(TestDetailsActionMenuComponent);
    component = fixture.componentInstance;
    component.isCreate = false;
    component.testInfo = {};
    component.enableDelete = false;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
