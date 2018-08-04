import { IFaker } from './faker.i';
import {IUserSite} from '../models/userSite.i';
import { name } from 'faker';

class UserSiteFaker implements IFaker<IUserSite> {
  generate(id): IUserSite {
    return {
      id: id,
      siteId: name.jobArea(),
      siteName: name.jobArea()
    };
  }
}

export {UserSiteFaker};
