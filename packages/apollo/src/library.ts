import { ApolloClient, ApolloQueryResult, InMemoryCache } from "@apollo/client/core"
import { IntegrationContext } from '@vue-storefront/core'
import { QueryRoot } from "./shopify"
import type { ShopifyApolloAPIs } from './api'
import type { ShopifyApolloSettings, ShopifyApolloClient, ExtendQueryContext } from "./types"

export function createShopifyApollo(settings: ShopifyApolloSettings) {
  const client = new ApolloClient({
    uri: `https://${settings.api.domain}/api/2022-01/graphql.json`,
    ssrMode: true,
    cache: new InMemoryCache(),
    headers: {
      'X-Shopify-Storefront-Access-Token': settings.api.storefrontAccessToken
    }
  })

  return client
}

export * from './api'

export type ShopifyApolloContext = IntegrationContext<ShopifyApolloClient, ShopifyApolloSettings, ShopifyApolloAPIs> & ExtendQueryContext

export type QueryResult = ApolloQueryResult<QueryRoot>

