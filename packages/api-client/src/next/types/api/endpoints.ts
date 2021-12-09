import { ProductsSearchParams } from '@vue-storefront/core'
import { EndpointResult } from '../'
import { ShopifyIntegrationContext } from '../context'

export interface Endpoints {
  searchProduct(
    context: ShopifyIntegrationContext,
    props: ProductsSearchParams
  ): EndpointResult
}