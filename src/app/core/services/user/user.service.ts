import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User, UserGroup, UserRole, UserSite } from './user.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {
  private userServiceUrl: string = `${environment.apiUrl}/user?fromPage=web`;
  private userGroupsServiceUrl = `${environment.apiUrl}/user/userGroup`;
  private userSitesServiceUrl = `${environment.apiUrl}/user/site`;
  private userRoleServiceUrl = `${environment.apiUrl}/user/role`;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get(this.userServiceUrl);
  }

  getUserGroups(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(this.userGroupsServiceUrl);
  }

  getUserSites(): Observable<UserSite[]> {
    return this.http.get<UserSite[]>(this.userSitesServiceUrl);
  }

  getUserRole(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.userRoleServiceUrl);
  }
}
