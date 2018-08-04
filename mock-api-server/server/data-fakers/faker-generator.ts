import {ITest} from '../models/test.i';
import {IFaker, IFakerResult, IFakerGenerator} from './faker.i';
import {ILogin} from '../models/login.i';
import {IUserSite} from '../models/userSite.i';
import {IUserGroup} from '../models/userGroup.i';

class FakerGenerator implements IFakerGenerator {

  constructor(private TestFaker: IFaker<ITest>,
              private UserFaker: IFaker<ILogin>,
              private SiteFaker: IFaker<IUserSite>,
              private GroupFaker: IFaker<IUserGroup>) {}

  private generateFakers<T>(quantity: number, faker: IFaker<T>, options?: any): T[] {
    let fakers: T[] = [];
    for (let i = 0; i < quantity; i++) {
      fakers.push(faker.generate(options));
    }
    return fakers;
  }

  generateUsers(): ILogin[] {
    const users: ILogin[] = [];
    const usernames: string[] = [ 'T063789', 'A022595', 'T056680', 'T055997', 'PVT_GOT', 'RT_GOT' ];

    usernames.forEach((id) => {
      users.push(this.UserFaker.generate(id));
    });

    return users;
  }
  generateSite(): IUserSite[] {
    const site: IUserSite[] = [];
    const usernames: string[] = [ 'T063789', 'A022595', 'T056680', 'T055997', 'PVT_GOT', 'RT_GOT' ];

    usernames.forEach((id) => {
      site.push(this.SiteFaker.generate(id));
    });

    return site;
  }
  generateGroup(): IUserGroup[] {
    const group: IUserGroup[] = [];
    const usernames: string[] = [ 'T063789', 'A022595', 'T056680', 'T055997', 'PVT_GOT', 'RT_GOT' ];

    usernames.forEach((id) => {
      group.push(this.GroupFaker.generate(id));
    });

    return group;
  }

  get(): IFakerResult {
    const test: ITest[] =  this.generateFakers<ITest>(100, this.TestFaker);
    const user: ILogin[] = this.generateUsers();
    const site: IUserSite[] = this.generateSite();
    const group: IUserGroup[] = this.generateGroup();
    return {
      test: test,
      user: user,
      site: site,
      userGroup: group
    };
  }
}

export {FakerGenerator};
