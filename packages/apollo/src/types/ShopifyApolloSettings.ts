export interface ShopifyApolloSettings {
  api: {
    domain: string
    storefrontAccessToken: string
    cookies?: string
  },
  currency: string
  country: string
}
