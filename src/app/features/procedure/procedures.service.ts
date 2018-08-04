import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PaginatedResponse } from '../../core/interfaces/paginated-response.i';
import { TestProcedure } from '../test/test-details/test-details.model';
import { Store } from '@ngrx/store';
import { stateSelector, TestDetailsState } from '../test/test-details/test-details.reducer';
import { environment } from '../../../environments/environment';
import { SessionStorageService } from '../../core/storage/session-storage.service';
import { ProcedureDetails } from './procedure-details/procedure-details.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';

@Injectable()
export class ProceduresService {

  public state$: Observable<TestDetailsState>;
  public procedureURL = `${environment.apiUrl}/procedure`;

  constructor(public http: HttpClient,
              private store: Store<TestDetailsState>,
              private sessionStorageService: SessionStorageService) {

    this.state$ = this.store.select(stateSelector);
  }

  public loadProcedures(): Observable<PaginatedResponse<TestProcedure[]>> {
    return Observable
      .from(this.state$)
      .first()
      .mergeMap(state => {
        let parameters = new HttpParams()
          .set('page', state.pagination && state.pagination.page.toString())
          .set('pageSize', state.pagination && state.pagination.pageSize.toString());

        Object.keys(state.filters).forEach((key: string) => {
          parameters = parameters.set(key, `${state.filters[key]}`);
        });

        return this.http.get<PaginatedResponse<TestProcedure[]>>(this.procedureURL, {params: parameters});
      });
  }

  public loadProcedureDetails(id: string): Observable<ProcedureDetails> {
    const cacheKey = this.getCacheKey(id);

    return Observable.race(
      this.sessionStorageService.getItem<ProcedureDetails>(cacheKey),
      this.http.get(`${environment.apiUrl}${cacheKey}`)
        .map((procedureDetails: ProcedureDetails) => {
          this.sessionStorageService.setItem(cacheKey, procedureDetails);
          return procedureDetails;
        })
    );
  }

  public saveProcedure(procedure: ProcedureDetails): Observable<ProcedureDetails> {
    return this.http.put<ProcedureDetails>(this.procedureURL, procedure)
      .do((procedureDetails: ProcedureDetails) => {
        const cacheKey = this.getCacheKey(procedure.id.toString());
        this.sessionStorageService.setItem(cacheKey, procedureDetails);
      });
  }

  private getCacheKey(id: string) {
    return `/procedure/${id}`;
  }
}
