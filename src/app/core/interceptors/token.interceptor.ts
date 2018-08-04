import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/first';
import { Store } from '@ngrx/store';
import {accessTokenSelector, LoginState} from '../../features/login/login.reducer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token$: Observable<string>;

  constructor(private store: Store<LoginState>) {
      this.token$ = this.store.select(accessTokenSelector);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.token$
        .first()
        .mergeMap(token => {
          if (token) {
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            }));
          }
          return next.handle(request);
        });
    }
}
