module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'YOUR SHOPIFY STORE DOMAIN',
          storefrontAccessToken: 'SHOPIFY STORE API KEY'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
