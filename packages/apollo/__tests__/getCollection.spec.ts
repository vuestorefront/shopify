import getCollection from '../src/api/getCollection'

const queryMock = jest.fn()

const mockClient = { query: queryMock}

const mockExtendQuery = jest.fn();

const mockContext: any = {
  extendQuery: mockExtendQuery,
  client: {
    apolloClient: mockClient
  }
}

describe('[shopify-apollo] mapping of params into the qraphql client', () => {
  it('should map params the the collection query', async () => {
    // Given (BDD) or Arrange (TDD)
    const params = {
      categorySlug: 'test',
      perPage: 10, 
      filters: {
        filterOne: ['filter-one']
      }
    }
    const customQuery = {
      customQuery: 'customQuery-test'
    }

    const expectedVariables = {
      handle: 'test',
      first: 10,
      filters: {}
    }
    mockExtendQuery.mockImplementationOnce(() => ({ collection: { query: 'test-quert', variables: expectedVariables } }));


    // When (BDD) or Act (TDD)
    await getCollection(mockContext, params, customQuery)

    // Then (BDD) or Assert (TDD)
    expect(mockExtendQuery).toHaveBeenCalledWith(customQuery, {
      collection: {
        query: expect.any(Object),
        variables: expectedVariables
      }
    })
  })

  it('should execute the query with mapped params', async () => {
    const mappedVariables = {
      handle: 'test',
      first: 10,
      filters: {}
    }
    mockExtendQuery.mockImplementationOnce(() => ({ collection: { query: 'test-quert', variables: mappedVariables} }));
    const params = {
      categorySlug: 'test',
      perPage: 10, 
      filters: {
        filterOne: ['filter-one']
      }
    }

    const expectedQueryOptions = {
      query: 'test-quert',
      variables: mappedVariables
    }

    await getCollection(mockContext, params)

    expect(queryMock).toHaveBeenCalledWith(expectedQueryOptions)

  })
  
})