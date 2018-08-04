import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Credentials } from './login.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../../core/storage/session-storage.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable()
export class LoginService {
  public static tokenStorageKey: string = 'Login:Token';
  public static userIdStorageKey: string = 'Login:UserId';
  public urlPath: string = `${environment.apiUrl}/jwtCreate`;

  constructor(private http: HttpClient,
              private sessionStorageService: SessionStorageService,
              private router: Router) {
  }

  public login(credentials: Credentials): Observable<HttpResponse<any>> {
    const parameters: HttpParams = new HttpParams()
      .set('userId', credentials.username)
      .set('password', credentials.password);

    return this.http.post(this.urlPath, null, {
      observe: 'response',
      params: parameters,
      responseType: 'text'
    });
  }

  public logout(): void {
    this.sessionStorageService.removeItem(LoginService.tokenStorageKey);
    this.sessionStorageService.removeItem(LoginService.userIdStorageKey);
    this.router.navigate(['/login']);
  }
}
