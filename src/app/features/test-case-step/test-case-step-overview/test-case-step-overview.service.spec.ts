import { TestBed, inject } from '@angular/core/testing';

import { TestCaseStepOverviewService } from './test-case-step-overview.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockStoreProvider} from '../../../../testing/mocks/mock-store';

describe('TestCaseStepOverviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestCaseStepOverviewService,
        MockStoreProvider],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([TestCaseStepOverviewService], (service: TestCaseStepOverviewService) => {
    expect(service).toBeTruthy();
  }));

  // @todo add tests
});
