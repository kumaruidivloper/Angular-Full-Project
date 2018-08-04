import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProcedureOverviewService } from './procedure-overview.service';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';

describe('ProcedureOverviewService', () => {
  beforeEach(() => {

    let procedureOverviewService: ProcedureOverviewService;
    TestBed.configureTestingModule({
      providers: [ProcedureOverviewService, MockStoreProvider],
      imports: [HttpClientTestingModule]
    });
    procedureOverviewService = TestBed.get(ProcedureOverviewService);
  });

  it('should be created', inject([ProcedureOverviewService], (procedureOverviewService: ProcedureOverviewService) => {
    expect(procedureOverviewService.getProcedureList()).toBeDefined();
  }));

  // @todo missing test coverage
});
