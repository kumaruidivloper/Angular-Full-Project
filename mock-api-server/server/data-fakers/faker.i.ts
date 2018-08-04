import {ITest} from '../models/test.i';
import {ILogin} from '../models/login.i';
import {IUserSite} from '../models/userSite.i';
import { IUserGroup} from '../models/userGroup.i';


interface IFaker<T> {
  generate(options?: any): T;
}

interface IFakerResult {
  test: ITest[];
  user: ILogin[];
  site: IUserSite[];
  userGroup: IUserGroup[];
}

interface IFakerGenerator {
  get(): IFakerResult;
}

export {IFaker, IFakerResult, IFakerGenerator};
