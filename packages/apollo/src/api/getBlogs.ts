import { CustomQuery } from '@vue-storefront/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { ShopifyApolloContext } from '../library'
import { QueryRoot, QueryRootBlogsArgs } from '../shopify'
import { GetBlogsResult } from '../types/GetBlog/GetBlogsResult'
import { GetBlogsQuery } from '../query/GetBlogs.gql'

export async function getBlogs(context: ShopifyApolloContext, params: QueryRootBlogsArgs, customQuery?: CustomQuery): Promise<ApolloQueryResult<GetBlogsResult>> {
  const variables = {
    first: 5,
    ...params,
  }

  const { blogs } = context.extendQuery(
    customQuery,
    {
      blogs: {
        query: GetBlogsQuery,
        variables
      }
    }
  )

  const response = await context.client.apolloClient.query<QueryRoot, QueryRootBlogsArgs>({
    query: blogs.query,
    variables: blogs.variables
  })

  return {
    ...response,
    data: {
      ...response?.data,
      blogs: response?.data?.blogs?.edges?.map(edge => ({
        ...edge?.node,
        link: `${context.config?.cms?.blogs}/${edge?.node?.handle}`
      }))
    }
  }
}