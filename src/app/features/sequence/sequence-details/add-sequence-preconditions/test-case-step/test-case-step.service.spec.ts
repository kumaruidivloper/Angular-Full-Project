import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MockStoreProvider } from '../../../../../../testing/mocks/mock-store';
import { TestCaseStepOverviewService } from '../../../../test-case-step/test-case-step-overview/test-case-step-overview.service';

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
});
