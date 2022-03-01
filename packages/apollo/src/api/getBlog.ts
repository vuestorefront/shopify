import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootBlogArgs } from '../shopify'

const defaultQuery = gql`
    query getBlog(
      $handle: String
      $id: ID
    ) {
      blog(handle: $handle, id: $id) {
        id
        title
        authors {
          bio
          email
          firstName
          lastName
          name
        }
        onlineStoreUrl
        seo {
          description
          title
        }
      }
    }
`

export default async function getBlog(context: ShopifyApolloContext, params: QueryRootBlogArgs, customQuery?: CustomQuery) {
  const { blog } = context.extendQuery(
    customQuery,
    {
      blog: {
        query: defaultQuery,
        variables: params
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootBlogArgs>({
    query: blog.query,
    variables: blog.variables
  })

  return response ?? null
}