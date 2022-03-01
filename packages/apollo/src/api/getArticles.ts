import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootArticlesArgs } from '../shopify'

const articlesQuery = gql`
  query getArticles(
  $after: String,
  $before: String,
  $first: Int,
  $last: Int,
  $query: String,
  $reverse: Boolean,
  $sortKey: BlogSortKeys
  ) {
    articles(after: $after, before: $before, first: $first, last: $last, query: $query, reverse: $reverse, sortKey: $sortKey) {
      edges {
        node {
          id
          handle
          onlineStoreUrl
          publishedAt
          tags
          title
          content(truncateAt: 100)
          image {
            transformedSrc
            altText
          }
          seo {
            description
            title
          }
        }
      }
    }
  }
`

export async function getArticles(context: ShopifyApolloContext, params: QueryRootArticlesArgs, customQuery?: CustomQuery) {
  const { blog } = context.extendQuery(
    customQuery,
    {
      blog: {
        query: articlesQuery,
        variables: params
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootArticlesArgs>({
    query: blog.query,
    variables: blog.variables
  })

  return response ?? null
}