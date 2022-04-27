import { getBlog } from '../src/api/getBlog'
import { createMockContext } from '../__mocks__/mockContext';


describe('[shopify-apollo] mapping of params into graphql client', () => {
  it('should map params to the blog query', async () => {
    const { extendQuery, context } = createMockContext()
    const params = {
      id: 'test-id'
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    extendQuery.mockImplementationOnce(() => ({ blog: { query: 'test-blog-query', variables: params } }))

    await getBlog(context, params, customQuery)

    expect(extendQuery).toHaveBeenCalledWith(customQuery, {
      blog: {
        query: expect.any(Object),
        variables: params
      }
    })
  })

  it('should execute the query with mapped params', async () => {
    const { extendQuery, context, query } = createMockContext()
    const params = {
      id: 'test-id'
    }

    const expectedQueryOptions = { query: 'test-blog-query', variables: params }

    extendQuery.mockImplementationOnce(() => ({ blog: expectedQueryOptions }));

    await getBlog(context, params)

    expect(query).toHaveBeenCalledWith(expectedQueryOptions)
  })
})