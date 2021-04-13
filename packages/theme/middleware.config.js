module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'XXX',
          storefrontAccessToken: 'XXX'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
