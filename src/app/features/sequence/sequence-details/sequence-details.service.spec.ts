import { TestBed, inject } from '@angular/core/testing';
import { SequenceDetailsService } from './sequence-details.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('SequenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SequenceDetailsService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([SequenceDetailsService], (service: SequenceDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
