import { Injectable } from '@angular/core';
import { IStorage } from './storage.i';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { CachedItem } from '../services/local-storage/local-storage.model';

@Injectable()
export class SessionStorageService implements IStorage {

  constructor() { }

  getItem<T>(key: string): Observable<T> {
    return Observable.create((observer: Subscriber<T>) => {
      const item: T | null = JSON.parse(sessionStorage.getItem(key));
      if (item) {
        observer.next(item);
      }
    });
  }

  setItem(key: string, value: any): void {
    const item: string = JSON.stringify(value);
    sessionStorage.setItem(key, item);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
