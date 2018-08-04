import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SequenceOverviewComponent } from './sequence-overview.component';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('SequenceOverviewComponent', () => {
  let component: SequenceOverviewComponent;
  let fixture: ComponentFixture<SequenceOverviewComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SequenceOverviewComponent
      ],
      imports: [
        RouterTestingModule,
        NgbModalModule.forRoot()
      ],
      providers: [
        MockStoreProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(SequenceOverviewComponent, '')
      .createComponent(SequenceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  // it('should', async(() => {
  //   spyOn(component, 'onRowSelect');
  //   const tableRow = fixture.debugElement.query( By.css( '.table-component tr' ) );
  //   tableRow.click();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.onRowSelect).toHaveBeenCalled();
  //   });
  // }));

//  @TODO missing test coverage
});
