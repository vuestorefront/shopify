module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: process.env.SHOPIFY_DOMAIN,
          storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
          apiVersion: "2022-01"
        },
        routes: {
          blogs: process.env.BLOGS_ROUTE,
          articles: process.env.ARTICLES_ROUTE
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
