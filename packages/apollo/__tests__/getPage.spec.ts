import { getPage } from '../src/api/getPage'
import { createMockContext } from '../__mocks__/mockContext';

const mockContext = createMockContext()

describe('[shopify-apollo] mapping of params into graphql client', () => {
  it('should map params to the page query', async () => {
    const params = {
      handle: 'test-handle',
      id: 'test-id'
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    mockContext.extendQuery.mockImplementationOnce(() => ({ page: { query: 'test-page-query', variables: params } }))

    await getPage(mockContext.context, params, customQuery)

    expect(mockContext.extendQuery).toHaveBeenCalledWith(customQuery, {
      page: {
        query: expect.any(Object),
        variables: params
      }
    })
  })

  it('should execute the query with mapped params', async () => {
    const params = {
      handle: 'test-handle',
      id: 'test-id'
    }

    const expectedQueryOptions = { query: 'test-page-query', variables: params }

    mockContext.extendQuery.mockImplementationOnce(() => ({ page: expectedQueryOptions }));

    await getPage(mockContext.context, params)

    expect(mockContext.query).toHaveBeenCalledWith(expectedQueryOptions)
  })
})