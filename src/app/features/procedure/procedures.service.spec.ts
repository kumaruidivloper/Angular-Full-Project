import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProceduresService } from './procedures.service';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { MockStoreProvider } from '../../../testing/mocks/mock-store';
import { MockSessionStorageServiceProvider } from '../../../testing/mocks/mock-service';
import { stateSelector, TestDetailsState } from '../test/test-details/test-details.reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';
import { ProcedureDetails } from './procedure-details/procedure-details.model';

describe('ProceduresService', () => {
  const state: TestDetailsState = {
    pagination: {
      page: 1,
      pageSize: 20
    },
    filters: { name: 'test' }
  } as TestDetailsState;

  let service: ProceduresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProceduresService,
        MockStoreProvider,
        MockSessionStorageServiceProvider
      ],
      imports: [HttpClientTestingModule, HttpClientModule]
    });

    service = TestBed.get(ProceduresService);
    service.state$ = Observable.of(state);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select the state', () => {
    expect(service['store'].select).toHaveBeenCalledWith(stateSelector);
  });

  it('should load procedures', async(() => {
    spyOn(service.http, 'get').and.returnValue(Observable.of(null));
    service.loadProcedures()
      .subscribe(() => {
        expect(service.http.get).toHaveBeenCalledWith(service.procedureURL, {params: jasmine.any(HttpParams)});
      });
  }));

  it('should load procedure from cache if it exists', async(() => {
    (<jasmine.Spy>service['sessionStorageService'].getItem).and.returnValue(Observable.of(null));
    spyOn(service.http, 'get').and.returnValue(Observable.never());

    service.loadProcedureDetails('1')
      .subscribe(() => {
        expect(service['sessionStorageService'].getItem).toHaveBeenCalledWith('/procedure/1');
      });
  }));

  it('should load procedure from http if no cache', async(() => {
    (<jasmine.Spy>service['sessionStorageService'].getItem).and.returnValue(Observable.never);
    spyOn(service.http, 'get').and.returnValue(Observable.of(null));

    service.loadProcedureDetails('1')
      .subscribe(() => {
        expect(service.http.get).toHaveBeenCalledWith(environment.apiUrl + '/procedure/1');
        expect(service['sessionStorageService'].setItem).toHaveBeenCalledWith('/procedure/1', null);
      });
  }));

  it('should save the procedure and update cache', async(() => {
    const procedure: ProcedureDetails = { id: 1 } as ProcedureDetails;
    spyOn(service.http, 'put').and.returnValue(Observable.of(procedure));

    service.saveProcedure(procedure)
      .subscribe(() => {
        expect(service.http.put).toHaveBeenCalledWith(service.procedureURL, procedure);
      });

  }));
});
