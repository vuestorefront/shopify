import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {
    const app = context.$shopify.config.app;
    // check if cart is already initiated
    const { customQuery, ...searchParams } = params;
    searchParams.localeInfo = { cur: app.i18n.locale, default: app.i18n.localeProperties.alias};
    return await context.$shopify.api.getProduct(searchParams, customQuery);
  }
};

export default useProductFactory<ProductsResponse, any>(params);
