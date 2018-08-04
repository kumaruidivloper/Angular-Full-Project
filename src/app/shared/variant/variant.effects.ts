import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { VariantComponentService } from './variant.service';
import {
  GetVariantFilter,
  GetVariantFilterFailure,
  GetVariantFilterSuccess,
  LoadProductClassesFailure,
  LoadProductClassesSuccess,
  variantActionTypes
} from './variant.actions';
import { VariantComponentState } from './variant.reducer';


@Injectable()
export class VariantComponentEffects {

  constructor(private actions$: Actions,
              public variantService: VariantComponentService,
              private store: Store<VariantComponentState>) {
  }

  @Effect() getProductClassList$: Observable<Action> = this.actions$
    .ofType(variantActionTypes.LOAD_PRODUCT_CLASSES)
    .mergeMap(() => {
      return this.variantService.getProductClass()
        .map((result) => new LoadProductClassesSuccess(result))
        .catch(() => Observable.of(new LoadProductClassesFailure()));
    });

  @Effect() getVariantFilters$: Observable<Action> = this.actions$
    .ofType(variantActionTypes.GET_VARIANT_FILTERS)
    .mergeMap((action) => {
      return this.variantService.getVariants((<GetVariantFilter>action).id)
        .map((result) => new GetVariantFilterSuccess(result))
        .catch(() => Observable.of(new GetVariantFilterFailure()));
    });
}
