export interface ProductClasses {
  name?: string;
  description?: string;
}

export interface variantFilterList {
  symbol?: string;
  variantFamily?: {};
  description?: string;
  familyId?: string;
  variantId?: string;
  variantProductClass?: [{}];
}
