# Getting started

## Before dive into the Shopify integration with Vue Storefront 2


If you [generated your project from our CLI](/general/installation.html), your shop will be connected to our [demo store](https://shopify-pwa.aureatelabs.com/).


If you haven't yet generated your project and just to play with Vue Storefront integration with Shopify and understand its capabilities, the first thing you should do after setting it up is changing the credentials to connect to your Shopify store.


First, you need to initiate the fresh project copy from [Vue Storefront CLI](https://docs.vuestorefront.io/v2/general/installation.html).

Create a `.env` inline with `middleware.config.js` file and fill the following required variables

Replace ```SHOPIFY STORE DOMAIN``` and ```SHOPIFY STORE ACCESS TOKEN``` with yours

```bash
SHOPIFY_STOREFRONT_TOKEN=<SHOPIFY_ACCESS_TOKEN>
SHOPIFY_DOMAIN=<SHOPIFY_DOMAIN> # example: vsf-next-pwa.myshopify.com
```