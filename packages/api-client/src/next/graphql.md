## schema.graphql

We fetch schema.graphql from /api/2021-10/graphql.json of Shopify Storefront API

Using library `get-graphql-schema`

1. Run the following to get `schema.graphql`

      `npx -y get-graphql-schema -h X-Shopify-Storefront-Access-Token=<SHOPIFY TOKEN> https://<SHOPIFY DOMAIN>.myshopify.com/api/2021-10/graphql.json > schema.graphql`

2. Run the following to generate `./src/types/shopify.d.ts`.
   Navigate to `packages/api-client`
      
      `yarn codegen`
