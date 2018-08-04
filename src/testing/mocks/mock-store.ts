import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { createServiceMock } from './mock-service';
import Spy = jasmine.Spy;

export class MockStore<T> {
  public select: Spy;
  constructor() {
    Object.assign(this, createServiceMock(Store));
    this.select.and.returnValue(new BehaviorSubject<any[]>([]));
  }
}

export const MockStoreProvider = { provide: Store, useClass: MockStore };
