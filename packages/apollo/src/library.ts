import { ApolloClient, ApolloQueryResult, InMemoryCache, gql } from "@apollo/client/core"
import { CustomQuery, IntegrationContext } from '@vue-storefront/core'
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

type ExtendQueryResult = { query: any; variables: any }

type ExtendQueryContext = {
  extendQuery: (
    customQuery: CustomQuery,
    query: Record<string, ExtendQueryResult>
  ) => Record<string, ExtendQueryResult>
}

export type ShopifyApolloContext = IntegrationContext<ShopifyApolloClient, ShopifyApolloSettings, ShopifyApolloAPIs> & ExtendQueryContext

export type QueryResult = ApolloQueryResult<QueryRoot>

