import { Context } from '../types'
import { ProductsSearchParams, UseSearchFactoryParams } from '@vue-storefront/core'
import { ProductConnection } from '@vue-storefront/shopify-api'

export const useSearchFactoryParams: UseSearchFactoryParams<ProductConnection, ProductsSearchParams> = {
  search(context: Context, params: ProductsSearchParams): Promise<ProductConnection> {
    return context.$shopify.api.searchProduct({
      query: params.term,
      currentPage: params.page,
      pageSize: params.perPage,
      searchQueryContext: '',
      sort: params.sort
    })
  }
}