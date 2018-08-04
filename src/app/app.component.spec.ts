import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStoreProvider } from '../testing/mocks/mock-store';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        MockStoreProvider
      ]
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed
      .overrideTemplate(AppComponent, '')
      .createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
