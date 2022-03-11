import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot } from '../shopify'
import { GetArticlesParams } from '../types/GetArticlesParams'

const articlesQuery = gql`
  query getArticles(
  $after: String,
  $before: String,
  $first: Int,
  $last: Int,
  $query: String,
  $reverse: Boolean,
  $sortKey: ArticleSortKeys,
  $truncateContent: Int
  ) {
    articles(after: $after, before: $before, first: $first, last: $last, query: $query, reverse: $reverse, sortKey: $sortKey) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          handle
          onlineStoreUrl
          publishedAt
          tags
          title
          content(truncateAt: $truncateContent)
          image {
            transformedSrc
            altText
            url
          }
          seo {
            description
            title
          }
          blog {
            handle
            title
          }
        }
      }
    }
  }
`

export async function getArticles(context: ShopifyApolloContext, params: GetArticlesParams, customQuery?: CustomQuery) {
  const variables = {
    first: 5,
    ...params
  }


  const { articles } = context.extendQuery(
    customQuery,
    {
      articles: {
        query: articlesQuery,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, GetArticlesParams>({
    query: articles.query,
    variables: articles.variables
  })

  return {
    ...response,
    pageInfo: response?.data?.articles?.pageInfo,
    data: {
      ...response?.data,
      articles: response?.data?.articles?.edges?.map(edge => ({
        ...edge?.node,
        link: `/blogs/${edge?.node?.blog?.handle}/${edge?.node?.handle}`,
        cursor: edge?.cursor
      })),
    }
  }
}