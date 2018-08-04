import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { SequenceDetails, TrackList } from './sequence-details.model';
import { SequenceDetailsState, stateSelector } from './sequence-details.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class SequenceDetailsService {
  private state$: Observable<SequenceDetailsState>;

  private getTrackURL = `${environment.apiUrl}/sequence/track?siteId=`;
  private getSequenceByIdURL = `${environment.apiUrl}/sequence/`;
  private urlToCreate = `${environment.apiUrl}/sequence/create`;
  private urlToUpdate = `${environment.apiUrl}/sequence/update/`;
  private urlToDelete = `${environment.apiUrl}/sequence/delete/`;
  private urlToDeleteSequenceLine = `${environment.apiUrl}/sequence/deleteSequenceLine/`;
  private getParentSeqURL = `${environment.apiUrl}/sequence/parentSequences/`;
  private testCaseUrlPath = `${environment.apiUrl}/testCaseStep?type=TEST_CASE&level=1&testCaseCategory=STANDARD`;

  constructor(public http: HttpClient, private store: Store<SequenceDetailsState>) {
    this.state$ = this.store.select(stateSelector);
  }


  public getTrackList(siteId): Observable<TrackList> {
    return this.http.get<TrackList>(this.getTrackURL + siteId);
  }
  public getSequenceDetails(id): Observable<SequenceDetails> {
    return this.http.get<SequenceDetails>(this.getSequenceByIdURL + id);
  }

  public createSequenceData(sequence) {
    return this.http.post(this.urlToCreate, sequence);
  }

  public updateSequenceDetails(sequence): Observable<SequenceDetails> {
    return this.http.put(this.urlToUpdate + sequence.id, sequence);
  }

  public getParentSequence(id: number): Observable<any> {
    return this.http.get(this.getParentSeqURL + id);
  }

  public deleteSequenceData(id: number) {
    return this.http.delete(this.urlToDelete + id);
  }

  public deleteSequenceLine(id: number) {
    return this.http.delete(this.urlToDeleteSequenceLine + id);
  }

  public getTestCaseList() {
    return this.http.get(this.testCaseUrlPath);
  }

}
