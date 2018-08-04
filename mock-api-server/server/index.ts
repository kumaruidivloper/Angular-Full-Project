import {FakerGenerator} from './data-fakers/faker-generator';
import {TestFaker} from './data-fakers/test.faker';
import {IFaker, IFakerGenerator} from './data-fakers/faker.i';
import {ITest} from './models/test.i';
import {Server} from './server';
import {ILogin} from './models/login.i';
import {LoginFaker} from './data-fakers/login.faker';
import {UserGroupFaker} from './data-fakers/userGroup.faker';
import {UserSiteFaker} from './data-fakers/userSite.faker';
import {IUserGroup} from './models/userGroup.i';
import {IUserSite} from './models/userSite.i';

class Index {
  private static testFaker: IFaker<ITest> = new TestFaker();
  private static loginFaker: IFaker<ILogin> = new LoginFaker();
  private static userGroupFaker: IFaker<IUserGroup> = new UserGroupFaker();
  private static userSiteFaker: IFaker<IUserSite> = new UserSiteFaker();
  static start() {
    let fakerGenerator: IFakerGenerator = new FakerGenerator(this.testFaker, this.loginFaker, this.userSiteFaker, this.userGroupFaker);
    let server: any = new Server(fakerGenerator.get());
    server.start();
  }
}

Index.start();
