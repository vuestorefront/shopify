import { getBlogs } from '../src/api/getBlogs'
import { createMockContext } from '../__mocks__/mockContext';


describe('[shopify-apollo] mapping of params into graphql client', () => {
  it('should map params to the articles query', async () => {
    const { extendQuery, context } = createMockContext()
    const params = {
      first: 10
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    extendQuery.mockImplementationOnce(() => ({ blogs: { query: 'test-blogs-query', variables: params } }))

    await getBlogs(context, params, customQuery)

    expect(extendQuery).toHaveBeenCalledWith(customQuery, {
      blogs: {
        query: expect.any(Object),
        variables: params
      }
    })
  })

  it('should execute the query with mapped params', async () => {
    const { extendQuery, context, query } = createMockContext()
    const params = {
      first: 10
    }

    const expectedQueryOptions = { query: 'test-blogs-query', variables: params }

    extendQuery.mockImplementationOnce(() => ({ blogs: expectedQueryOptions }));

    await getBlogs(context, params)

    expect(query).toHaveBeenCalledWith(expectedQueryOptions)
  })
})