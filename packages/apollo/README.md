# `@vue-storefront/shopify-apollo`

> This is a library that used inside API Client to handle all apollo query related for shopify
> This also a step forward when we migrate to all queries should be handle by apollo client

## Usage

```typescript
import { createShopifyApollo, getShopifyApolloAPIs } from '@vue-storefront/shopify-apollo'

const client = createShopifyApollo(settings)

apiClientFactory({
    ...
    api: {
        ...getShopifyApolloAPIs() // This will include all the APIs coming from Shopify Apollo like e.g searchProduct
    }
    ...
})
```
