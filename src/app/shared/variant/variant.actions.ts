import { Action } from '@ngrx/store';
import { ProductClasses } from './variant.model';


export const variantActionTypes = {
  LOAD_PRODUCT_CLASSES: '[VariantList] Load Product Classes',
  LOAD_PRODUCT_CLASSES_SUCCESS: '[VariantList] Load Product Classes Successfully',
  LOAD_PRODUCT_CLASSES_FAILURE: '[VariantList] Load Product Classes Failure',
  GET_VARIANT_FILTERS: '[VariantList] Get Vairant Filters',
  GET_VARIANT_FILTERS_SUCCESS: '[VariantList] Get Vairant Filters Success',
  GET_VARIANT_FILTERS_FAILURE: '[VariantList] Get Vairant Filters Failure'
};


export class LoadProductClasses implements Action {
  readonly type: string = variantActionTypes.LOAD_PRODUCT_CLASSES;
}

export class LoadProductClassesSuccess implements Action {
  readonly type: string = variantActionTypes.LOAD_PRODUCT_CLASSES_SUCCESS;
  constructor(public payload: ProductClasses) {}
}

export class LoadProductClassesFailure implements Action {
  readonly type: string = variantActionTypes.LOAD_PRODUCT_CLASSES_FAILURE;
}
export class GetVariantFilter implements Action {
  readonly type: string = variantActionTypes.GET_VARIANT_FILTERS;
  constructor( public id: string) {}
}

export class GetVariantFilterSuccess implements Action {
  readonly type: string = variantActionTypes.GET_VARIANT_FILTERS_SUCCESS;
  constructor(public variants: any) {}
}

export class GetVariantFilterFailure implements Action {
  readonly type: string = variantActionTypes.GET_VARIANT_FILTERS_FAILURE;
}

export type VariantActions = LoadProductClasses | LoadProductClassesSuccess
    | LoadProductClassesFailure | GetVariantFilter | GetVariantFilterSuccess | GetVariantFilterFailure;
