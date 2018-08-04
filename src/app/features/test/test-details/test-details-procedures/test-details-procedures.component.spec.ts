import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';
import { UpdateDetailsForm } from '../test-details.actions';
import { TestDetails, TestProcedure } from '../test-details.model';
import { DeselectProcedure, SelectProcedure } from './test-details-procedures.actions';
import { TestDetailsProceduresComponent } from './test-details-procedures.component';
import { TestDetailsProceduresState } from './test-details-procedures.reducer';

describe('TestDetailsProceduresComponent', () => {
  let component: TestDetailsProceduresComponent;
  let fixture: ComponentFixture<TestDetailsProceduresComponent>;
  let store: Store<TestDetailsProceduresState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDetailsProceduresComponent
      ],
      providers: [
        MockStoreProvider
      ],
      imports: [
        NgbModalModule.forRoot()
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(TestDetailsProceduresComponent, '')
      .createComponent(TestDetailsProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch SelectProcedure when procedure selected', () => {
    component.onProcedureRowSelect({} as TestProcedure, {target: {checked: true}});
    expect(store.dispatch).toHaveBeenCalledWith(new SelectProcedure({} as TestProcedure));
  });

  it('should dispatch DeselectProcedure when procedure deselected', () => {
    component.onProcedureRowSelect({id: 1} as TestProcedure, {target: {checked: false}});
    expect(store.dispatch).toHaveBeenCalledWith(new DeselectProcedure(1));
  });

  it('should dispatch UpdateDetailsForm when procedure added', async(() => {
    component.selectedTestProcedures$ = Observable.of([{} as TestProcedure]);
    component.testDetails$ = Observable.of({testProcedure: []} as TestDetails);
    component['addProceduresModal'] = jasmine.createSpyObj('addProceduresModal', ['close']);

    component.addProcedures();
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateDetailsForm({testProcedure: [{} as TestProcedure]}));
  }));

  it('should dispatch UpdateDetailsForm when procedure added even if testDetails had undefined testProcedures', async(() => {
    component.selectedTestProcedures$ = Observable.of([{} as TestProcedure]);
    component.testDetails$ = Observable.of({} as TestDetails);
    component['addProceduresModal'] = jasmine.createSpyObj('addProceduresModal', ['close']);

    component.addProcedures();
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateDetailsForm({testProcedure: [{} as TestProcedure]}));
  }));


//  @TODO missing test coverage
});
