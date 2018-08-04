import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreProvider } from '../../../../testing/mocks/mock-store';
import { RoutineDetailsService } from './routine-details.service';
import { SessionStorageService } from '../../../core/storage/session-storage.service';


describe('Routine Details Service', () => {
  let routineDetailsService: RoutineDetailsService;
    beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionStorageService,
        RoutineDetailsService,
        MockStoreProvider
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    routineDetailsService = TestBed.get(RoutineDetailsService);
  });


  it('should be created', inject([RoutineDetailsService], (service: RoutineDetailsService) => {
    expect(service).toBeTruthy();
  }));

  it('should defined an API to get routine details by id', () => {
    expect(routineDetailsService.getRoutineDetails).toBeDefined();
  });

  it('should defined an API to delete routine', () => {
    expect(routineDetailsService.deleteRoutineData).toBeDefined();
  });

  it('should defined an API to update routine', () => {
    expect(routineDetailsService.updateRoutineData).toBeDefined();
  });

  it('should defined an API to create routine', () => {
    expect(routineDetailsService.createRoutineData).toBeDefined();
  });

  it('should defined an API to get routine result type ', () => {
    expect(routineDetailsService.getRoutineResultType).toBeDefined();
  });
});
