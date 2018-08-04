import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreProvider } from '../../../testing/mocks/mock-store';
import { ToolComponentService } from './tool.service';

describe('ToolComponentService', () => {
  let toolComponentService: ToolComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolComponentService, MockStoreProvider],
      imports: [
        HttpClientTestingModule
      ]
    }); toolComponentService = TestBed.get(ToolComponentService);
  });


  it('should defined an API', () => {
    expect(toolComponentService.getToolList).toBeDefined();
  });
});
