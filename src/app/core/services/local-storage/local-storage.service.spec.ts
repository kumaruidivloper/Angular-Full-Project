import { inject, TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { defaultConfig } from './local-storage.config';
import { CachedItem } from './local-storage.model';

describe('LocalStorageService', () => {

  const testKey1: string = 'test1',
        testKey2: string = 'test2',
        prefixedKey1 = `${defaultConfig.prefix}${testKey1}`,
        prefixedKey2 = `${defaultConfig.prefix}${testKey2}`,
        item = {param: 'item'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService
      ]
    });

    spyOn(localStorage, 'getItem').and.callThrough();
    spyOn(localStorage, 'removeItem').and.callThrough();
    spyOn(localStorage, 'setItem').and.callThrough();
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get item from localStorage', inject([LocalStorageService], (service: LocalStorageService) => {
    service.set(testKey1, item);
    service.get(testKey1)
      .subscribe(value => {
        expect(localStorage.getItem).toHaveBeenCalledWith(prefixedKey1);
        expect(value).toEqual(item);
      });
  }));

  it('should set item in localStorage', inject([LocalStorageService], (service: LocalStorageService) => {
    spyOn(Date, 'now').and.returnValue(0);
    const expirableItem = {expires: Date.now() + (defaultConfig.expire * 1000), value: item};
    service.set(testKey1, item);
    expect(localStorage.setItem).toHaveBeenCalledWith(prefixedKey1, JSON.stringify(expirableItem));
  }));

  it('should remove item from localStorage', inject([LocalStorageService], (service: LocalStorageService) => {
    service.set(testKey1, item);
    service.set(testKey2, item);
    service.remove(testKey1);
    service.get(testKey1)
      .subscribe(value => {
        expect(localStorage.removeItem).toHaveBeenCalled();
        expect(value).toBeNull();
      });
    service.get(testKey2)
      .subscribe(value => {
        expect(localStorage.getItem).toHaveBeenCalledWith(prefixedKey2);
        expect(value).toEqual(item);
      });
  }));

  it('should clear localStorage', inject([LocalStorageService], (service: LocalStorageService) => {
    service.set(testKey1, item);
    service.set(testKey2, item);
    service.remove();
    service.get(testKey1)
      .subscribe(value => {
        expect(value).toBeNull();
      });
    service.get(testKey2)
      .subscribe(value => {
        expect(value).toBeNull();
      });
  }));

  it('should return item expired when no item', inject([LocalStorageService], (service: LocalStorageService) => {
    const cachedItem: CachedItem<string> = null,
          isExpired: boolean = service['isExpired'](cachedItem);
    expect(isExpired).toBe(true);
  }));

  it('should return item expired', inject([LocalStorageService], (service: LocalStorageService) => {
    const cachedItem: CachedItem<string> = {
        expires: defaultConfig.expire,
        value: 'test'
      },
      isExpired: boolean = service['isExpired'](cachedItem);
    expect(isExpired).toBe(true);
  }));

  it('should return item not expired', inject([LocalStorageService], (service: LocalStorageService) => {
    const cachedItem: CachedItem<string> = {
            expires: Date.now() + (defaultConfig.expire * 1000),
            value: 'test'
          },
      isExpired: boolean = service['isExpired'](cachedItem);
    expect(isExpired).toBe(false);
  }));


});
