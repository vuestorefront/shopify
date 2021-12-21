import { Context } from '../types'
import { ProductsSearchParams, UseSearchFactoryParams } from '@vue-storefront/core'
import type { ProductsSearchResult } from './'

export const useSearchFactoryParams: UseSearchFactoryParams<ProductsSearchResult, ProductsSearchParams> = {
  async search(context: Context, params: ProductsSearchParams): Promise<ProductsSearchResult> {
    const response = await context.$shopify.api.searchProduct(params)

    return response
  }
}