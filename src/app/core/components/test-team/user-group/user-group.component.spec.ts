import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { UserGroupComponent } from './user-group.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';

describe('UserGroupComponent', () => {
  let component: UserGroupComponent;
  let fixture: ComponentFixture<UserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ UserGroupComponent ],
      providers: [ MockStoreProvider]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(UserGroupComponent, '').createComponent(UserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
