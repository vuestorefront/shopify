module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'STOREFRONT DOMAIN',
          storefrontAccessToken: 'ACCESS TOKEN'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
