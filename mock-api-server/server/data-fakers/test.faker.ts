import {IFaker} from './faker.i';
import {ITest} from '../models/test.i';
import * as faker from 'faker';

class TestFaker implements IFaker<ITest> {
  generate(): ITest {
    const testId: string = faker.random.number().toString();
    const statuses: string[] = ['Active', 'Closed'];
    const userGroups: string[] = ['PVT', 'AET', 'RT', 'SAFETY'];
    const sites: string[] = ['AGO', 'BLR', 'CUR', 'GOT', 'GSO', 'LYS'];
    const testLeader = faker.name.firstName() + ' ' + faker.name.lastName();

    return {
      id: testId,
      testObject: faker.random.words(2),
      name: faker.random.words(2),
      project: faker.random.words(3),
      wbs: faker.random.words(2),
      testLeader: testLeader,
      status: faker.random.arrayElement(statuses),
      site: faker.random.arrayElement(sites),
      userGroup: faker.random.arrayElement(userGroups),
      description: faker.lorem.sentence(15)
    };
  }
}

export {TestFaker};
