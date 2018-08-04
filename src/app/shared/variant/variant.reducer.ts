import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductClasses } from './variant.model';
import {
  GetVariantFilterSuccess,
  LoadProductClassesSuccess,
  VariantActions,
  variantActionTypes
} from './variant.actions';


export const variantComponentFeatureName = 'VariantComponent';

export interface VariantComponentState {
  productClasses: ProductClasses[];
  variantFilters: any;
}

export const variantComponentDefaultState: VariantComponentState = {
  productClasses: [],
  variantFilters: []
};


export function variantComponentReducer (
  state: VariantComponentState = variantComponentDefaultState,
  action: VariantActions): VariantComponentState {

  switch (action.type) {
    case variantActionTypes.LOAD_PRODUCT_CLASSES_SUCCESS:
      return <VariantComponentState>{
        ...state,
        productClasses: (<LoadProductClassesSuccess>action).payload
      };
    case variantActionTypes.GET_VARIANT_FILTERS_SUCCESS:
      return <VariantComponentState>{
        ...state,
        variantFilters: (<GetVariantFilterSuccess>action).variants
      };
    default:
      return state;
  }

}


export const getProductClasses = (state: VariantComponentState) => state.productClasses;
export const getVaraintFilters = (state: VariantComponentState) => state.variantFilters;

export const variantsStateSelector = createFeatureSelector<VariantComponentState>(variantComponentFeatureName);
export const productSelector = createSelector(variantsStateSelector, getProductClasses);
export const variantFilterSelector = createSelector(variantsStateSelector, getVaraintFilters);
