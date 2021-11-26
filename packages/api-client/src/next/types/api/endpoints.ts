import { ProductsSearchParams } from '@vue-storefront/core'
import { ShopifyIntegrationContext } from '../context'
import { ProductConnection } from '../shopify'

export interface Endpoints {
  searchProduct(
    context: ShopifyIntegrationContext,
    props: ProductsSearchParams
  ): Promise<ProductConnection>
}