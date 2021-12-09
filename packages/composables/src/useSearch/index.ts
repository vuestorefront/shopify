import { useSearchFactory, ProductsSearchParams } from '@vue-storefront/core'
import type { getShopifyApolloAPIs } from '@vue-storefront/shopify-apollo'

import { useSearchFactoryParams } from './params'

export type ProductsSearchResult = ReturnType<ReturnType<typeof getShopifyApolloAPIs>['searchProduct']>

export default useSearchFactory<ProductsSearchResult, ProductsSearchParams>(useSearchFactoryParams)