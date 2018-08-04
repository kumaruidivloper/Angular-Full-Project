import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MockStoreProvider } from '../../../testing/mocks/mock-store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [MockStoreProvider],
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(HomeComponent, '')
      .createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

//  @todo test that homeLinks are defined
});
