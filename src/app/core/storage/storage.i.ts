import { Observable } from 'rxjs/Observable';

export interface IStorage {
  getItem<T>(key: string): Observable<T>;
  setItem(key: string, value: any): void;
  removeItem(key: string): void;
  clear(): void;
}
