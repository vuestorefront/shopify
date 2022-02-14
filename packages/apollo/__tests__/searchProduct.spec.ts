import searchProduct from '../src/api/searchProduct'

const queryMock = jest.fn()

const mockClient = { query: queryMock }

const mockExtendQuery = jest.fn();

const mockContext: any = {
  extendQuery: mockExtendQuery,
  client: {
    apolloClient: mockClient
  }
}

describe('[shopify-apollo] mapping of params into graphql client', () => {
  it('should map params to the search product query', async () => {
    const params = {
      term: 'test',
      perPage: 10
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    const expectedVariables = {
      query: 'test',
      first: 10
    }

    mockExtendQuery.mockImplementationOnce(() => ({ products: { query: 'test-search-query', variables: expectedVariables } }))

    await searchProduct(mockContext, params, customQuery)

    expect(mockExtendQuery).toHaveBeenCalledWith(customQuery, {
      products: {
        query: expect.any(Object),
        variables: expectedVariables
      }
    })
  })

  it('should execute the query with mapped params', async () => {
    const mappedVariables = {
      query: 'test',
      first: 10
    }

    mockExtendQuery.mockImplementationOnce(() => ({ products: { query: 'test-query', variables: mappedVariables } }));

    const params = {
      term: 'test',
      perPage: 10
    }

    const expectedQueryOptions = {
      query: 'test-query',
      variables: mappedVariables
    }

    await searchProduct(mockContext, params)

    expect(queryMock).toHaveBeenCalledWith(expectedQueryOptions)
  })
})