import { Context } from '../types'
import { ProductsSearchParams, UseSearchFactoryParams } from '@vue-storefront/core'
import { EndpointResult } from '@vue-storefront/shopify-api'

export const useSearchFactoryParams: UseSearchFactoryParams<EndpointResult, ProductsSearchParams> = {
  async search(context: Context, params: ProductsSearchParams): Promise<EndpointResult> {
    const response = await context.$shopify.api.searchProduct(params)

    return response
  }
}