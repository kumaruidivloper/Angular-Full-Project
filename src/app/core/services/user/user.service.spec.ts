import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });

    userService = TestBed.get(UserService);
    http = TestBed.get(HttpClient);
    spyOn(http, 'get');
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should get users', () => {
    userService.getUser();
    expect(http.get).toHaveBeenCalledWith(userService['userServiceUrl']);
  });

  it('should get user groups', () => {
    userService.getUserGroups();
    expect(http.get).toHaveBeenCalledWith(userService['userGroupsServiceUrl']);
  });

  it('should get user sties', () => {
    userService.getUserSites();
    expect(http.get).toHaveBeenCalledWith(userService['userSitesServiceUrl']);
  });
});
