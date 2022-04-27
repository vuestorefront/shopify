import { mapFacetToProductFilter } from "../../src/helpers/mapFacetToProductFilter"

describe('[shopify-apollo helpers] mapping of params into Shopify compatible product filter', () => {
  it('should map params to product filter', () => {
    const filters = {
      min: 5,
      max: 10
    }

    const response = mapFacetToProductFilter(filters) 


    expect(response).toStrictEqual({
      price: {
        min: 5,
        max: 10
      }
    })
  })
})