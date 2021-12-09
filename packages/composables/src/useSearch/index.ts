import { useSearchFactory, ProductsSearchParams } from '@vue-storefront/core'
import { EndpointResult } from '@vue-storefront/shopify-api'

import { useSearchFactoryParams } from './params'

export default useSearchFactory<EndpointResult, ProductsSearchParams>(useSearchFactoryParams)