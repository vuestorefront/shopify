import { getProduct } from '@vue-storefront/shopify-api';
import { enhanceProduct, mapPaginationParams } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { useProductFactory, ProductsSearchResult, UseProduct, AgnosticSortByOption, CustomQuery } from '@vue-storefront/core';
import { ProductsSearchParams } from '../types';
import { Filter } from '@vue-storefront/shopify-api';

const availableSortingOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-up', label: 'Price from low to high' },
  { value: 'price-down', label: 'Price from high to low' }
];

const productsSearch = async (params: ProductsSearchParams, customQuery?: CustomQuery): Promise<ProductsSearchResult<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]>> => {
  const apiSearchParams = {
    ...params,
    ...mapPaginationParams(params)
  };
  const productResponse = await getProduct(apiSearchParams, customQuery);
  const enhancedProductResponse = enhanceProduct(productResponse);
  const products = (enhancedProductResponse as any)._variants;
  // const availableFilters: Record<string, Filter> = getFiltersFromProductsAttributes(products);
  return {
    data: products,
    total: productResponse.length,
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4856
    // availableFilters,
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]> =
  useProductFactory<ProductVariant, ProductsSearchParams, Record<string, Filter>, AgnosticSortByOption[]>({ productsSearch });

export default useProduct;
