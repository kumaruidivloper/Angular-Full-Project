import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { TestDetails } from './test-details.model';
import { TestDetailsService } from './test-details.service';
import {DateHandlerService} from '../../../core/services/date/date-handler.service';
import {SessionStorageService} from '../../../core/storage/session-storage.service';

describe('Test Details Service', () => {
  let testDetailsService: TestDetailsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionStorageService,
        TestDetailsService,
        MockStoreProvider,
        DateHandlerService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    testDetailsService = TestBed.get(TestDetailsService);
  });

  const testId = 1;
  const testDetails: TestDetails = {
    'testId': '1',
    'name': 'PVT BASE-P2952',
    'description': 'PVT BASE-P2951',
    'testStatus': 'INITIATED',
    'plannedStartDate': {'date' : {'year': 2018, 'month': 9, 'day': 1}},
    'actualStartDate': {'date' : {'year': 2018, 'month': 9, 'day': 1}},
    'productClass': '04',
    'wbs': 'A2211-GM-00000001-01',
    'project': 'P2951',
    'privateTest': true,
    'testObjectField': 'FH-1683 11659',
    'testRequestId': '',
    'testSite':  'GOT',
    'testUserGroup': 'PVT',
    'testUser': {'firstName': 'PVT', 'lastName': 'GOT'},
    'testSwVersion': {name: 'test'},
    'testProcedure': [],
    'changeInfo': {
      'changedByFirstName': 'Thomas',
      'changedByLastName': 'Voigt',
      'changedByUserId': 'T055997',
      'created': 1005808847000,
      'lastChanged': 1516343804875
    }
  };
  const payload = { groupId: 'PVT', siteId: 'GOT'};
  /*
    @TODO All of these "define API" tests should be grouped into one.
    They should also only test that the member exists, not that it has a result
    i.e. expect(testDetailsService.deleteTestData).toBeDefined() rather than
         expect(testDetailsService.deleteTestData(testId)).toBeDefined();

    the usage and returned results should be tested in different tests
   */

  it('should defined an API to get test details by id', () => {
    expect(testDetailsService.getTestDetails(testId)).toBeDefined();
  });

  it('should defined an API to get test leader by siteId and groupId', () => {
    expect(testDetailsService.getTestLeader(payload)).toBeDefined();
  });

  it('should defined an API to get test software versions', () => {
    expect(testDetailsService.getTestSWVersion()).toBeDefined();
  });

  it('should defined an API to get test objects', () => {
    expect(testDetailsService.getTestObjects()).toBeDefined();
  });

  it('should defined an API to delete test', () => {
    expect(testDetailsService.deleteTestData(testId)).toBeDefined();
  });

  it('should defined an API to update test', () => {
    expect(testDetailsService.updateTestData(testDetails)).toBeDefined();
  });

  it('should defined an API to create test', () => {
    expect(testDetailsService.createTestData(testDetails)).toBeDefined();
  });

});
