import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleComponent } from './user-role.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';

describe('UserRoleComponent', () => {
  let component: UserRoleComponent;
  let fixture: ComponentFixture<UserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleComponent ],
      providers: [
        MockStoreProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(UserRoleComponent, '')
      .createComponent(UserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
