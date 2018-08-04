import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { SessionStorageService } from '../storage/session-storage.service';
import { mockService } from '../../../testing/mocks/mock-service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../../features/login/login.service';
import { Observable } from 'rxjs/Observable';
import Spy = jasmine.Spy;
import 'rxjs/add/operator/do';
import { async } from '@angular/core/testing';

describe('TestGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        mockService(SessionStorageService),
        mockService(Router)
      ],
      imports: [
      ]
    });
  });

  beforeEach(inject([AuthGuard], (authGuard: AuthGuard) => {
    guard = authGuard;
  }));

  it('should exist', () => {
    expect(guard).toBeTruthy();
  });

  it('should get user from sessionStorage', () => {
    (<Spy>guard['sessionStorageService'].getItem)
      .and.returnValue(Observable.of(''));

    guard.canActivate({} as ActivatedRouteSnapshot);

    expect(guard['sessionStorageService'].getItem).toHaveBeenCalledWith(LoginService.tokenStorageKey);
  });

  it('should fail if the user object does not exist', async(() => {
    (<Spy>guard['sessionStorageService'].getItem)
      .and.returnValue(Observable.of(null));

    guard.canActivate({} as ActivatedRouteSnapshot)
      .subscribe((canActivate: boolean) => {
        expect(canActivate).toBe(false);
        expect(guard['router'].navigate).toHaveBeenCalledWith(['/login']);
      });
  }));

});
