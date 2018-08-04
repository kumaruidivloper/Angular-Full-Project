import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { OptionsFromEnumModule } from '../../../core/pipes/options-from-enum/options-from-enum.module';
import { ProcedureOverviewComponent } from './procedure-overview.component';

describe('ProcedureOverviewComponent', () => {
  let component: ProcedureOverviewComponent;
  let fixture: ComponentFixture<ProcedureOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureOverviewComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        OptionsFromEnumModule,
        HttpClientTestingModule
      ],
      providers: [MockStoreProvider, FormBuilder]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(ProcedureOverviewComponent, '')
      .createComponent(ProcedureOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // @todo investigate why sort functionality was commented out
  // it('should dispatch sort action onSortChange', () => {
  //   component.onSortChange('test');
  //   expect(component['store'].dispatch).toHaveBeenCalledWith('test');
  // });

});
