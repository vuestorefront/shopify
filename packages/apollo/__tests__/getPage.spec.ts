import getPage from '../src/api/getPage'

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
  it('should map params to the page query', async () => {
    const params = {
      handle: 'test-handle',
      id: 'test-id'
    }

    const customQuery = {
      customQuery: 'customQuery-test'
    }

    mockExtendQuery.mockImplementationOnce(() => ({ page: { query: 'test-page-query', variables: params } }))

    await getPage(mockContext, params, customQuery)

    expect(mockExtendQuery).toHaveBeenCalledWith(customQuery, {
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

    mockExtendQuery.mockImplementationOnce(() => ({ page: expectedQueryOptions }));

    await getPage(mockContext, params)

    expect(queryMock).toHaveBeenCalledWith(expectedQueryOptions)
  })
})