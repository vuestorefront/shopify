import { ApolloClient, ApolloQueryResult, InMemoryCache } from "@apollo/client/core"
import { IntegrationContext } from '@vue-storefront/core'
import { QueryRoot } from "./shopify"

interface ShopifyApolloSettings {
  api: {
    domain: string
    storefrontAccessToken: string
    cookies?: string
  },
  currency: string
  country: string
}

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

export type ShopifyApolloClient = { apolloClient: ReturnType<typeof createShopifyApollo> }

export * from './api'

import type { ShopifyApolloAPIs } from './api'


export type ShopifyApolloContext = IntegrationContext<ShopifyApolloClient, ShopifyApolloSettings, ShopifyApolloAPIs>

export type QueryResult = ApolloQueryResult<QueryRoot>

