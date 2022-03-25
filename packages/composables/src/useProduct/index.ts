import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {
    const APP = context.$shopify.config.app;

    // check if cart is already initiated
    const { customQuery, ...searchParams } = params;
    searchParams.curLocaleCode = APP.i18n.locale;
    return await context.$shopify.api.getProduct(searchParams, customQuery);
  }
};

export default useProductFactory<ProductsResponse, any>(params);
