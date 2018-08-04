import {IDbService} from './db.service.i';

class DbService implements IDbService {
  constructor(private db: any, private domain: string) {
  }

  getList<T>(params: {[key: string]: string|number}): T[] {
    return this.db.get(this.domain).filter(params).value();
  }

  get<T>(params: {[key: string]: string|number}): T {
    return this.db.get(this.domain).find(params).value();
  }

  save<T>(model: T): void {
    this.db.get(this.domain).unshift(model).value();
  }

  update<T extends {id: string}>(model: T): T {
    return this.db.get(this.domain).find({id: model.id})
      .assign(model)
      .value();
  }

  delete<T extends {id: string}>(params: {[key: string]: string|number}): T[] {
    return this.db.get(this.domain).remove(params).value();
  }

}

export {DbService};
