export interface CachedItem<T> {
  expires: number;
  value: T;
}
