import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { enhanceProduct } from './../helpers/internals';

// TODO: move to the config file
const ITEMS_PER_PAGE = [20, 40, 100];

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>) => {
    const itemsPerPage = params.input.itemsPerPage;
    const categorySlug = params.input.categorySlug;
    const categories = await context.$shopify.api.getCategory({ slug: categorySlug });
    const products = enhanceProduct(categories.products);
    return {
      products,
      categories,
      total: categories.products.length,
      perPageOptions: ITEMS_PER_PAGE,
      itemsPerPage
    };
  }
};

export default useFacetFactory<any>(factoryParams);
