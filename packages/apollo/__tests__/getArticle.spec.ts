import { getArticle } from '../src/api/getArticle'
import { createMockContext } from '../__mocks__/mockContext';


describe('[shopify-apollo] mapping of params into graphql client', () => {
  it('should map params to the article query', async () => {
    const { extendQuery, context } = createMockContext()
    const params = {
      id: 'test-id'
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    extendQuery.mockImplementationOnce(() => ({ article: { query: 'test-article-query', variables: params } }))

    await getArticle(context, params, customQuery)

    expect(extendQuery).toHaveBeenCalledWith(customQuery, {
      article: {
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

    const expectedQueryOptions = { query: 'test-article-query', variables: params }

    extendQuery.mockImplementationOnce(() => ({ article: expectedQueryOptions }));

    await getArticle(context, params)

    expect(query).toHaveBeenCalledWith(expectedQueryOptions)
  })
})