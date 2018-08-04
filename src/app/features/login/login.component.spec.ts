import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStoreProvider } from '../../../testing/mocks/mock-store';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [MockStoreProvider],
    });

  });

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(LoginComponent, '')
      .createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  // @todo fix this test
  // it('should dispatch Login action on login', () => {
  //   const credentials = {username: 'test', password: 'test'};
  //
  //   component.onUserLogin(credentials);
  //   expect(component['store'].dispatch).toHaveBeenCalledWith(new UserLogin(credentials));
  // });
});
