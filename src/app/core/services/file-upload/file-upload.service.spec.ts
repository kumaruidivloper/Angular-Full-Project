import { TestBed, inject } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FileUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([FileUploadService], (service: FileUploadService) => {
    expect(service).toBeTruthy();
  }));
});
