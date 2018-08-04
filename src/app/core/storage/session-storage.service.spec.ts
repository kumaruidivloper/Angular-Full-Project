import { async, inject, TestBed } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  const storedObject = {test: 'test'};
  const storedObjectString = JSON.stringify(storedObject);

  let storage: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService]
    });
  });

  beforeEach(inject([SessionStorageService], (sessionStorageService: SessionStorageService) => {
    storage = sessionStorageService;
  }));

  it('should be created', () => {
    expect(storage).toBeTruthy();
  });

  it('should define an API', () => {
    expect(storage.getItem).toBeDefined();
    expect(storage.setItem).toBeDefined();
    expect(storage.removeItem).toBeDefined();
    expect(storage.clear).toBeDefined();
  });

  it('should get observable of item when getItem called', async(() => {
    spyOn(sessionStorage, 'getItem').and.returnValue(storedObjectString);

    storage.getItem('key')
      .subscribe((value) => {
        expect(sessionStorage.getItem).toHaveBeenCalledWith('key');
        expect(value).toEqual(storedObject);
      });
  }));

  it('should set an item', () => {
    spyOn(sessionStorage, 'setItem');

    storage.setItem('key', storedObject);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('key', storedObjectString);
  });

  it('should remove an item', () => {
    spyOn(sessionStorage, 'removeItem');

    storage.removeItem('key');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('key');
  });

  it('should clear', () => {
    spyOn(sessionStorage, 'clear');

    storage.clear();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
