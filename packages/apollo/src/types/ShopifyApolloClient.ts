import type { createShopifyApollo } from "../library";

export default interface ShopifyApolloClient { apolloClient: ReturnType<typeof createShopifyApollo> }