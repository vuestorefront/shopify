import type { createShopifyApollo } from "../library";

export interface ShopifyApolloClient { apolloClient: ReturnType<typeof createShopifyApollo> }
