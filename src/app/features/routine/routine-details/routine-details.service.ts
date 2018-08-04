import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { RoutineDetails } from './routine-details.model';
import { environment } from '../../../../environments/environment';


@Injectable()

export class RoutineDetailsService {
  private url = `${environment.apiUrl}/routine/`;
  private urlToDelete = `${environment.apiUrl}/routine/delete/`;
  private urlToUpdate = `${environment.apiUrl}/routine/update/`;
  private urlToCreate = `${environment.apiUrl}/routine/create`;
  private urlRoutineResultType = `${environment.apiUrl}/routine/resultTypeRoutine`;

  constructor(public Http: HttpClient) {}

  public getRoutineDetails(id): Observable<RoutineDetails> {
    return this.Http.get<RoutineDetails>(this.url + id);
  }

  public getRoutineResultType() {
    return this.Http.get(this.urlRoutineResultType);
  }

  public createRoutineData(routine) {
    return this.Http.post(this.urlToCreate, routine);
  }

  public deleteRoutineData(id: number) {
    return this.Http.delete(this.urlToDelete + id);
  }

  public updateRoutineData(routine) {
    return this.Http.put(this.urlToUpdate + routine.id, routine);
  }

}
