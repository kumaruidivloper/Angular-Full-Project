import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { defaultConfig } from './local-storage.config';
import { CachedItem } from './local-storage.model';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class LocalStorageService {

  get<T>(key: string): Observable<T> {
    return Observable.create((observer: Subscriber<T>) => {
      const item: CachedItem<T> | null = JSON.parse(defaultConfig.storage.getItem(`${defaultConfig.prefix}${key}`));
      if (item && !this.isExpired(item)) {
        observer.next(item.value);
      }
    });
  }

  set<T>(key: string, value: T, expiresIn = defaultConfig.expire): void {
    const item: CachedItem<T> = {
      expires: Date.now() + (expiresIn * 1000),
      value
    };
    defaultConfig.storage.setItem(`${defaultConfig.prefix}${key}`, JSON.stringify(item));
  }

  remove(key: string = ''): void {
    Object.keys(localStorage)
      .filter(item => item.indexOf(`${defaultConfig.prefix}${key}`) === 0)
      .forEach(item => defaultConfig.storage.removeItem(item));
  }

  private isExpired<T>(item: CachedItem<T>): boolean {
    return !item || new Date(item.expires).getTime() <= Date.now();
  }
}
