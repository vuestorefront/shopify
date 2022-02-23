import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootPageArgs } from '../shopify'
import { GetPageParams } from '../types'

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

export default async function getPage(context: ShopifyApolloContext, params: GetPageParams, customQuery?: CustomQuery) {
  const variables: QueryRootPageArgs = {
    ...(params.handle && { handle: params.handle }),
    ...(params.id && { id: params.id })
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

  return await context.client.apolloClient.query<QueryRoot, QueryRootPageArgs>({
    query: page.query,
    variables: page.variables
  }) ?? null
}