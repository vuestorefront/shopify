module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'YOUR STOREFRONT DOMAIN',
          storefrontAccessToken: 'STOREFRONT ACCESS TOKEN'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
