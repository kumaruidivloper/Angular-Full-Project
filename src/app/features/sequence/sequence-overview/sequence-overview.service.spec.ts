import { TestBed, inject } from '@angular/core/testing';

import { SequenceOverviewService } from './sequence-overview.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockStoreProvider} from '../../../../testing/mocks/mock-store';
import {HttpClientModule} from '@angular/common/http';

describe('SequenceOverviewService', () => {
  let sequenceOverviewService: SequenceOverviewService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SequenceOverviewService,
        MockStoreProvider
      ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ]
    });
   sequenceOverviewService = TestBed.get(SequenceOverviewService);
  });

  it('should be created', inject([SequenceOverviewService], (service: SequenceOverviewService) => {
    expect(service).toBeTruthy();
  }));
  it('should defined an API', () => {
    expect(sequenceOverviewService.getSequencesList).toBeDefined();
  });
});
