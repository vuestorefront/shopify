import getCollection from '../src/api/getCollection'
import { createMockContext } from '../__mocks__/mockContext'

describe('[shopify-apollo] mapping of params into the qraphql client', () => {
  it('should map params the collection query', async () => {
    const { extendQuery, context } = createMockContext()
    // Given (BDD) or Arrange (TDD)
    const params = {
      categorySlug: 'test',
      itemsPerPage: 10, 
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
    extendQuery.mockImplementationOnce(() => ({ collection: { query: 'test-quert', variables: expectedVariables } }));


    // When (BDD) or Act (TDD)
    await getCollection(context, params, customQuery)

    // Then (BDD) or Assert (TDD)
    expect(extendQuery).toHaveBeenCalledWith(customQuery, {
      collection: {
        query: expect.any(Object),
        variables: expectedVariables
      }
    })
  })

  it('should execute the query with mapped params', async () => {
    const { extendQuery, context, query } = createMockContext()
    const mappedVariables = {
      handle: 'test',
      first: 10,
      filters: {}
    }
    extendQuery.mockImplementationOnce(() => ({ collection: { query: 'test-quert', variables: mappedVariables } }));
    const params = {
      categorySlug: 'test',
      itemsPerPage: 10, 
      filters: {
        filterOne: ['filter-one']
      }
    }

    const expectedQueryOptions = {
      query: 'test-quert',
      variables: mappedVariables
    }

    await getCollection(context, params)

    expect(query).toHaveBeenCalledWith(expectedQueryOptions)

  })
  
})