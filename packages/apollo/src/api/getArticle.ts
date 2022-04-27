import { CustomQuery } from '@vue-storefront/core'
import { gql } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { Article, QueryRoot, QueryRootNodeArgs } from '../shopify'



export async function getArticle(context: ShopifyApolloContext, params: QueryRootNodeArgs, customQuery?: CustomQuery) {
  const articleQuery = gql`
  query getArticle(
    $id: ID!
  ) {
    node(id: $id) {
      ... on Article {
        id
        handle
        onlineStoreUrl
        publishedAt
        tags
        title
        content
        authorV2 {
          bio
          email
          firstName
          lastName
          name
        }
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
`

  const { article } = context.extendQuery(
    customQuery,
    {
      article: {
        query: articleQuery,
        variables: params
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootNodeArgs>({
    query: article.query,
    variables: article.variables
  })

  const node = response?.data?.node as Article

  return {
    ...response,
    data: {
      ...response?.data,
      article: {
        ...node,
        fullAuthorName: node?.authorV2?.name ?? ''
      },
    }
  }
}