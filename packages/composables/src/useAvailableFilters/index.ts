import { useVSFContext } from '@vue-storefront/core'
import type { getShopifyApolloAPIs } from '@vue-storefront/shopify-apollo'
import { Context } from '../types'

export type AvailableFiltersResult = ReturnType<ReturnType<typeof getShopifyApolloAPIs>['availableFilters']>

export default function useAvailableFilters() {
  const context = useVSFContext() as Context

  return {
    async load() {
      // console.log(await context.$shopify.api.availableFilters({
      //   handle: 'clothes'
      // }))

    }
  }
}