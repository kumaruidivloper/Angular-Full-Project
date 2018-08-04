export interface IDbService {
  getList<T>(params: {[key: string]: string|number}): T[];
  get<T>(params: {[key: string]: string|number}): T;
  save<T>(model: T): void;
  update<T extends {id: string}>(model: T): T;
  delete<T extends {id: string}>(params: {[key: string]: string|number}): T[];
}
