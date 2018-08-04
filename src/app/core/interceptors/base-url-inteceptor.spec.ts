import { inject, TestBed } from '@angular/core/testing';
import { BaseUrlInterceptor } from './base-url-interceptor';
import { HttpHandler, HttpRequest } from '@angular/common/http';

describe('BaseUrlInteceptor', () => {
  let interceptor: BaseUrlInterceptor;
  let next: jasmine.SpyObj<HttpHandler>;
  let request: HttpRequest<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseUrlInterceptor]
    });
  });

  beforeEach(inject([BaseUrlInterceptor], (baseUrlInterceptor: BaseUrlInterceptor) => {
    interceptor = baseUrlInterceptor;
    next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
    request = jasmine.createSpyObj<HttpRequest<any>>('request', ['clone', 'url']);
  }));

  it('should exist', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should have an intercept function', () => {
    expect(interceptor.intercept).toBeDefined();
  });

  it('should clone the request', () => {
    interceptor.intercept(request, next);

    expect(request.clone).toHaveBeenCalledWith({url: request.url});
  });

  it('should return the next handler', () => {
    (<jasmine.Spy>request.clone).and.returnValue({});
    interceptor.intercept(request, next);

    expect(next.handle).toHaveBeenCalledWith({});
  });
});
