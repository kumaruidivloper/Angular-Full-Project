import { TestBed } from '@angular/core/testing';

import { TagComponentService } from './tag.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreProvider } from '../../../testing/mocks/mock-store';

describe('TagComponentService', () => {
  let tagComponentService: TagComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagComponentService, MockStoreProvider],
      imports: [
        HttpClientTestingModule
      ]
    }); tagComponentService = TestBed.get(TagComponentService);
  });


  it('should defined an API', () => {
    expect(tagComponentService.getTagList).toBeDefined();
  });
});
