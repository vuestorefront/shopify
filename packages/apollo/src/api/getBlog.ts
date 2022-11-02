import { ApolloQueryResult } from '@apollo/client/core'
import { CustomQuery } from '@vue-storefront/core'
import { ShopifyApolloContext } from '../library'
import { GetBlogQuery } from '../query/GetBlog.gql'
import { QueryRoot, QueryRootBlogArgs } from '../shopify'


export async function getBlog(context: ShopifyApolloContext, params: QueryRootBlogArgs, customQuery?: CustomQuery): Promise<ApolloQueryResult<QueryRoot>> {
  const { blog } = context.extendQuery(
    customQuery,
    {
      blog: {
        query: GetBlogQuery,
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