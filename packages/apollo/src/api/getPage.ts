import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootPageArgs } from '../shopify'

const defaultQuery = gql`
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

export default async function getPage(context: ShopifyApolloContext, params: QueryRootPageArgs, customQuery?: CustomQuery) {
  const { page } = context.extendQuery(
    customQuery,
    {
      page: {
        query: defaultQuery,
        variables: params
      }
    }
  )

  return await context.client.apolloClient.query<QueryRoot, QueryRootPageArgs>({
    query: page.query,
    variables: page.variables
  }) ?? null
}