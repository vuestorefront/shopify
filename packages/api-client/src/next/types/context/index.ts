import { IntegrationContext } from '@vue-storefront/core'
import type { Client } from 'shopify-buy'
import { createGraphQLClient } from '../../graphql/client'
import { ContextualizedEndpoints } from '../index'

export type ShopifyIntegrationClient = Client & { apolloClient: ReturnType<typeof createGraphQLClient> }

export type ShopifyIntegrationContext = IntegrationContext<
  ShopifyIntegrationClient,
  unknown,
  ContextualizedEndpoints
>

export interface Context {
  $shopify: ShopifyIntegrationContext
}