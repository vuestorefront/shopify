import { getArticles } from '../src/api/getArticles'
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

    extendQuery.mockImplementationOnce(() => ({ articles: { query: 'test-articles-query', variables: params } }))

    await getArticles(context, params, customQuery)

    expect(extendQuery).toHaveBeenCalledWith(customQuery, {
      articles: {
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

    const expectedQueryOptions = { query: 'test-article-query', variables: params }

    extendQuery.mockImplementationOnce(() => ({ articles: expectedQueryOptions }));

    await getArticles(context, params)

    expect(query).toHaveBeenCalledWith(expectedQueryOptions)
  })
})