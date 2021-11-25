import { AgnosticFacetSearchParams, useSearchFactory } from '@vue-storefront/core'
import { ProductConnection } from '@vue-storefront/shopify-api'

import { useSearchFactoryParams } from './params'

export default useSearchFactory<ProductConnection, AgnosticFacetSearchParams>(useSearchFactoryParams)