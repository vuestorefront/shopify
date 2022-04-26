import { useVSFContext } from '@vue-storefront/core'
import { ref } from '@nuxtjs/composition-api'
import { Context } from '../types'

export default function useAvailableCountries() {
  const context = useVSFContext() as Context
  const countries = ref([])

  return {
    async load() {
      const _countries = await context.$shopify.api.availableCountries()
      countries.value = _countries
    },
    countries
  }
}