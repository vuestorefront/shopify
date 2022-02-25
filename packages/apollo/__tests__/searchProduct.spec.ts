
import { searchProduct } from '../src/api/searchProduct'
import { createMockContext } from '../__mocks__/mockContext'

const mockContext = createMockContext()

describe('[shopify-apollo] search product', () => {
  it('shhould map params to the product query', async () => {
    const params = {
      term: 'test',
      perPage: 5
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    const expectedVariables = {
      first: 5,
      query: 'test'
    }

    mockContext.extendQuery.mockImplementationOnce(() => ({ products: { query: 'test-products-query', variables: expectedVariables }}))

    await searchProduct(mockContext.context, params, customQuery)

    expect(mockContext.extendQuery).toHaveBeenCalledWith(customQuery, {
      products: {
        query: expect.any(Object),
        variables: expectedVariables
      }
    })
  })
})