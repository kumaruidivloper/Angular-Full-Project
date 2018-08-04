import { Provider } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from '../../app/core/storage/session-storage.service';

export function mockService(serviceClass: any): Provider {
  return { provide: serviceClass, useValue: createServiceMock(serviceClass) };
}

export function createServiceMock(serviceClass: any): jasmine.SpyObj<any> {
  const props = Object.getOwnPropertyNames(serviceClass.prototype).slice(1);
  return jasmine.createSpyObj(props);
}

export class MockOAuthService {
  public events: Observable<any>;

  constructor() {
    Object.assign(this, createServiceMock(OAuthService), {
      events: Observable.of({})
    });
    spyOn(this.events, 'subscribe');
  }
}

export class MockSessionStorageService {
  public getItem: jasmine.Spy;
  constructor() {
    Object.assign(this, createServiceMock(SessionStorageService));
    this.getItem.and.returnValue({
      subscribe: jasmine.createSpy('subscribe')
    });
  }
}

export const MockSessionStorageServiceProvider = {
  provide: SessionStorageService,
  useClass: MockSessionStorageService
};
