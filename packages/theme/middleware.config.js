module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'jw-vuestorfront.myshopify.com',
          storefrontAccessToken: '71b9e94e154874b1b9db212e7fba7317'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
