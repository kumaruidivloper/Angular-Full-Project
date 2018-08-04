import { TestBed } from '@angular/core/testing';
import { TestOverviewService } from './test-overview.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MockStoreProvider} from '../../../../testing/mocks/mock-store';

describe('TestOverview Service', () => {
  let testOverviewService: TestOverviewService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestOverviewService,
        MockStoreProvider
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    testOverviewService = TestBed.get(TestOverviewService);
  });
  it('should defined an API', () => {
    expect(testOverviewService.getTestList).toBeDefined();
  });

});
