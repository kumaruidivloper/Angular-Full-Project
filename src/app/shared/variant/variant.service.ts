import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProductClasses } from './variant.model';
import { environment } from '../../../environments/environment';
import { VariantComponentState, variantsStateSelector } from './variant.reducer';


@Injectable()
export class VariantComponentService {
  private state$: Observable<VariantComponentState>;

  public productClassesUrl = `${environment.apiUrl}/product/productclasses`;
  public variantURL = `${environment.apiUrl}/testCaseStep/variant/`;

  constructor(public Http: HttpClient,
              private store: Store<VariantComponentState>,
              public http: HttpClient) {

    this.state$ = this.store.select(variantsStateSelector);
  }

  public getProductClass(): Observable<ProductClasses> {
    return this.http.get<ProductClasses>(this.productClassesUrl);
  }
  public getVariants(id: string): Observable<any> {
    return this.http.get<any>(this.variantURL + id);
  }
}
