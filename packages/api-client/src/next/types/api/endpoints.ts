import { ShopifyIntegrationContext } from '../context'
import { ProductSearchProps } from '../product'
import { ProductConnection } from '../shopify'

export interface Endpoints {
    searchProduct(
        context: ShopifyIntegrationContext,
        props: ProductSearchProps
    ): Promise<ProductConnection>
}