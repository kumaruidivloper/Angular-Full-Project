import { TestBed, inject } from '@angular/core/testing';

import { DateHandlerService } from './date-handler.service';

describe('DateHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateHandlerService]
    });
  });

  it('should be created', inject([DateHandlerService], (service: DateHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
