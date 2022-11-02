import { getPage } from '../src/api/getPage'
import { createMockContext } from '../__mocks__/mockContext';



describe('[shopify-apollo] mapping of params into graphql client', () => {
  it('should map params to the page query', async () => {
    const { extendQuery, context } = createMockContext()
    const params = {
      handle: 'test-handle',
      id: 'test-id'
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    extendQuery.mockImplementationOnce(() => ({ page: { query: 'test-page-query', variables: params } }))

    await getPage(context, params, customQuery)

    expect(extendQuery).toHaveBeenCalledWith(customQuery, {
      page: {
        query: expect.any(Object),
        variables: params
      }
    })
  })

  it('should execute the query with mapped params', async () => {
    const { extendQuery, context, query } = createMockContext()
    const params = {
      handle: 'test-handle',
      id: 'test-id'
    }

    const expectedQueryOptions = { query: 'test-page-query', variables: params }

    extendQuery.mockImplementationOnce(() => ({ page: expectedQueryOptions }));

    await getPage(context, params)

    expect(query).toHaveBeenCalledWith(expectedQueryOptions)
  })
})