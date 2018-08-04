import { RouterSerialiser } from './router-serialiser';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('RouterSerialiser', () => {
  let routerSerialiser: RouterSerialiser;

  beforeEach(() => {
    routerSerialiser = new RouterSerialiser();
  });

  it('should exist', () => {
    expect(routerSerialiser).toBeTruthy();
  });

  it('should define a serialize function', () => {
    expect(routerSerialiser.serialize).toBeDefined();
  });

  it('should return the url and params', () => {
    const routerState = {
      url: 'test',
      root: {
        queryParams: {}
      } as ActivatedRouteSnapshot
    } as RouterStateSnapshot;

    const { url, queryParams } = routerSerialiser.serialize(routerState);

    expect(url).toBe('test');
    expect(queryParams).toEqual({});
  });
});
