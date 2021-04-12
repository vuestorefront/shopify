module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'vsf-next-pwa.myshopify.com',
          storefrontAccessToken: '03f21475b97c18fa05c0ab452c368af4'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
