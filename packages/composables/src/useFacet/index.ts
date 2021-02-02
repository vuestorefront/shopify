import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { enhanceProduct } from './../helpers/internals';

// TODO: move to the config file
const ITEMS_PER_PAGE = [20, 40, 100];

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const itemsPerPage = params.input.itemsPerPage;
    const inputFilters = params.input.filters;
    const categorySlug = params.input.categorySlug;
    const sort = params.input.sort;
    const categories = await context.$shopify.api.getCategory({ slug: categorySlug });
    const productResponse = await context.$shopify.api.getProduct({
      catId: categories[0].id,
      data: params.data,
      limit: itemsPerPage,
      offset: (params.input.page - 1) * itemsPerPage,
      sort: sort,
      filters: inputFilters
    });
    const products = enhanceProduct(productResponse);
    return {
      products,
      categories,
      total: products.length,
      perPageOptions: ITEMS_PER_PAGE,
      itemsPerPage
    };
  }
};

export default useFacetFactory<any>(factoryParams);
