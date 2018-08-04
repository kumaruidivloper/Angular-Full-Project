import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockService } from '../../../testing/mocks/mock-service';
import { SessionStorageService } from '../../core/storage/session-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('LoginService', () => {
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        mockService(SessionStorageService)
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    loginService = TestBed.get(LoginService);
    router = TestBed.get(Router);

    spyOn(router, 'navigate');
  });

  it('should make an HTTP request for login', () => {
    const credentials = { username: 'test', password: 'test' };
    const httpService = TestBed.get(HttpClient);

    spyOn(httpService, 'post');

    loginService.login(credentials);
    expect(httpService.post).toHaveBeenCalledWith(loginService.urlPath, null, jasmine.any(Object));
  });

  it('should clear session storage on logout', () => {
    const sessionStorageService = TestBed.get(SessionStorageService);

    loginService.logout();
    expect(sessionStorageService.removeItem).toHaveBeenCalledWith(LoginService.tokenStorageKey);
  });

  it('should navigate on logout', () => {
    loginService.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
