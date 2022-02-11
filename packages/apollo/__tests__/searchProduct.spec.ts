import { createMockClient } from 'mock-apollo-client'
import { gql } from '@apollo/client/core'
import searchProduct from '../src/api/searchProduct'

const DEFAULT_QUERY = `
  query products(
    $first: Int,
    $query: String
  ) {
    products(first: $first, query: $query) {
      edges {
          node {
              title
              id
          }
      }
    } 
  }
`

const expectedResponse = {
  data: {
    products: {
      edges: [{
        node: {
          title: 'Blouse',
          id: '<ID HERE>'
        }
      },
      {
        node: {
          title: 'Jacket',
          id: '<ID HERE>'
        }
      }]
    }
  }
}

const mockClient = createMockClient()

const mockExtendQuery = jest.fn(() => ({
  products: {
    query: DEFAULT_QUERY
  }
}))

const mockContext: any = {
  extendQuery: mockExtendQuery,
  client: {
    apolloClient: mockClient
  }
}

const QUERY = gql(DEFAULT_QUERY) as any

describe('[shopify-apollo] search product', () => {
  it('request success', async () => {
    mockClient.setRequestHandler(
      QUERY,
      () => Promise.resolve(expectedResponse)
    )

    const response = await searchProduct(mockContext, {
      term: 'blouse'
    })

    expect(response.data).toEqual(expectedResponse.data)
  })
})