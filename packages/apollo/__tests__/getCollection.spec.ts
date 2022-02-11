import { createMockClient } from 'mock-apollo-client'
import { gql } from '@apollo/client/core'
import searchProduct from '../src/api/searchProduct'

const DEFAULT_QUERY = `
query collection($handle: String, $first: Int, $filters: [ProductFilter!]) {
    collection(handle: $handle) {
      id
      handle
      title
      products(filters: $filters, first: $first) {
        edges {
          node {
            title
            id
          }
        }
      }
    }
  }
`

const expectedResponse = {
  data: {
    collection: {
      id: '<ID HERE>',
      handle: 'clothes',
      title: 'Clothes',
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
    },

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

describe('[shopify-apollo] get collection', () => {
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