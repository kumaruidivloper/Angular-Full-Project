import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { MainMenuActions } from './main-menu.actions';
import { UserLogOut} from '../../../features/login/login.actions';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let event: jasmine.SpyObj<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        MockStoreProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(MainMenuComponent, '')
      .createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    event = jasmine.createSpyObj('event', ['preventDefault']);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should define an interface', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.toggleMenuOpen).toBeDefined();
  });

  it('should dispatch an action when toggleMenuOpen is called', () => {
    component.toggleMenuOpen();
    expect(component['store'].dispatch).toHaveBeenCalledWith(new MainMenuActions.Toggle());
  });

  it('should dispatch an action when logout is called', () => {
    component.logout(event);
    expect(component['store'].dispatch).toHaveBeenCalledWith(new UserLogOut());
  });

  it('should dispatch prevent default when logout is called', () => {
    component.logout(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
