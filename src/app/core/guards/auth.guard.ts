import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

import { SessionStorageService } from '../storage/session-storage.service';
import { LoginService } from '../../features/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionStorageService: SessionStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return Observable.race(
      this.sessionStorageService.getItem(LoginService.tokenStorageKey),
      Observable.of(null)
    ).map((token: string) => {
        const hasUser: boolean = token !== null;
        if (!hasUser) {
          this.router.navigate(['/login']);
        }
        return hasUser;
      });
  }
}
