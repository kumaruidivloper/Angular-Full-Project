import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { SessionStorageService } from '../../../core/storage/session-storage.service';
import { TestStepDetailService } from './test-step-detail.service';

describe('TestStep Detail Service', () => {
  let testStepDetailService: TestStepDetailService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestStepDetailService,
        SessionStorageService,
        MockStoreProvider
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    testStepDetailService = TestBed.get(TestStepDetailService);
  });

  it('should be created', inject([TestStepDetailService], (service: TestStepDetailService) => {
    expect(service).toBeTruthy();
  }));
  it('should defined an API to get test-step details by id', () => {
    expect(testStepDetailService.getTestStepDetails).toBeDefined();
  });
  it('should defined an API to get result TypeTestCase', () => {
    expect(testStepDetailService.getResultType).toBeDefined();
  });
  it('should defined an API to create TestStep', () => {
    expect(testStepDetailService.createTestStep).toBeDefined();
  });
  it('should defined an API to update TestStep', () => {
    expect(testStepDetailService.updateTestStep).toBeDefined();
  });
  it('should defined an API to delete TestStep', () => {
    expect(testStepDetailService.deleteTestStep).toBeDefined();
  });
});
