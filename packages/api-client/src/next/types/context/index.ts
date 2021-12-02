import { IntegrationContext } from '@vue-storefront/core'
import { createGraphQLClient } from '../../graphql/client'
import { ContextualizedEndpoints } from '../index'

export type ShopifyIntegrationContext = IntegrationContext<
    unknown,
    unknown,
    ContextualizedEndpoints
> & { graphqlClient: ReturnType<typeof createGraphQLClient> }

export interface Context {
    $shopify: ShopifyIntegrationContext
}