import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineOverviewComponent } from './routine-overview.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder} from '@angular/forms';
import {MockStoreProvider} from '../../../../testing/mocks/mock-store';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('RoutineOverviewComponent', () => {
  let component: RoutineOverviewComponent;
  let fixture: ComponentFixture<RoutineOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoutineOverviewComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [
        MockStoreProvider,
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(RoutineOverviewComponent, '')
      .createComponent(RoutineOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

