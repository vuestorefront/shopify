module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'trendhooper.myshopify.com',
          storefrontAccessToken: 'f652044ca76e751170c1d9211c9a565c'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
