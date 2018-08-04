import { IFaker } from './faker.i';
import { ILogin } from '../models/login.i';
import { name } from 'faker';

class LoginFaker implements IFaker<ILogin> {
  generate(id): ILogin {
    return {
      id: id,
      firstName: name.firstName(),
      lastName: name.lastName(),
    };
  }
}

export {LoginFaker};
