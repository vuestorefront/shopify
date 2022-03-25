export interface ShopifyApolloSettings {
  api: {
    domain: string
    storefrontAccessToken: string
    cookies?: string,
  },
  routes?: Record<string, string>
  currency: string
  country: string
}
