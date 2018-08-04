import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { UserSiteComponent } from './user-site.component';
import { MockStoreProvider } from '../../../../../testing/mocks/mock-store';

describe('UserSiteComponent', () => {
  let component: UserSiteComponent;
  let fixture: ComponentFixture<UserSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ UserSiteComponent ],
      providers: [ MockStoreProvider]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(UserSiteComponent, '')
      .createComponent(UserSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
