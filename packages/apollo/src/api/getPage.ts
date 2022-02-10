import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootPageArgs } from '../shopify'

interface GetPageParams {
  id?: string
  handle?: string
}

const defaultQuery = gql`
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

export default async function getPage(context: ShopifyApolloContext, params: GetPageParams, customQuery?: CustomQuery) {
  const variables: QueryRootPageArgs = {}

  if (params.handle) {
    variables.handle = params.handle
  } else if (params.id) {
    variables.id = params.id
  }

  const { page } = context.extendQuery(
    customQuery,
    {
      page: {
        query: defaultQuery,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootPageArgs>({
    query: page.query,
    variables: page.variables
  })

  return response ?? null
}