import { useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { getProduct, getCategory, AttributeType } from '@vue-storefront/shopify-api';
import { enhanceProduct, getFiltersFromProductsAttributes } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { FacetResultsData } from './../types';

// TODO: move to the config file
const ITEMS_PER_PAGE = [20, 40, 100];

const factoryParams = {
  search: async (params: FacetSearchResult<FacetResultsData>): Promise<FacetResultsData> => {
    const itemsPerPage = params.input.itemsPerPage;

    const categories = await getCategory({ slug: params.input.categorySlug });
    // const categories = categoryResponse.data.categories.results;
    const inputFilters = params.input.filters;
    const filters = Object.keys(inputFilters).reduce((prev, curr) => ([
      ...prev,
      ...inputFilters[curr].map(value => ({ type: AttributeType.STRING, name: curr, value }))
    ]), []);

    const productResponse = await getProduct({
      catId: categories[0].id,
      data: params.data,
      limit: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage,
      filters
      // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4857
      // sort: params.sort
    });
    const enhancedProductResponse = enhanceProduct(productResponse);
    const products = (enhancedProductResponse as any)._variants as ProductVariant[];
    const facets = getFiltersFromProductsAttributes(products);

    return {
      products,
      categories,
      facets,
      total: productResponse.length,
      perPageOptions: ITEMS_PER_PAGE,
      itemsPerPage
    };
  }
};

export default useFacetFactory<FacetResultsData>(factoryParams);
