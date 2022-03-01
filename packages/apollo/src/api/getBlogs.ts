import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootBlogsArgs } from '../shopify'

const defaultQuery = gql`
    query getBlogs(
      $after: String
      $before: String
      $first: Int
      $last: Int
      $query: String
      $reverse: Boolean
      $sortKey: BlogSortKeys
    ) {
        blogs(after: $after, before: $before, first: $first, last: $last, query: $query, reverse: $reverse, sortKey: $sortKey) {
          edges {
            node {
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
        }
    }
`

export default async function getBlogs(context: ShopifyApolloContext, params: QueryRootBlogsArgs, customQuery?: CustomQuery) {
  const { blogs } = context.extendQuery(
    customQuery,
    {
      blogs: {
        query: defaultQuery,
        variables: params
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootBlogsArgs>({
    query: blogs.query,
    variables: blogs.variables
  })

  return response ?? null
}