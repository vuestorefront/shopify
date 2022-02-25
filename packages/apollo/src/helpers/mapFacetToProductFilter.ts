import { ProductFilter } from "../shopify"

export function mapFacetToProductFilter(filters: Record<string, any>): ProductFilter {
  function getPriceFilters() {
    if (!filters.min && !filters.max) return {}

    return {
      price: {
        ...(filters.min && { min: parseFloat(filters.min) }),
        ...(filters.max && { max: parseFloat(filters.max) })
      }
    }
  }

  return {
    ...getPriceFilters()
  }
}