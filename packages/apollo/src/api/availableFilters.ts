import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootCollectionByHandleArgs } from '../shopify'

const DEFAULT_QUERY = gql`
query filters($handle: String!) {
    collectionByHandle(handle: $handle) {
      handle
      products {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
}
`


export default async function availableFilters(context: ShopifyApolloContext, params: QueryRootCollectionByHandleArgs, customQuery?: CustomQuery) {
  const variables = {
    handle: params.handle
  }

  const { filters } = context.extendQuery(
    customQuery,
    {
      filters: {
        query: DEFAULT_QUERY,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootCollectionByHandleArgs>({
    query: filters.query,
    variables: filters.variables
  })

  return response ?? null
}