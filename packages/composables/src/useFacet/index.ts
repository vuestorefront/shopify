import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { Collection, ProductConnection } from '@vue-storefront/shopify-apollo/src/shopify';
import { convertProductsGqlToLocal, LocalProduct } from '../helpers/internals/convertProductsGqlToLocal';
import { Context as NewContext } from '../types';
import { enhanceProduct } from './../helpers/internals';

// TODO: move to the config file
const ITEMS_PER_PAGE = [20, 40, 100];

type LocalCollection = Omit<Collection, 'products'> & {
  products: LocalProduct[] | ProductConnection
}

const factoryParams = {
  search: async (context: Context | NewContext, params: FacetSearchResult<any>) => {
    // if (Object.keys(params.input.filters).length > 0) {
    const newContext = context as NewContext

    const collection = await newContext.$shopify.api.getCollection(params.input)

    const result: LocalCollection = collection?.data?.collection

    result.products = convertProductsGqlToLocal(result.products as ProductConnection)

    const itemsPerPage = params.input.itemsPerPage;

    return {
      products: enhanceProduct(result.products),
      categories: result,
      total: result.products.length,
      perPageOptions: ITEMS_PER_PAGE,
      itemsPerPage
    };


  }
};

export default useFacetFactory<any>(factoryParams);
