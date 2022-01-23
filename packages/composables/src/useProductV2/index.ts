import {
    Context,
    useProductFactory,
    ProductsSearchParams,
    UseProductFactoryParams
  } from '@vue-storefront/core';
  import { ProductsResponse } from '../types';
  
  const params: UseProductFactoryParams<ProductsResponse, any> = {
    productsSearch: (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {
      return context.$shopify.api.getProductV2(params);
    }
  };
  
  export default useProductFactory<ProductsResponse, any>(params);
  