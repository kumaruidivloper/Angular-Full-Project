import { TestBed, inject } from '@angular/core/testing';

import { MessageBoardService } from './message-board.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';

describe('MessageBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageBoardService,
        MockStoreProvider
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([MessageBoardService], (service: MessageBoardService) => {
    expect(service).toBeTruthy();
  }));
});
