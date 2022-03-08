import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootPageArgs } from '../shopify'

const pageQuery = gql`
    query page(
      $handle: String
      $id: ID
    ) {
        page(handle: $handle, id: $id) {
          id
          handle
          title
          onlineStoreUrl
          bodySummary
          body
          createdAt
        }
    }
`

export async function getPage(context: ShopifyApolloContext, params: QueryRootPageArgs, customQuery?: CustomQuery) {
  const variables: QueryRootPageArgs = {
    ...(params.handle && { handle: params.handle }),
    ...(params.id && { id: params.id })
  }

  const { page } = context.extendQuery(
    customQuery,
    {
      page: {
        query: pageQuery,
        variables
      }
    }
  )

  return await context.client.apolloClient.query<QueryRoot, QueryRootPageArgs>({
    query: page.query,
    variables: page.variables
  }) ?? null
}