import { IntegrationContext } from '@vue-storefront/core'
import { client } from '../../graphql/client'
import { ContextualizedEndpoints } from '../index'

export type ShopifyIntegrationContext = IntegrationContext<
    unknown,
    unknown,
    ContextualizedEndpoints
> & { graphqlClient: ReturnType<typeof client> }

export interface Context {
    $shopify: ShopifyIntegrationContext
}