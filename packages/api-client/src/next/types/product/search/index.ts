import { ProductsSearchParams } from '@vue-storefront/core';

/**
 *  Properties passed to `searchProduct` API function.
 */
 export interface ProductSearchProps extends ProductsSearchParams {
    /**
     *  Free text search, facets stored in string array.
     */
    query: string;
  
    /**
     *  The number of results returned per page.
     */
    pageSize: number;
  
    /**
     *  The current result page requested.
     */
    currentPage: number;
  
    /**
     *  The context to be used in the search query.
     */
    searchQueryContext: string;
  
    /**
     *  Sorting method applied to the return results.
     */
    sort: string;
  
    /**
     *  An id of selected category.
     */
    categoryId?: string;
  
    /**
     *  Selected page language.
     */
    lang?: string;
  
    /**
     *  Selected page currency.
     */
    curr?: string;
  }