import { IFaker } from './faker.i';
import {IUserGroup} from '../models/userGroup.i';
import { name } from 'faker';

class UserGroupFaker implements IFaker<IUserGroup> {
  generate(id): IUserGroup {
    return {
      id: id,
      groupId: name.jobArea(),
      groupName: name.jobArea()
    };
  }
}

export {UserGroupFaker};
