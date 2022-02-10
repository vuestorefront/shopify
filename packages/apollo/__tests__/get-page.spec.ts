import { createMockClient } from 'mock-apollo-client'
import { gql } from '@apollo/client/core'
import getPage from '../src/api/getPage'

const DEFAULT_QUERY = gql`
  query page(
  $handle: String
  $id: ID
  ) {
    page(handle: $handle, id: $id) {
      id
      title
      onlineStoreUrl
      bodySummary
      body
      createdAt
    }
  }
`

const expectedResponse = {
  data: {
    page: {
      body: "helhelhelhehehe",
      bodySummary: "helhelhelhehehe",
      createdAt: "2022-02-10T05:32:28Z",
      id: "Z2lkOi8vc2hvcGlmeS9QYWdlLzgyODMwNDU4OTAz",
      onlineStoreUrl: "https://jeff-vuestrorefront.myshopify.com/pages/who-we-are",
      title: "who we are",
    },

  }
}

const mockClient = createMockClient()

const mockExtendQuery = jest.fn(() => ({
  page: {
    query: DEFAULT_QUERY
  }
}))

const mockContext: any = {
  extendQuery: mockExtendQuery,
  client: {
    apolloClient: mockClient
  }
}

describe('[shopify-apollo] get collection', () => {
  it('request success', async () => {
    mockClient.setRequestHandler(
      DEFAULT_QUERY as any,
      () => Promise.resolve(expectedResponse)
    )

    const response = await getPage(mockContext, {
      handle: 'who-we-are'
    })

    expect(response.data).toEqual(expectedResponse.data)
  })
})