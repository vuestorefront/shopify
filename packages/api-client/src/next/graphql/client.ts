import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { MiddlewareSettingsConfig } from "../types";

export function createGraphQLClient(settings: MiddlewareSettingsConfig) {
    const client = new ApolloClient({
        uri: `https://${settings.api.domain}/api/2021-10/graphql.json`,
        ssrMode: true,
        cache: new InMemoryCache(),
        headers: {
            'X-Shopify-Storefront-Access-Token': settings.api.storefrontAccessToken
        }
    })

    return client
}