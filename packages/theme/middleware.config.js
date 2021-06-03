module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'SHOPIFY DOMAIN',
          storefrontAccessToken: 'SHOPIFY STOREFRONT ACCESS TOKEN'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
